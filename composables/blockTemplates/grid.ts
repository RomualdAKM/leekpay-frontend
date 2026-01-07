import type { BlockTemplateGroup } from './types'

export const gridTemplates: BlockTemplateGroup = {
  // ===== 2 COLONNES =====
  'grid-2-cols': {
    id: 'grid-2-cols',
    name: '2 Colonnes',
    category: 'minimal',
    description: 'Grille 2 colonnes équilibrées',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2',
    }
  },
  'grid-2-cols-wide': {
    id: 'grid-2-cols-wide',
    name: '2 Colonnes Large',
    category: 'minimal',
    description: 'Grille 2 colonnes pleine largeur',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-7xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2',
    }
  },
  'grid-2-asymmetric-left': {
    id: 'grid-2-asymmetric-left',
    name: '2 Cols - Gauche Large',
    category: 'modern',
    description: 'Colonne gauche plus large',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-5',
      colSpans: { 1: 'md:col-span-3', 2: 'md:col-span-2' },
    }
  },
  'grid-2-asymmetric-right': {
    id: 'grid-2-asymmetric-right',
    name: '2 Cols - Droite Large',
    category: 'modern',
    description: 'Colonne droite plus large',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-5',
      colSpans: { 1: 'md:col-span-2', 2: 'md:col-span-3' },
    }
  },

  // ===== 3 COLONNES =====
  'grid-3-cols': {
    id: 'grid-3-cols',
    name: '3 Colonnes',
    category: 'minimal',
    description: 'Grille 3 colonnes',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    }
  },
  'grid-3-cols-wide': {
    id: 'grid-3-cols-wide',
    name: '3 Colonnes Large',
    category: 'minimal',
    description: 'Grille 3 colonnes pleine largeur',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-7xl mx-auto',
      grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    }
  },

  // ===== 4 COLONNES =====
  'grid-4-cols': {
    id: 'grid-4-cols',
    name: '4 Colonnes',
    category: 'minimal',
    description: 'Grille 4 colonnes',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-7xl mx-auto',
      grid: 'grid grid-cols-2 md:grid-cols-4',
    }
  },

  // ===== 1 COLONNE (EMPILÉ) =====
  'grid-1-col': {
    id: 'grid-1-col',
    name: '1 Colonne',
    category: 'minimal',
    description: 'Éléments empilés verticalement',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-3xl mx-auto',
      grid: 'flex flex-col',
    }
  },
  'grid-1-col-wide': {
    id: 'grid-1-col-wide',
    name: '1 Colonne Large',
    category: 'minimal',
    description: 'Éléments empilés pleine largeur',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-5xl mx-auto',
      grid: 'flex flex-col',
    }
  },

  // ===== LAYOUTS SPÉCIAUX =====
  'grid-masonry-2': {
    id: 'grid-masonry-2',
    name: 'Masonry 2 Cols',
    category: 'bold',
    description: 'Effet masonry 2 colonnes',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'columns-1 md:columns-2',
    }
  },
  'grid-featured': {
    id: 'grid-featured',
    name: 'Featured Layout',
    category: 'bold',
    description: 'Un grand + 2 petits',
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2',
      colSpans: { 1: 'md:row-span-2' },
    }
  },
}

export default gridTemplates
