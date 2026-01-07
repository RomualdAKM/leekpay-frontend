import { ref, computed, watch } from 'vue'

// Types
export interface BlockProps {
  [key: string]: any
}

export interface Block {
  id: string
  type: string
  order: number
  props: BlockProps
}

export interface Theme {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
}

export interface Tracking {
  facebookPixelId: string | null
  googleAnalyticsId: string | null
  googleTagManagerId: string | null
  tiktokPixelId: string | null
  customCode: string | null
}

export interface Settings {
  showBranding: boolean
  customCss: string
  tracking: Tracking
}

export interface SalesPage {
  id?: number
  title: string
  slug: string
  meta_title?: string
  meta_description?: string
  favicon_url?: string
  blocks: Block[]
  theme: Theme
  settings: Settings
  payment_link_id?: number | null
  is_published: boolean
  published_at?: string
  public_url?: string
  custom_domain?: string | null
  domain_verified?: boolean
  domain_verified_at?: string
  created_at?: string
  updated_at?: string
}

export interface BlockType {
  value: string
  label: string
  icon: string
  defaultProps: BlockProps
}

// Génère un ID unique pour les blocs
const generateBlockId = (): string => {
  return 'block_' + Math.random().toString(36).substring(2, 10)
}

export const useSalesPageBuilder = () => {
  const config = useRuntimeConfig()
  const { token } = useAuth()
  
  // State
  const page = ref<SalesPage>({
    title: '',
    slug: '',
    blocks: [],
    theme: {
      primaryColor: '#10B981',
      secondaryColor: '#3B82F6',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      fontFamily: 'Poppins',
    },
    settings: {
      showBranding: true,
      customCss: '',
      tracking: {
        facebookPixelId: null,
        googleAnalyticsId: null,
        googleTagManagerId: null,
        tiktokPixelId: null,
        customCode: null,
      },
    },
    is_published: false,
    payment_link_id: null,
  })
  
  const blockTypes = ref<BlockType[]>([])
  const selectedBlockId = ref<string | null>(null)
  const isDirty = ref(false)
  const isSaving = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const previewMode = ref(false)
  
  // Computed
  const selectedBlock = computed(() => {
    if (!selectedBlockId.value) return null
    return page.value.blocks.find(b => b.id === selectedBlockId.value) || null
  })
  
  const hasBlocks = computed(() => page.value.blocks.length > 0)
  
  const sortedBlocks = computed(() => {
    return [...page.value.blocks].sort((a, b) => a.order - b.order)
  })
  
  // Watchers
  watch(() => page.value, () => {
    isDirty.value = true
  }, { deep: true })
  
  // Actions - API
  const getAuthHeaders = () => {
    return {
      Authorization: token.value ? `Bearer ${token.value}` : '',
    }
  }
  
  const fetchBlockTypes = async () => {
    if (!token.value) return
    try {
      const response = await $fetch<{ success: boolean; data: BlockType[] }>(
        '/sales-pages/block-types',
        { 
          baseURL: config.public.apiBaseURL,
          headers: getAuthHeaders() 
        }
      )
      if (response.success) {
        blockTypes.value = response.data
      }
    } catch (err: any) {
      console.error('Erreur chargement block types:', err)
    }
  }
  
  const fetchPage = async (id: number | string) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await $fetch<{ success: boolean; data: SalesPage }>(
        `/sales-pages/${id}`,
        { 
          baseURL: config.public.apiBaseURL,
          headers: getAuthHeaders() 
        }
      )
      if (response.success) {
        // Normaliser les settings pour la rétrocompatibilité
        const data = response.data
        if (!data.settings) {
          data.settings = {
            showBranding: true,
            customCss: '',
            tracking: {
              facebookPixelId: null,
              googleAnalyticsId: null,
              googleTagManagerId: null,
              tiktokPixelId: null,
              customCode: null,
            },
          }
        } else if (!data.settings.tracking) {
          // Ancienne structure avec trackingCode
          data.settings.tracking = {
            facebookPixelId: null,
            googleAnalyticsId: null,
            googleTagManagerId: null,
            tiktokPixelId: null,
            customCode: (data.settings as any).trackingCode || null,
          }
        }
        page.value = data
        isDirty.value = false
      }
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors du chargement de la page'
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  const savePage = async () => {
    isSaving.value = true
    error.value = null
    try {
      const isNew = !page.value.id
      const url = isNew 
        ? '/sales-pages' 
        : `/sales-pages/${page.value.id}`
      
      const response = await $fetch<{ success: boolean; data: SalesPage; message: string }>(
        url,
        {
          method: isNew ? 'POST' : 'PUT',
          baseURL: config.public.apiBaseURL,
          headers: getAuthHeaders(),
          body: {
            title: page.value.title,
            slug: page.value.slug,
            meta_title: page.value.meta_title,
            meta_description: page.value.meta_description,
            blocks: page.value.blocks,
            theme: page.value.theme,
            settings: page.value.settings,
            payment_link_id: page.value.payment_link_id,
            is_published: page.value.is_published,
          },
        }
      )
      
      if (response.success) {
        page.value = response.data
        isDirty.value = false
        return response.data
      }
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la sauvegarde'
      throw err
    } finally {
      isSaving.value = false
    }
  }
  
  const deletePage = async () => {
    if (!page.value.id) return
    
    try {
      await $fetch(`/sales-pages/${page.value.id}`, {
        method: 'DELETE',
        baseURL: config.public.apiBaseURL,
        headers: getAuthHeaders(),
      })
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la suppression'
      throw err
    }
  }
  
  const publishPage = async () => {
    if (!page.value.id) return
    
    try {
      const response = await $fetch<{ success: boolean; data: SalesPage }>(
        `/sales-pages/${page.value.id}/publish`,
        {
          method: 'POST',
          baseURL: config.public.apiBaseURL,
          headers: getAuthHeaders(),
        }
      )
      if (response.success) {
        page.value = response.data
      }
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la publication'
      throw err
    }
  }
  
  const unpublishPage = async () => {
    if (!page.value.id) return
    
    try {
      const response = await $fetch<{ success: boolean; data: SalesPage }>(
        `/sales-pages/${page.value.id}/unpublish`,
        {
          method: 'POST',
          baseURL: config.public.apiBaseURL,
          headers: getAuthHeaders(),
        }
      )
      if (response.success) {
        page.value = response.data
      }
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la dépublication'
      throw err
    }
  }
  
  const checkSlugAvailability = async (slug: string): Promise<boolean> => {
    try {
      const response = await $fetch<{ available: boolean }>(
        `/sales-pages/check-slug/${slug}`,
        {
          baseURL: config.public.apiBaseURL,
          headers: getAuthHeaders(),
          query: page.value.id ? { except_id: page.value.id } : undefined,
        }
      )
      return response.available
    } catch {
      return false
    }
  }
  
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await $fetch<{ success: boolean; data: { url: string } }>(
        '/sales-pages/upload-image',
        {
          method: 'POST',
          baseURL: config.public.apiBaseURL,
          headers: getAuthHeaders(),
          body: formData,
        }
      )
      
      if (response.success) {
        return response.data.url
      }
      return null
    } catch (err) {
      console.error('Erreur upload image:', err)
      return null
    }
  }
  
  // Actions - Blocs
  const addBlock = (type: string, position?: number) => {
    const blockType = blockTypes.value.find(bt => bt.value === type)
    if (!blockType) return
    
    const newBlock: Block = {
      id: generateBlockId(),
      type: type,
      order: position !== undefined ? position : page.value.blocks.length,
      props: { ...blockType.defaultProps },
    }
    
    if (position !== undefined && position < page.value.blocks.length) {
      // Insérer à la position et réindexer
      page.value.blocks.splice(position, 0, newBlock)
      reindexBlocks()
    } else {
      page.value.blocks.push(newBlock)
    }
    
    selectedBlockId.value = newBlock.id
  }
  
  const removeBlock = (blockId: string) => {
    const index = page.value.blocks.findIndex(b => b.id === blockId)
    if (index !== -1) {
      page.value.blocks.splice(index, 1)
      reindexBlocks()
      
      if (selectedBlockId.value === blockId) {
        selectedBlockId.value = null
      }
    }
  }
  
  const duplicateBlock = (blockId: string) => {
    const block = page.value.blocks.find(b => b.id === blockId)
    if (!block) return
    
    const newBlock: Block = {
      id: generateBlockId(),
      type: block.type,
      order: block.order + 1,
      props: JSON.parse(JSON.stringify(block.props)),
    }
    
    const index = page.value.blocks.findIndex(b => b.id === blockId)
    page.value.blocks.splice(index + 1, 0, newBlock)
    reindexBlocks()
    
    selectedBlockId.value = newBlock.id
  }
  
  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = page.value.blocks.findIndex(b => b.id === blockId)
    if (index === -1) return
    
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= page.value.blocks.length) return
    
    // Swap avec copie du tableau pour éviter les problèmes de réactivité
    const blocks = [...page.value.blocks]
    const temp = blocks[index]!
    blocks[index] = blocks[newIndex]!
    blocks[newIndex] = temp
    page.value.blocks = blocks
    
    reindexBlocks()
  }
  
  const reindexBlocks = () => {
    page.value.blocks.forEach((block, index) => {
      block.order = index
    })
  }
  
  const updateBlockProps = (blockId: string, props: Partial<BlockProps>) => {
    const block = page.value.blocks.find(b => b.id === blockId)
    if (block) {
      block.props = { ...block.props, ...props }
    }
  }
  
  const selectBlock = (blockId: string | null) => {
    selectedBlockId.value = blockId
  }
  
  const reorderBlocks = (newOrder: Block[]) => {
    page.value.blocks = newOrder.map((block, index) => ({
      ...block,
      order: index,
    }))
  }
  
  // Actions - Theme
  const updateTheme = (updates: Partial<Theme>) => {
    page.value.theme = { ...page.value.theme, ...updates }
  }
  
  // Actions - Settings
  const updateSettings = (updates: Partial<Settings>) => {
    page.value.settings = { ...page.value.settings, ...updates }
  }
  
  // Actions - Page
  const resetPage = () => {
    page.value = {
      title: '',
      slug: '',
      blocks: [],
      theme: {
        primaryColor: '#10B981',
        secondaryColor: '#3B82F6',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        fontFamily: 'Poppins',
      },
      settings: {
        showBranding: true,
        customCss: '',
        tracking: {
          facebookPixelId: null,
          googleAnalyticsId: null,
          googleTagManagerId: null,
          tiktokPixelId: null,
          customCode: null,
        },
      },
      is_published: false,
      payment_link_id: null,
    }
    selectedBlockId.value = null
    isDirty.value = false
  }
  
  const togglePreview = () => {
    previewMode.value = !previewMode.value
    if (previewMode.value) {
      selectedBlockId.value = null
    }
  }
  
  return {
    // State
    page,
    blockTypes,
    selectedBlockId,
    selectedBlock,
    isDirty,
    isSaving,
    isLoading,
    error,
    previewMode,
    
    // Computed
    hasBlocks,
    sortedBlocks,
    
    // API Actions
    fetchBlockTypes,
    fetchPage,
    savePage,
    deletePage,
    publishPage,
    unpublishPage,
    checkSlugAvailability,
    uploadImage,
    
    // Block Actions
    addBlock,
    removeBlock,
    duplicateBlock,
    moveBlock,
    updateBlockProps,
    selectBlock,
    reorderBlocks,
    
    // Theme & Settings
    updateTheme,
    updateSettings,
    
    // Page Actions
    resetPage,
    togglePreview,
  }
}
