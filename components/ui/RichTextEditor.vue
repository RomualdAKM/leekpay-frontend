<template>
  <div class="rich-text-editor">
    <ClientOnly>
      <QuillEditor
        v-model:content="content"
        :options="editorOptions"
        :disabled="disabled"
        @blur="onBlur"
        @focus="onFocus"
        @ready="onReady"
        @change="onChange"
        content-type="html"
        theme="snow"
      />
      <template #fallback>
        <div class="quill-fallback">
          <div class="ql-toolbar-fallback">
            <span class="text-sm text-gray-500">Chargement de l'éditeur...</span>
          </div>
          <div class="ql-editor-fallback">
            <textarea 
              :value="modelValue" 
              :placeholder="placeholder"
              :disabled="disabled"
              class="w-full min-h-[120px] p-3 border-0 resize-none focus:outline-none"
              readonly
            />
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Écrivez votre contenu ici...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  editorClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'ready', 'change'])

// Configuration complète de l'éditeur Quill
const editorOptions = {
  placeholder: props.placeholder,
  modules: {
    toolbar: [
      // Formatage du texte
      ['bold', 'italic', 'underline', 'strike'],
      
      // Titres
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
      // Couleurs
      [{ 'color': [] }, { 'background': [] }],
      
      // Polices et tailles
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      
      // Alignement
      [{ 'align': [] }],
      
      // Listes
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      
      // Indentation
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      
      // Direction du texte
      [{ 'direction': 'rtl' }],
      
      // Scripts
      [{ 'script': 'sub'}, { 'script': 'super' }],
      
      // Blocs spéciaux
      ['blockquote', 'code-block'],
      
      // Médias et liens
      ['link', 'image', 'video'],
      
      // Nettoyage
      ['clean']
    ]
  },
  theme: 'snow'
}

// Gestion du contenu avec v-model
const content = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Événements de l'éditeur
const onBlur = (quill) => {
  emit('blur', quill)
}

const onFocus = (quill) => {
  emit('focus', quill)
}

const onReady = (quill) => {
  emit('ready', quill)
}

const onChange = ({ quill, html, text }) => {
  emit('change', { quill, html, text })
  emit('update:modelValue', html)
}
</script>

<style scoped>
.rich-text-editor {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
}

.rich-text-editor :deep(.ql-toolbar) {
  border-bottom: 1px solid #d1d5db;
  background-color: #f9fafb;
}

.rich-text-editor :deep(.ql-container) {
  min-height: 120px;
  font-size: 14px;
}

.rich-text-editor :deep(.ql-editor) {
  min-height: 120px;
  padding: 12px;
}

.rich-text-editor :deep(.ql-editor.ql-blank::before) {
  font-style: normal;
  color: #9ca3af;
}

/* Styles pour les éléments de contenu */
.rich-text-editor :deep(.ql-editor) h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0.67em 0;
}

.rich-text-editor :deep(.ql-editor) h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.75em 0;
}

.rich-text-editor :deep(.ql-editor) h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin: 0.83em 0;
}

.rich-text-editor :deep(.ql-editor) blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}

.rich-text-editor :deep(.ql-editor) code {
  background-color: #f3f4f6;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.rich-text-editor :deep(.ql-editor) pre {
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 3px;
  padding: 8px 12px;
  overflow-x: auto;
}

.rich-text-editor :deep(.ql-editor) img {
  max-width: 100%;
  height: auto;
}

.rich-text-editor :deep(.ql-editor) a {
  color: #3b82f6;
  text-decoration: underline;
}

.rich-text-editor :deep(.ql-editor) a:hover {
   color: #1d4ed8;
 }
 
 /* Styles pour le fallback */
 .quill-fallback {
   border: 1px solid #d1d5db;
   border-radius: 0.5rem;
   overflow: hidden;
 }
 
 .ql-toolbar-fallback {
   border-bottom: 1px solid #d1d5db;
   background-color: #f9fafb;
   padding: 8px 12px;
 }
 
 .ql-editor-fallback {
   min-height: 120px;
 }
 </style>