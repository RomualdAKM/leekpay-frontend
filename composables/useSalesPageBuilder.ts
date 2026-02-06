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

// ============ NOUVELLE ARCHITECTURE: SECTIONS + COLONNES (Phase 3) ============

export interface SectionSettings {
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: 'cover' | 'contain' | 'auto'
  backgroundPosition?: 'center' | 'top' | 'bottom'
  paddingTop?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  paddingBottom?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  marginTop?: 'none' | 'small' | 'medium' | 'large'
  marginBottom?: 'none' | 'small' | 'medium' | 'large'
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl' | '4xl'
  minHeight?: 'auto' | 'screen' | 'half'
  customClass?: string
}

export interface ColumnSettings {
  verticalAlign?: 'top' | 'center' | 'bottom' | 'stretch'
  padding?: 'none' | 'small' | 'medium' | 'large'
  customClass?: string
}

export interface Column {
  id: string
  width: number // Pourcentage (100, 50, 33, 25, 66, 75)
  settings: ColumnSettings
  blocks: Block[]
}

export interface Section {
  id: string
  order: number
  settings: SectionSettings
  columns: Column[]
}

// ============ FIN NOUVELLE ARCHITECTURE ============

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
  blocks: Block[]  // Legacy - pour rétrocompatibilité
  sections?: Section[]  // Nouvelle architecture (Phase 3)
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

// Génère un ID unique pour les sections
const generateSectionId = (): string => {
  return 'section_' + Math.random().toString(36).substring(2, 10)
}

// Génère un ID unique pour les colonnes
const generateColumnId = (): string => {
  return 'column_' + Math.random().toString(36).substring(2, 10)
}

// Layouts de colonnes prédéfinis
export const COLUMN_LAYOUTS = {
  '1': [100],
  '2': [50, 50],
  '3': [33.33, 33.33, 33.33],
  '4': [25, 25, 25, 25],
  '1-2': [33.33, 66.66],
  '2-1': [66.66, 33.33],
  '1-3': [25, 75],
  '3-1': [75, 25],
  '1-1-2': [25, 25, 50],
  '2-1-1': [50, 25, 25],
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
    
    // Chercher d'abord dans les blocs legacy
    const legacyBlock = page.value.blocks.find(b => b.id === selectedBlockId.value)
    if (legacyBlock) return legacyBlock
    
    // Chercher dans les sections (mode sections)
    if (page.value.sections && page.value.sections.length > 0) {
      for (const section of page.value.sections) {
        for (const column of section.columns) {
          const block = column.blocks.find(b => b.id === selectedBlockId.value)
          if (block) return block
        }
      }
    }
    
    return null
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
            sections: page.value.sections, // Phase 3: Sections + Colonnes
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
    // Fonction helper pour appliquer la mise à jour
    const applyUpdate = (block: Block) => {
      // Vérifier si c'est une mise à jour d'élément dans un array (édition inline)
      if (props.__arrayUpdate) {
        const { arrayKey, index, propKey, value } = props.__arrayUpdate as {
          arrayKey: string
          index: number
          propKey: string
          value: any
        }
        const arr = [...(block.props[arrayKey] || [])]
        if (arr[index]) {
          arr[index] = { ...arr[index], [propKey]: value }
          block.props = { ...block.props, [arrayKey]: arr }
        }
      } else {
        // Mise à jour standard des props
        block.props = { ...block.props, ...props }
      }
    }
    
    // Chercher d'abord dans les blocs legacy
    const legacyBlock = page.value.blocks.find(b => b.id === blockId)
    if (legacyBlock) {
      applyUpdate(legacyBlock)
      return
    }
    
    // Chercher dans les sections (mode sections)
    if (page.value.sections && page.value.sections.length > 0) {
      for (const section of page.value.sections) {
        for (const column of section.columns) {
          const block = column.blocks.find(b => b.id === blockId)
          if (block) {
            applyUpdate(block)
            return
          }
        }
      }
    }
  }
  
  const selectBlock = (blockId: string | null) => {
    selectedBlockId.value = blockId
    
    // Si un bloc est sélectionné, trouver et sélectionner sa section/colonne parent
    if (blockId && page.value.sections) {
      for (const section of page.value.sections) {
        for (const column of section.columns) {
          const block = column.blocks.find(b => b.id === blockId)
          if (block) {
            selectedSectionId.value = section.id
            selectedColumnId.value = column.id
            return
          }
        }
      }
    }
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

  // ============ GESTION DES SECTIONS (Phase 3) ============
  
  const selectedSectionId = ref<string | null>(null)
  const selectedColumnId = ref<string | null>(null)
  
  // Computed pour vérifier si on utilise le nouveau mode sections
  // IMPORTANT: Une fois qu'on a des sections, on reste en mode sections
  const useSectionsMode = computed(() => {
    return page.value.sections && page.value.sections.length > 0
  })
  
  // ============ ADD BLOCK SMART - Création intelligente de blocs ============
  // Cette fonction crée automatiquement une section si nécessaire
  // C'est la méthode principale pour ajouter des blocs (utilisée par la sidebar)
  const addBlockSmart = (blockType: string) => {
    // Trouver les props par défaut du type de bloc
    const typeInfo = blockTypes.value.find(bt => bt.value === blockType)
    const defaultProps = typeInfo?.defaultProps || {}
    
    const newBlock: Block = {
      id: generateBlockId(),
      type: blockType,
      order: 0,
      props: { ...defaultProps },
    }
    
    // Si on utilise déjà le mode sections OU si on n'a pas de blocs legacy
    // → Ajouter dans une section
    if (useSectionsMode.value || page.value.blocks.length === 0) {
      // Initialiser sections si nécessaire
      if (!page.value.sections) {
        page.value.sections = []
      }
      
      // Si une colonne est sélectionnée, ajouter le bloc dedans
      if (selectedColumnId.value && selectedSection.value) {
        const column = selectedSection.value.columns.find(c => c.id === selectedColumnId.value)
        if (column) {
          newBlock.order = column.blocks.length
          column.blocks.push(newBlock)
          selectedBlockId.value = newBlock.id
          return
        }
      }
      
      // Sinon, créer une nouvelle section avec le bloc
      const newSection: Section = {
        id: generateSectionId(),
        order: page.value.sections.length,
        settings: {
          paddingTop: 'medium',
          paddingBottom: 'medium',
          maxWidth: '7xl',
        },
        columns: [{
          id: generateColumnId(),
          width: 100,
          settings: {
            verticalAlign: 'top',
            padding: 'none',
          },
          blocks: [newBlock],
        }],
      }
      
      page.value.sections.push(newSection)
      selectedSectionId.value = newSection.id
      selectedBlockId.value = newBlock.id
    } else {
      // Mode legacy - ajouter au tableau de blocs
      newBlock.order = page.value.blocks.length
      page.value.blocks.push(newBlock)
      selectedBlockId.value = newBlock.id
    }
  }
  
  // Sélection d'une section
  const selectedSection = computed(() => {
    if (!selectedSectionId.value || !page.value.sections) return null
    return page.value.sections.find(s => s.id === selectedSectionId.value) || null
  })
  
  // Sélection d'une colonne
  const selectedColumn = computed(() => {
    if (!selectedColumnId.value || !selectedSection.value) return null
    return selectedSection.value.columns.find(c => c.id === selectedColumnId.value) || null
  })
  
  // Ajouter une nouvelle section
  const addSection = (layout: keyof typeof COLUMN_LAYOUTS = '1') => {
    if (!page.value.sections) {
      page.value.sections = []
    }
    
    const widths = COLUMN_LAYOUTS[layout]
    const columns: Column[] = widths.map((width) => ({
      id: generateColumnId(),
      width,
      settings: {
        verticalAlign: 'top',
        padding: 'none',
      },
      blocks: [],
    }))
    
    const newSection: Section = {
      id: generateSectionId(),
      order: page.value.sections.length,
      settings: {
        paddingTop: 'none',
        paddingBottom: 'none',
        maxWidth: '7xl',
      },
      columns,
    }
    
    page.value.sections.push(newSection)
    selectedSectionId.value = newSection.id
    // Sélectionner automatiquement la première colonne
    if (columns[0]) {
      selectedColumnId.value = columns[0].id
    }
  }
  
  // Supprimer une section
  const removeSection = (sectionId: string) => {
    if (!page.value.sections) return
    
    page.value.sections = page.value.sections.filter(s => s.id !== sectionId)
    reindexSections()
    
    if (selectedSectionId.value === sectionId) {
      selectedSectionId.value = null
      selectedColumnId.value = null
    }
  }
  
  // Dupliquer une section
  const duplicateSection = (sectionId: string) => {
    if (!page.value.sections) return
    
    const section = page.value.sections.find(s => s.id === sectionId)
    if (!section) return
    
    const newSection: Section = {
      id: generateSectionId(),
      order: section.order + 1,
      settings: { ...section.settings },
      columns: section.columns.map(col => ({
        id: generateColumnId(),
        width: col.width,
        settings: { ...col.settings },
        blocks: col.blocks.map(block => ({
          id: generateBlockId(),
          type: block.type,
          order: block.order,
          props: JSON.parse(JSON.stringify(block.props)),
        })),
      })),
    }
    
    const index = page.value.sections.findIndex(s => s.id === sectionId)
    page.value.sections.splice(index + 1, 0, newSection)
    reindexSections()
    
    selectedSectionId.value = newSection.id
  }
  
  // Mettre à jour les settings d'une section
  const updateSectionSettings = (sectionId: string, settings: Partial<SectionSettings>) => {
    if (!page.value.sections) return
    
    const section = page.value.sections.find(s => s.id === sectionId)
    if (section) {
      section.settings = { ...section.settings, ...settings }
    }
  }
  
  // Changer le layout des colonnes d'une section
  const changeSectionLayout = (sectionId: string, layout: keyof typeof COLUMN_LAYOUTS) => {
    if (!page.value.sections) return
    
    const section = page.value.sections.find(s => s.id === sectionId)
    if (!section) return
    
    const widths = COLUMN_LAYOUTS[layout]
    const existingBlocks = section.columns.flatMap(col => col.blocks)
    
    // Créer les nouvelles colonnes avec les largeurs
    section.columns = widths.map((width, i) => ({
      id: generateColumnId(),
      width,
      settings: {
        verticalAlign: 'top',
        padding: 'medium',
      },
      blocks: i === 0 ? existingBlocks : [], // Mettre tous les blocs dans la première colonne
    }))
  }
  
  // Réindexer les sections
  const reindexSections = () => {
    if (!page.value.sections) return
    page.value.sections.forEach((section, index) => {
      section.order = index
    })
  }
  
  // Ajouter un bloc dans une colonne
  const addBlockToColumn = (sectionId: string, columnId: string, blockType: string) => {
    if (!page.value.sections) return
    
    const section = page.value.sections.find(s => s.id === sectionId)
    if (!section) return
    
    const column = section.columns.find(c => c.id === columnId)
    if (!column) return
    
    // Trouver les props par défaut du type de bloc
    const typeInfo = blockTypes.value.find(bt => bt.value === blockType)
    const defaultProps = typeInfo?.defaultProps || {}
    
    const newBlock: Block = {
      id: generateBlockId(),
      type: blockType,
      order: column.blocks.length,
      props: { ...defaultProps },
    }
    
    column.blocks.push(newBlock)
    selectedBlockId.value = newBlock.id
  }
  
  // Supprimer un bloc d'une colonne
  const removeBlockFromColumn = (sectionId: string, columnId: string, blockId: string) => {
    if (!page.value.sections) return
    
    const section = page.value.sections.find(s => s.id === sectionId)
    if (!section) return
    
    const column = section.columns.find(c => c.id === columnId)
    if (!column) return
    
    column.blocks = column.blocks.filter(b => b.id !== blockId)
    
    // Réindexer les blocs dans la colonne
    column.blocks.forEach((block, index) => {
      block.order = index
    })
    
    if (selectedBlockId.value === blockId) {
      selectedBlockId.value = null
    }
  }
  
  // Déplacer un bloc dans une colonne (ou entre colonnes)
  const moveBlockInColumn = (
    fromSectionId: string,
    fromColumnId: string,
    toSectionId: string,
    toColumnId: string,
    blockId: string,
    newIndex: number
  ) => {
    if (!page.value.sections) return
    
    const fromSection = page.value.sections.find(s => s.id === fromSectionId)
    const toSection = page.value.sections.find(s => s.id === toSectionId)
    if (!fromSection || !toSection) return
    
    const fromColumn = fromSection.columns.find(c => c.id === fromColumnId)
    const toColumn = toSection.columns.find(c => c.id === toColumnId)
    if (!fromColumn || !toColumn) return
    
    const blockIndex = fromColumn.blocks.findIndex(b => b.id === blockId)
    if (blockIndex === -1) return
    
    const [block] = fromColumn.blocks.splice(blockIndex, 1)
    if (!block) return
    block.order = newIndex
    toColumn.blocks.splice(newIndex, 0, block)
    
    // Réindexer les blocs dans les deux colonnes
    fromColumn.blocks.forEach((b, i) => { b.order = i })
    toColumn.blocks.forEach((b, i) => { b.order = i })
  }
  
  // Mettre à jour les props d'un bloc dans une section
  const updateBlockPropsInSection = (
    sectionId: string,
    columnId: string,
    blockId: string,
    props: Partial<BlockProps>
  ) => {
    if (!page.value.sections) return
    
    const section = page.value.sections.find(s => s.id === sectionId)
    if (!section) return
    
    const column = section.columns.find(c => c.id === columnId)
    if (!column) return
    
    const block = column.blocks.find(b => b.id === blockId)
    if (!block) return
    
    // Gérer la mise à jour d'array (édition inline)
    if (props.__arrayUpdate) {
      const { arrayKey, index, propKey, value } = props.__arrayUpdate as {
        arrayKey: string
        index: number
        propKey: string
        value: any
      }
      const arr = [...(block.props[arrayKey] || [])]
      if (arr[index]) {
        arr[index] = { ...arr[index], [propKey]: value }
        block.props = { ...block.props, [arrayKey]: arr }
      }
    } else {
      block.props = { ...block.props, ...props }
    }
  }
  
  // Sélection
  const selectSection = (sectionId: string | null) => {
    selectedSectionId.value = sectionId
    if (!sectionId) {
      selectedColumnId.value = null
      selectedBlockId.value = null
    }
  }
  
  const selectColumn = (columnId: string | null) => {
    selectedColumnId.value = columnId
    // Désélectionner le bloc pour afficher les paramètres de la section
    selectedBlockId.value = null
    
    // Trouver et sélectionner la section parent de cette colonne
    if (columnId && page.value.sections) {
      const parentSection = page.value.sections.find(section => 
        section.columns.some(col => col.id === columnId)
      )
      if (parentSection) {
        selectedSectionId.value = parentSection.id
      }
    }
  }
  
  // Convertir l'ancienne structure (blocks[]) vers la nouvelle (sections[])
  const migrateToSectionsMode = () => {
    if (page.value.blocks.length === 0) {
      page.value.sections = []
      return
    }
    
    // Créer une section avec une colonne pour chaque bloc existant
    page.value.sections = page.value.blocks.map((block, index) => ({
      id: generateSectionId(),
      order: index,
      settings: {
        paddingTop: 'medium',
        paddingBottom: 'medium',
        maxWidth: '7xl',
      },
      columns: [{
        id: generateColumnId(),
        width: 100,
        settings: {
          verticalAlign: 'top',
          padding: 'none',
        },
        blocks: [block],
      }],
    }))
    
    // Vider l'ancien tableau de blocs
    page.value.blocks = []
  }
  
  // ============ FIN GESTION DES SECTIONS ============

  // Appliquer un template
  const applyTemplate = async (templateId: number) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await $fetch<{ success: boolean; data: { blocks: Block[]; sections: Section[]; theme: Theme; settings: Settings } }>(
        `/sales-page-templates/${templateId}/data`,
        { 
          baseURL: config.public.apiBaseURL,
          headers: getAuthHeaders() 
        }
      )
      if (response.success && response.data) {
        // Gérer les sections (nouveau système)
        if (response.data.sections && response.data.sections.length > 0) {
          // Générer de nouveaux IDs pour les sections, colonnes et blocs
          const newSections = response.data.sections.map((section: Section, sectionIndex: number) => ({
            ...section,
            id: generateSectionId(),
            order: sectionIndex,
            columns: section.columns.map((column: Column) => ({
              ...column,
              id: generateColumnId(),
              blocks: column.blocks.map((block: Block, blockIndex: number) => ({
                ...block,
                id: generateBlockId(),
                order: blockIndex
              }))
            }))
          }))
          
          page.value.sections = newSections
          page.value.blocks = [] // Vider les blocs legacy
        } else {
          // Gérer les blocs legacy (ancien système)
          const newBlocks = (response.data.blocks || []).map((block: Block, index: number) => ({
            ...block,
            id: generateBlockId(),
            order: index
          }))
          
          page.value.blocks = newBlocks
          page.value.sections = [] // Vider les sections
        }
        
        if (response.data.theme) {
          page.value.theme = { ...page.value.theme, ...response.data.theme }
        }
        
        if (response.data.settings) {
          page.value.settings = {
            ...page.value.settings,
            showBranding: response.data.settings.showBranding ?? true,
            customCss: response.data.settings.customCss || '',
            // Ne pas copier les tracking IDs du template
          }
        }
        
        isDirty.value = true
        return true
      }
      return false
    } catch (err: any) {
      console.error('Erreur application template:', err)
      error.value = 'Erreur lors de l\'application du template'
      return false
    } finally {
      isLoading.value = false
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
    
    // State - Sections (Phase 3)
    selectedSectionId,
    selectedColumnId,
    selectedSection,
    selectedColumn,
    useSectionsMode,
    
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
    
    // Block Actions (legacy)
    addBlock,
    addBlockSmart, // Méthode intelligente pour ajouter des blocs (crée section automatiquement)
    removeBlock,
    duplicateBlock,
    moveBlock,
    updateBlockProps,
    selectBlock,
    reorderBlocks,
    
    // Section Actions (Phase 3)
    addSection,
    removeSection,
    duplicateSection,
    updateSectionSettings,
    changeSectionLayout,
    selectSection,
    selectColumn,
    addBlockToColumn,
    removeBlockFromColumn,
    moveBlockInColumn,
    updateBlockPropsInSection,
    migrateToSectionsMode,
    
    // Theme & Settings
    updateTheme,
    updateSettings,
    
    // Page Actions
    resetPage,
    togglePreview,
    applyTemplate,
  }
}
