import type { BlockTemplateGroup } from './types'

export const productTemplates: BlockTemplateGroup = {
  // ===== GRILLE 1 COLONNE =====
  'product-grid-1': {
    id: 'product-grid-1',
    name: '1 Colonne',
    category: 'minimal',
    description: 'Liste verticale',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-2xl mx-auto',
      grid: 'space-y-8',
      card: 'flex flex-col md:flex-row gap-6 items-start',
      imageWrapper: 'w-full md:w-48 flex-shrink-0',
      image: 'w-full aspect-square object-cover rounded-lg',
      content: 'flex-1',
      name: 'text-lg font-medium tracking-tight mb-2',
      description: 'text-sm opacity-60 leading-relaxed mb-4',
      priceWrapper: 'flex items-center gap-3 mb-4',
      price: 'text-xl font-semibold',
      originalPrice: 'text-base line-through opacity-40',
      button: 'inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-200',
    }
  },

  // ===== GRILLE 2 COLONNES =====
  'product-grid-2': {
    id: 'product-grid-2',
    name: '2 Colonnes',
    category: 'minimal',
    description: 'Grille 2 colonnes',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-8',
      card: 'flex flex-col',
      imageWrapper: 'mb-4',
      image: 'w-full aspect-square object-cover rounded-lg',
      content: '',
      name: 'text-lg font-medium tracking-tight mb-2',
      description: 'text-sm opacity-60 leading-relaxed mb-4',
      priceWrapper: 'flex items-center gap-3 mb-4',
      price: 'text-xl font-semibold',
      originalPrice: 'text-base line-through opacity-40',
      button: 'w-full flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200',
    }
  },

  // ===== GRILLE 3 COLONNES =====
  'product-grid-3': {
    id: 'product-grid-3',
    name: '3 Colonnes',
    category: 'minimal',
    description: 'Grille 3 colonnes',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
      card: 'flex flex-col',
      imageWrapper: 'mb-4',
      image: 'w-full aspect-square object-cover rounded-lg',
      content: '',
      name: 'text-base font-medium tracking-tight mb-2',
      description: 'text-sm opacity-60 leading-relaxed mb-3 line-clamp-2',
      priceWrapper: 'flex items-center gap-2 mb-4',
      price: 'text-lg font-semibold',
      originalPrice: 'text-sm line-through opacity-40',
      button: 'w-full flex items-center justify-center px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200',
    }
  },

  // ===== GRILLE 4 COLONNES =====
  'product-grid-4': {
    id: 'product-grid-4',
    name: '4 Colonnes',
    category: 'minimal',
    description: 'Grille 4 colonnes',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-7xl mx-auto',
      grid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5',
      card: 'flex flex-col',
      imageWrapper: 'mb-3',
      image: 'w-full aspect-square object-cover rounded-lg',
      content: '',
      name: 'text-sm font-medium tracking-tight mb-1',
      description: 'text-xs opacity-60 leading-relaxed mb-2 line-clamp-2',
      priceWrapper: 'flex items-center gap-2 mb-3',
      price: 'text-base font-semibold',
      originalPrice: 'text-xs line-through opacity-40',
      button: 'w-full flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200',
    }
  },

  // ===== MODERN GRILLE =====
  'product-modern-grid': {
    id: 'product-modern-grid',
    name: 'Modern Card',
    category: 'modern',
    description: 'Cartes modernes',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
      card: 'flex flex-col border rounded-xl overflow-hidden',
      imageWrapper: '',
      image: 'w-full aspect-square object-cover',
      content: 'p-5',
      name: 'text-base font-semibold tracking-tight mb-2',
      description: 'text-sm opacity-60 leading-relaxed mb-4 line-clamp-2',
      priceWrapper: 'flex items-center gap-2 mb-4',
      price: 'text-lg font-bold',
      originalPrice: 'text-sm line-through opacity-40',
      button: 'w-full flex items-center justify-center px-5 py-3 text-sm font-semibold tracking-wide rounded-lg transition-all duration-200',
    }
  },

  // ===== COMPACT =====
  'product-compact': {
    id: 'product-compact',
    name: 'Compact',
    category: 'minimal',
    description: 'Liste compacte',
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-4xl mx-auto',
      grid: 'space-y-4',
      card: 'flex items-center gap-4 p-4 border rounded-lg',
      imageWrapper: 'w-20 h-20 flex-shrink-0',
      image: 'w-full h-full object-cover rounded-lg',
      content: 'flex-1 min-w-0',
      name: 'text-sm font-medium tracking-tight truncate',
      description: 'hidden',
      priceWrapper: 'flex items-center gap-2',
      price: 'text-base font-semibold',
      originalPrice: 'text-sm line-through opacity-40',
      button: 'flex-shrink-0 inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200',
    }
  },

  // ===== HORIZONTAL =====
  'product-horizontal': {
    id: 'product-horizontal',
    name: 'Horizontal',
    category: 'modern',
    description: 'Layout horizontal',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto',
      grid: 'space-y-10',
      card: 'grid md:grid-cols-2 gap-8 items-center',
      imageWrapper: '',
      image: 'w-full aspect-[4/3] object-cover rounded-lg',
      content: '',
      name: 'text-xl font-semibold tracking-tight mb-3',
      description: 'text-sm opacity-60 leading-relaxed mb-5',
      priceWrapper: 'flex items-center gap-3 mb-5',
      price: 'text-2xl font-bold',
      originalPrice: 'text-lg line-through opacity-40',
      button: 'inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-wide transition-all duration-200',
    }
  },

  // ===== PREMIUM SHOWCASE =====
  'product-showcase': {
    id: 'product-showcase',
    name: 'Showcase',
    category: 'bold',
    description: 'Mise en avant premium',
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-10',
      card: 'flex flex-col text-center',
      imageWrapper: 'mb-6',
      image: 'w-full aspect-[3/4] object-cover rounded-xl',
      content: '',
      name: 'text-xl font-light tracking-wide mb-3',
      description: 'text-sm opacity-60 leading-relaxed mb-5',
      priceWrapper: 'flex items-center justify-center gap-3 mb-6',
      price: 'text-2xl font-light tracking-wide',
      originalPrice: 'text-lg line-through opacity-40',
      button: 'mx-auto flex items-center justify-center px-10 py-3 text-sm font-medium tracking-[0.1em] uppercase border transition-all duration-200',
    }
  },
}

export default productTemplates
