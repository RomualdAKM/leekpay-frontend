import type { BlockTemplateGroup } from './types'

export const faqTemplates: BlockTemplateGroup = {
  // ===== MINIMAL =====
  'faq-minimal-1': {
    id: 'faq-minimal-1',
    name: 'Minimal Accordéon',
    category: 'minimal',
    description: 'FAQ accordéon épuré',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-2xl mx-auto',
      title: 'text-2xl md:text-3xl font-light tracking-tight text-center mb-12',
      grid: 'space-y-0',
      card: 'border-b py-6',
      question: 'text-base font-medium cursor-pointer flex justify-between items-center',
      answer: 'text-sm opacity-70 mt-4 leading-relaxed',
      icon: 'w-4 h-4 opacity-50 flex-shrink-0 ml-4',
    }
  },
  'faq-minimal-2': {
    id: 'faq-minimal-2',
    name: 'Minimal Liste',
    category: 'minimal',
    description: 'Liste simple de questions',
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-xl mx-auto',
      title: 'text-xl md:text-2xl font-light tracking-tight mb-10',
      grid: 'space-y-8',
      card: '',
      question: 'text-sm font-medium mb-2',
      answer: 'text-sm opacity-60 leading-relaxed',
      icon: 'hidden',
    }
  },
  'faq-minimal-3': {
    id: 'faq-minimal-3',
    name: 'Minimal Compact',
    category: 'minimal',
    description: 'Version très compacte',
    styles: {
      section: 'py-10 md:py-14 px-6',
      container: 'max-w-lg mx-auto',
      title: 'text-lg font-normal tracking-tight text-center mb-8',
      grid: 'space-y-4',
      card: 'py-3 border-b last:border-b-0',
      question: 'text-sm font-medium flex justify-between items-center cursor-pointer',
      answer: 'text-xs opacity-60 mt-2 leading-relaxed',
      icon: 'w-3 h-3 opacity-40 flex-shrink-0',
    }
  },

  // ===== MODERN =====
  'faq-modern-1': {
    id: 'faq-modern-1',
    name: 'Modern Cards',
    category: 'modern',
    description: 'FAQ en cartes modernes',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-4xl mx-auto',
      title: 'text-3xl md:text-4xl font-semibold tracking-tight text-center mb-14',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
      card: 'border p-6',
      question: 'text-base font-semibold mb-3',
      answer: 'text-sm opacity-70 leading-relaxed',
      icon: 'hidden',
    }
  },
  'faq-modern-2': {
    id: 'faq-modern-2',
    name: 'Modern Numéroté',
    category: 'modern',
    description: 'FAQ avec numérotation',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-3xl mx-auto',
      title: 'text-2xl md:text-3xl font-semibold tracking-tight mb-12',
      grid: 'space-y-6',
      card: 'flex gap-6 py-6 border-b last:border-b-0',
      question: 'text-base font-semibold',
      answer: 'text-sm opacity-70 mt-2 leading-relaxed',
      icon: 'w-8 h-8 flex items-center justify-center border text-sm font-semibold flex-shrink-0',
    }
  },
  'faq-modern-3': {
    id: 'faq-modern-3',
    name: 'Modern Split',
    category: 'modern',
    description: 'Layout titre à gauche',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto grid md:grid-cols-3 gap-12',
      title: 'text-2xl md:text-3xl font-semibold tracking-tight md:col-span-1',
      grid: 'md:col-span-2 space-y-6',
      card: 'py-5 border-b last:border-b-0',
      question: 'text-base font-semibold flex justify-between items-center cursor-pointer',
      answer: 'text-sm opacity-70 mt-4 leading-relaxed',
      icon: 'w-5 h-5 opacity-50 flex-shrink-0',
    }
  },

  // ===== BOLD =====
  'faq-bold-1': {
    id: 'faq-bold-1',
    name: 'Bold Grande Taille',
    category: 'bold',
    description: 'FAQ en grande taille',
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-4xl mx-auto',
      title: 'text-4xl md:text-5xl font-black tracking-tight text-center mb-16 uppercase',
      grid: 'space-y-0',
      card: 'py-8 border-b-4 last:border-b-0',
      question: 'text-xl md:text-2xl font-bold cursor-pointer flex justify-between items-center uppercase tracking-wide',
      answer: 'text-base opacity-80 mt-6 leading-relaxed',
      icon: 'w-6 h-6 flex-shrink-0 ml-6',
    }
  },
  'faq-bold-2': {
    id: 'faq-bold-2',
    name: 'Bold Boxes',
    category: 'bold',
    description: 'Questions en boîtes',
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-5xl mx-auto',
      title: 'text-3xl md:text-4xl font-black tracking-tight mb-14 uppercase',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
      card: 'border-4 p-8',
      question: 'text-lg font-bold uppercase tracking-wide',
      answer: 'text-sm opacity-70 mt-4 leading-relaxed',
      icon: 'hidden',
    }
  },
  'faq-bold-3': {
    id: 'faq-bold-3',
    name: 'Bold Full Width',
    category: 'bold',
    description: 'FAQ pleine largeur',
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-6xl mx-auto',
      title: 'text-4xl md:text-5xl font-black tracking-tight text-center mb-16 uppercase',
      grid: 'space-y-0',
      card: 'py-10 border-b-4 last:border-b-0',
      question: 'text-xl font-bold flex justify-between items-center cursor-pointer',
      answer: 'text-base opacity-80 mt-6 leading-relaxed max-w-3xl',
      icon: 'w-8 h-8 border-2 flex-shrink-0 ml-8 flex items-center justify-center font-bold',
    }
  },

  // ===== PREMIUM =====
  'faq-premium-elegant': {
    id: 'faq-premium-elegant',
    name: 'Premium Élégant',
    category: 'minimal',
    description: 'FAQ élégante et raffinée',
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-3xl mx-auto',
      title: 'text-3xl md:text-4xl font-light tracking-wide text-center mb-16',
      grid: 'space-y-0 divide-y',
      card: 'py-8',
      question: 'text-lg font-normal tracking-wide cursor-pointer flex justify-between items-center',
      answer: 'text-base font-light opacity-70 mt-6 leading-loose',
      icon: 'w-5 h-5 opacity-40 flex-shrink-0 ml-6 transition-transform duration-500',
    }
  },
  'faq-premium-magazine': {
    id: 'faq-premium-magazine',
    name: 'Premium Magazine',
    category: 'modern',
    description: 'Style magazine haut de gamme',
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-5xl mx-auto',
      title: 'text-4xl md:text-5xl font-serif font-normal tracking-tight text-center mb-20',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12',
      card: '',
      question: 'text-lg font-semibold mb-4',
      answer: 'text-base font-light opacity-70 leading-relaxed',
      icon: 'hidden',
    }
  },
  'faq-premium-minimal': {
    id: 'faq-premium-minimal',
    name: 'Premium Ultra Minimal',
    category: 'minimal',
    description: 'Minimalisme extrême',
    styles: {
      section: 'py-24 md:py-40 px-6',
      container: 'max-w-2xl mx-auto',
      title: 'text-xl font-light tracking-widest uppercase text-center mb-20 opacity-60',
      grid: 'space-y-12',
      card: '',
      question: 'text-base font-medium tracking-wide cursor-pointer',
      answer: 'text-sm font-light opacity-50 mt-4 leading-loose',
      icon: 'hidden',
    }
  },
  'faq-premium-luxe': {
    id: 'faq-premium-luxe',
    name: 'Premium Luxe',
    category: 'bold',
    description: 'Style luxueux avec détails dorés',
    styles: {
      section: 'py-24 md:py-36 px-6',
      container: 'max-w-4xl mx-auto',
      title: 'text-3xl md:text-4xl font-light tracking-widest uppercase text-center mb-20',
      grid: 'space-y-0',
      card: 'py-10 border-b border-current/20 last:border-b-0',
      question: 'text-lg font-medium tracking-wide cursor-pointer flex justify-between items-center uppercase',
      answer: 'text-base font-light opacity-70 mt-8 leading-loose max-w-2xl',
      icon: 'w-6 h-6 opacity-50 flex-shrink-0 ml-8 transition-transform duration-300',
    }
  },
  'faq-premium-sidebar': {
    id: 'faq-premium-sidebar',
    name: 'Premium Sidebar',
    category: 'modern',
    description: 'Titre en sidebar fixe',
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-6xl mx-auto grid md:grid-cols-12 gap-12',
      title: 'text-2xl md:text-3xl font-semibold tracking-tight md:col-span-4 md:sticky md:top-24 md:self-start',
      grid: 'md:col-span-8 space-y-0 divide-y',
      card: 'py-8',
      question: 'text-base font-semibold cursor-pointer flex justify-between items-center',
      answer: 'text-sm opacity-70 mt-5 leading-relaxed',
      icon: 'w-5 h-5 opacity-50 flex-shrink-0 ml-6',
    }
  },
}

export default faqTemplates
