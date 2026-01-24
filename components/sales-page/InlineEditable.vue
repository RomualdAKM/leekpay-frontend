<template>
  <component
    :is="tag"
    ref="editableRef"
    :class="[
      computedClasses,
      isEditMode && 'inline-editable',
      isEditing && 'inline-editable--active',
      !hasContent && isEditMode && 'inline-editable--empty'
    ]"
    :style="props.style"
    v-bind="editableAttributes"
    @focus="handleFocus"
    @blur="handleBlur"
    @input="handleInput"
    @keydown="handleKeydown"
    @paste="handlePaste"
  >
    <slot>{{ displayContent }}</slot>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useInlineEdit, editableClasses } from '~/composables/useInlineEdit'

interface Props {
  /** ID du bloc parent */
  blockId: string
  /** Clé de la prop à éditer */
  propKey: string
  /** Valeur actuelle */
  modelValue: string
  /** Tag HTML à utiliser (h1, h2, p, span, etc.) */
  tag?: string
  /** Placeholder quand vide */
  placeholder?: string
  /** Classes CSS supplémentaires */
  class?: string | string[] | Record<string, boolean>
  /** Styles inline */
  style?: Record<string, string>
  /** Désactiver l'édition */
  disabled?: boolean
  /** Permettre le HTML (pour rich text) */
  allowHtml?: boolean
  /** Nombre max de caractères */
  maxLength?: number
  /** Mode une seule ligne (empêche les retours à la ligne) */
  singleLine?: boolean
  /** Pour les éléments dans un array: clé du tableau */
  arrayKey?: string
  /** Pour les éléments dans un array: index dans le tableau */
  arrayIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
  placeholder: 'Cliquez pour éditer...',
  disabled: false,
  allowHtml: false,
  singleLine: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()

// Contexte d'édition inline
const inlineEdit = useInlineEdit()
const isEditMode = computed(() => inlineEdit.isEditMode.value && !props.disabled)

// Référence à l'élément DOM
const editableRef = ref<HTMLElement | null>(null)

// État local
const localValue = ref(props.modelValue || '')
const isFocused = ref(false)

// Identifiant unique du champ
const fieldId = computed(() => {
  if (props.arrayKey !== undefined && props.arrayIndex !== undefined) {
    return `${props.arrayKey}[${props.arrayIndex}].${props.propKey}`
  }
  return props.propKey
})

// Est-ce que ce champ est actuellement en cours d'édition?
const isEditing = computed(() => {
  return isFocused.value || (
    inlineEdit.activeEditBlockId.value === props.blockId &&
    inlineEdit.activeEditField.value === fieldId.value
  )
})

// Contenu à afficher
const displayContent = computed(() => {
  if (props.allowHtml) {
    return localValue.value
  }
  return localValue.value || (isEditMode.value ? '' : props.placeholder)
})

// Y a-t-il du contenu?
const hasContent = computed(() => {
  return localValue.value && localValue.value.trim().length > 0
})

// Classes calculées
const computedClasses = computed(() => {
  const base = editableClasses(isEditing.value, isEditMode.value)
  
  if (typeof props.class === 'string') {
    return `${base} ${props.class}`
  }
  if (Array.isArray(props.class)) {
    return `${base} ${props.class.join(' ')}`
  }
  if (typeof props.class === 'object') {
    const active = Object.entries(props.class)
      .filter(([_, v]) => v)
      .map(([k]) => k)
      .join(' ')
    return `${base} ${active}`
  }
  return base
})

// Attributs pour l'édition
const editableAttributes = computed(() => {
  if (!isEditMode.value) return {}
  
  return {
    contenteditable: 'true',
    'data-placeholder': props.placeholder,
    spellcheck: 'false',
    role: 'textbox',
    'aria-label': props.placeholder
  }
})

// Synchroniser avec la valeur externe
watch(() => props.modelValue, (newVal) => {
  if (newVal !== localValue.value && !isFocused.value) {
    localValue.value = newVal || ''
    // Mettre à jour le contenu DOM si nécessaire
    if (editableRef.value && editableRef.value.innerText !== newVal) {
      editableRef.value.innerText = newVal || ''
    }
  }
})

// Handlers
const handleFocus = () => {
  isFocused.value = true
  inlineEdit.startEditing(props.blockId, fieldId.value)
  emit('focus')
}

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false
  
  const target = e.target as HTMLElement
  const newValue = props.allowHtml ? target.innerHTML : target.innerText
  
  // Émettre la mise à jour
  if (newValue !== localValue.value) {
    localValue.value = newValue
    emit('update:modelValue', newValue)
    
    // Mettre à jour via le contexte inline edit
    if (props.arrayKey !== undefined && props.arrayIndex !== undefined) {
      inlineEdit.emitArrayPropUpdate(
        props.blockId,
        props.arrayKey,
        props.arrayIndex,
        props.propKey,
        newValue
      )
    } else {
      inlineEdit.emitPropUpdate(props.blockId, props.propKey, newValue)
    }
  }
  
  inlineEdit.stopEditing()
  emit('blur')
}

const handleInput = (e: Event) => {
  const target = e.target as HTMLElement
  let newValue = props.allowHtml ? target.innerHTML : target.innerText
  
  // Limiter la longueur si nécessaire
  if (props.maxLength && newValue.length > props.maxLength) {
    newValue = newValue.slice(0, props.maxLength)
    target.innerText = newValue
    // Repositionner le curseur à la fin
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(target)
    range.collapse(false)
    sel?.removeAllRanges()
    sel?.addRange(range)
  }
  
  localValue.value = newValue
  emit('update:modelValue', newValue)
}

const handleKeydown = (e: KeyboardEvent) => {
  // Empêcher Enter en mode single line
  if (props.singleLine && e.key === 'Enter') {
    e.preventDefault()
    ;(e.target as HTMLElement).blur()
    return
  }
  
  // Escape pour annuler l'édition
  if (e.key === 'Escape') {
    // Restaurer la valeur d'origine
    if (editableRef.value) {
      editableRef.value.innerText = props.modelValue || ''
    }
    localValue.value = props.modelValue || ''
    ;(e.target as HTMLElement).blur()
  }
}

const handlePaste = (e: ClipboardEvent) => {
  if (!props.allowHtml) {
    e.preventDefault()
    // Coller uniquement le texte brut
    const text = e.clipboardData?.getData('text/plain') || ''
    document.execCommand('insertText', false, text)
  }
}

// Initialiser le contenu au montage
onMounted(() => {
  if (editableRef.value && localValue.value) {
    editableRef.value.innerText = localValue.value
  }
})
</script>

<style scoped>
.inline-editable {
  min-width: 20px;
  min-height: 1em;
}

.inline-editable:focus {
  outline: none;
}

.inline-editable--empty::before {
  content: attr(data-placeholder);
  color: #9ca3af;
  font-style: italic;
  pointer-events: none;
}

.inline-editable--empty:focus::before {
  content: '';
}

/* Animation subtile au survol en mode édition */
.inline-editable:not(.inline-editable--active):hover {
  background-color: rgba(16, 185, 129, 0.05);
}
</style>
