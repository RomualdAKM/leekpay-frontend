/**
 * Composable pour gérer l'édition inline WYSIWYG
 * Inspiré d'Elementor - permet l'édition directe sur le canvas
 */
import { ref, computed, provide, inject, type InjectionKey, type Ref } from 'vue'

// Types
export interface InlineEditContext {
  /** Mode édition actif (false = preview mode) */
  isEditMode: Ref<boolean>
  /** ID du bloc actuellement en cours d'édition inline */
  activeEditBlockId: Ref<string | null>
  /** Champ actuellement en cours d'édition */
  activeEditField: Ref<string | null>
  /** Émettre une mise à jour de prop */
  emitPropUpdate: (blockId: string, propKey: string, value: any) => void
  /** Émettre une mise à jour de prop dans un array */
  emitArrayPropUpdate: (blockId: string, arrayKey: string, index: number, propKey: string, value: any) => void
  /** Commencer l'édition d'un champ */
  startEditing: (blockId: string, field: string) => void
  /** Terminer l'édition */
  stopEditing: () => void
}

// Clé d'injection pour provide/inject
export const INLINE_EDIT_KEY: InjectionKey<InlineEditContext> = Symbol('inlineEdit')

/**
 * Hook principal à utiliser dans SalesPageBuilder
 * Fournit le contexte d'édition inline à tous les blocs enfants
 */
export const useInlineEditProvider = (
  updateBlockPropsFn: (blockId: string, props: Record<string, any>) => void,
  isPreviewMode: Ref<boolean>
) => {
  const activeEditBlockId = ref<string | null>(null)
  const activeEditField = ref<string | null>(null)
  
  const isEditMode = computed(() => !isPreviewMode.value)
  
  const emitPropUpdate = (blockId: string, propKey: string, value: any) => {
    updateBlockPropsFn(blockId, { [propKey]: value })
  }
  
  const emitArrayPropUpdate = (
    blockId: string, 
    arrayKey: string, 
    index: number, 
    propKey: string, 
    value: any
  ) => {
    // Cette fonction sera appelée par le bloc pour mettre à jour un élément dans un array
    // Le bloc devra récupérer le tableau actuel et le modifier
    // Exemple: items[2].title = "Nouveau titre"
    // On émet un objet spécial qui indique une mise à jour d'array
    updateBlockPropsFn(blockId, {
      __arrayUpdate: {
        arrayKey,
        index,
        propKey,
        value
      }
    })
  }
  
  const startEditing = (blockId: string, field: string) => {
    activeEditBlockId.value = blockId
    activeEditField.value = field
  }
  
  const stopEditing = () => {
    activeEditBlockId.value = null
    activeEditField.value = null
  }
  
  const context: InlineEditContext = {
    isEditMode,
    activeEditBlockId,
    activeEditField,
    emitPropUpdate,
    emitArrayPropUpdate,
    startEditing,
    stopEditing
  }
  
  // Fournir le contexte aux composants enfants
  provide(INLINE_EDIT_KEY, context)
  
  return context
}

/**
 * Hook à utiliser dans les composants blocs
 * Permet d'accéder au contexte d'édition inline
 */
export const useInlineEdit = () => {
  const context = inject(INLINE_EDIT_KEY)
  
  if (!context) {
    // Fallback pour quand le composant est utilisé hors du builder (page publique)
    return {
      isEditMode: ref(false),
      activeEditBlockId: ref(null),
      activeEditField: ref(null),
      emitPropUpdate: () => {},
      emitArrayPropUpdate: () => {},
      startEditing: () => {},
      stopEditing: () => {}
    } as InlineEditContext
  }
  
  return context
}

/**
 * Helper pour créer un gestionnaire d'édition inline pour un élément
 */
export const createInlineEditHandler = (
  blockId: string,
  propKey: string,
  context: InlineEditContext
) => {
  return {
    onFocus: () => {
      context.startEditing(blockId, propKey)
    },
    onBlur: (e: FocusEvent) => {
      const target = e.target as HTMLElement
      const newValue = target.innerText || ''
      context.emitPropUpdate(blockId, propKey, newValue)
      context.stopEditing()
    },
    onInput: (e: Event) => {
      // Optionnel: mise à jour en temps réel
      const target = e.target as HTMLElement
      const newValue = target.innerText || ''
      context.emitPropUpdate(blockId, propKey, newValue)
    }
  }
}

/**
 * Helper pour créer un gestionnaire d'édition inline pour un élément dans un array
 */
export const createArrayInlineEditHandler = (
  blockId: string,
  arrayKey: string,
  index: number,
  propKey: string,
  context: InlineEditContext
) => {
  const fieldId = `${arrayKey}[${index}].${propKey}`
  
  return {
    onFocus: () => {
      context.startEditing(blockId, fieldId)
    },
    onBlur: (e: FocusEvent) => {
      const target = e.target as HTMLElement
      const newValue = target.innerText || ''
      context.emitArrayPropUpdate(blockId, arrayKey, index, propKey, newValue)
      context.stopEditing()
    }
  }
}

/**
 * Classes CSS pour les éléments éditables
 */
export const editableClasses = (isActive: boolean, isEditMode: boolean) => {
  if (!isEditMode) return ''
  
  return [
    'cursor-text',
    'outline-none',
    'transition-all',
    'duration-150',
    isActive 
      ? 'ring-2 ring-emerald-400 ring-offset-2 rounded-sm' 
      : 'hover:ring-1 hover:ring-emerald-300 hover:ring-offset-1 rounded-sm'
  ].join(' ')
}

/**
 * Attributs pour rendre un élément éditable
 */
export const editableAttrs = (isEditMode: boolean, placeholder?: string) => {
  if (!isEditMode) return {}
  
  return {
    contenteditable: 'true',
    'data-placeholder': placeholder || 'Cliquez pour éditer...',
    spellcheck: 'false'
  }
}
