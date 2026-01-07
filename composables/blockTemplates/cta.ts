import type { BlockTemplateGroup } from './types'

export const ctaTemplates: BlockTemplateGroup = {
  // ===== MINIMAL =====
  'cta-minimal-1': {
    id: 'cta-minimal-1',
    name: 'Minimal Centré',
    category: 'minimal',
    description: 'CTA épuré centré',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-2xl mx-auto text-center',
      text: 'text-xl md:text-2xl font-light tracking-tight',
      button: 'mt-8 px-8 py-4 text-sm font-medium uppercase tracking-widest border-2 transition-colors duration-200',
    }
  },
  'cta-minimal-2': {
    id: 'cta-minimal-2',
    name: 'Minimal Ligne',
    category: 'minimal',
    description: 'CTA avec ligne horizontale',
    styles: {
      section: 'py-12 md:py-16 px-6 border-t border-b',
      container: 'max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6',
      text: 'text-lg md:text-xl font-normal',
      button: 'px-6 py-3 text-sm font-medium tracking-wide border transition-colors duration-200 whitespace-nowrap',
    }
  },
  'cta-minimal-3': {
    id: 'cta-minimal-3',
    name: 'Minimal Discret',
    category: 'minimal',
    description: 'CTA très discret',
    styles: {
      section: 'py-10 md:py-14 px-6',
      container: 'max-w-xl mx-auto text-center',
      text: 'text-base md:text-lg font-light opacity-80',
      button: 'mt-6 px-6 py-3 text-xs font-semibold uppercase tracking-widest border transition-colors duration-200',
    }
  },

  // ===== MODERN =====
  'cta-modern-1': {
    id: 'cta-modern-1',
    name: 'Modern Card',
    category: 'modern',
    description: 'CTA style carte moderne',
    styles: {
      section: 'py-16 md:py-20 px-6',
      container: 'max-w-4xl mx-auto text-center border p-10 md:p-16',
      text: 'text-2xl md:text-3xl font-semibold tracking-tight',
      button: 'mt-10 px-10 py-4 text-sm font-semibold tracking-wide transition-colors duration-200',
    }
  },
  'cta-modern-2': {
    id: 'cta-modern-2',
    name: 'Modern Split',
    category: 'modern',
    description: 'CTA divisé en deux colonnes',
    styles: {
      section: 'py-16 md:py-20 px-6',
      container: 'max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center',
      text: 'text-2xl md:text-3xl font-semibold tracking-tight',
      button: 'px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-200 w-full md:w-auto text-center',
    }
  },
  'cta-modern-3': {
    id: 'cta-modern-3',
    name: 'Modern Accent',
    category: 'modern',
    description: 'CTA avec accent coloré',
    styles: {
      section: 'py-14 md:py-20 px-6 border-l-4',
      container: 'max-w-3xl mx-auto pl-6 md:pl-10',
      text: 'text-xl md:text-2xl font-medium',
      button: 'mt-8 px-8 py-4 text-sm font-medium uppercase tracking-wider transition-colors duration-200',
    }
  },

  // ===== BOLD =====
  'cta-bold-1': {
    id: 'cta-bold-1',
    name: 'Bold Pleine Largeur',
    category: 'bold',
    description: 'CTA audacieux pleine largeur',
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-4xl mx-auto text-center',
      text: 'text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase',
      button: 'mt-12 px-14 py-5 text-base font-bold uppercase tracking-widest transition-colors duration-200',
    }
  },
  'cta-bold-2': {
    id: 'cta-bold-2',
    name: 'Bold Inverse',
    category: 'bold',
    description: 'CTA avec couleurs inversées',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 p-10 md:p-14',
      text: 'text-2xl md:text-3xl font-bold tracking-tight',
      button: 'px-10 py-5 text-sm font-bold uppercase tracking-widest border-4 transition-colors duration-200 whitespace-nowrap',
    }
  },
  'cta-bold-3': {
    id: 'cta-bold-3',
    name: 'Bold Géométrique',
    category: 'bold',
    description: 'CTA avec forme géométrique',
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-3xl mx-auto text-center',
      text: 'text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight',
      button: 'mt-10 px-12 py-5 text-sm font-black uppercase tracking-widest transition-colors duration-200',
    }
  },

  // ===== PREMIUM =====
  'cta-premium-elegant': {
    id: 'cta-premium-elegant',
    name: 'Premium Élégant',
    category: 'minimal',
    description: 'CTA élégant et raffiné',
    styles: {
      section: 'py-24 md:py-36 px-6',
      container: 'max-w-3xl mx-auto text-center',
      text: 'text-2xl md:text-3xl font-light tracking-wide leading-relaxed',
      button: 'mt-12 px-12 py-5 text-sm font-medium tracking-[0.3em] uppercase border transition-all duration-300 hover:tracking-[0.4em]',
    }
  },
  'cta-premium-gradient': {
    id: 'cta-premium-gradient',
    name: 'Premium Gradient',
    category: 'modern',
    description: 'CTA avec effet gradient',
    styles: {
      section: 'py-20 md:py-32 px-6 bg-gradient-to-br from-current/5 to-current/10',
      container: 'max-w-4xl mx-auto text-center',
      text: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
      button: 'mt-12 px-14 py-6 text-base font-bold tracking-wide rounded-full transition-transform duration-300 hover:scale-105',
    }
  },
  'cta-premium-floating': {
    id: 'cta-premium-floating',
    name: 'Premium Floating',
    category: 'modern',
    description: 'CTA avec effet flottant',
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-4xl mx-auto text-center p-12 md:p-20 border rounded-3xl',
      text: 'text-2xl md:text-3xl font-semibold tracking-tight',
      button: 'mt-10 px-10 py-4 text-sm font-semibold tracking-wide rounded-xl transition-all duration-200',
    }
  },
  'cta-premium-split': {
    id: 'cta-premium-split',
    name: 'Premium Split',
    category: 'modern',
    description: 'CTA divisé premium',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center',
      text: 'text-3xl md:text-4xl font-bold tracking-tight leading-tight',
      button: 'px-10 py-5 text-base font-semibold tracking-wide transition-colors duration-200 w-full md:w-auto text-center',
    }
  },
  'cta-premium-minimal': {
    id: 'cta-premium-minimal',
    name: 'Premium Ultra Minimal',
    category: 'minimal',
    description: 'Minimalisme extrême',
    styles: {
      section: 'py-20 md:py-32 px-6 border-t border-b',
      container: 'max-w-2xl mx-auto text-center',
      text: 'text-lg md:text-xl font-light tracking-wide opacity-80',
      button: 'mt-10 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase border transition-all duration-200',
    }
  },
  'cta-premium-banner': {
    id: 'cta-premium-banner',
    name: 'Premium Banner',
    category: 'bold',
    description: 'Bannière CTA impactante',
    styles: {
      section: 'py-10 md:py-14 px-6',
      container: 'max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6',
      text: 'text-xl md:text-2xl font-bold tracking-tight',
      button: 'px-8 py-4 text-sm font-bold tracking-wide uppercase whitespace-nowrap transition-colors duration-200',
    }
  },
}

export default ctaTemplates
