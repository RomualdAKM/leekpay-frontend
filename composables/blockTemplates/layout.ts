import type { BlockTemplateGroup } from './types'

// ========== HEADER TEMPLATES ==========
export const headerTemplates: BlockTemplateGroup = {
  'header-minimal-1': {
    id: 'header-minimal-1',
    name: 'Minimal Centré',
    category: 'minimal',
    description: 'Header centré épuré',
    styles: {
      section: 'py-6 px-6 border-b',
      container: 'max-w-5xl mx-auto flex items-center justify-center',
      logo: 'h-8',
      nav: 'hidden',
    }
  },
  'header-minimal-2': {
    id: 'header-minimal-2',
    name: 'Minimal Split',
    category: 'minimal',
    description: 'Logo à gauche',
    styles: {
      section: 'py-5 px-6',
      container: 'max-w-6xl mx-auto flex items-center justify-between',
      logo: 'h-7',
      nav: 'flex gap-6 text-sm font-light',
    }
  },
  'header-minimal-3': {
    id: 'header-minimal-3',
    name: 'Minimal Compact',
    category: 'minimal',
    description: 'Header très compact',
    styles: {
      section: 'py-4 px-6',
      container: 'max-w-5xl mx-auto flex items-center justify-between',
      logo: 'h-6',
      nav: 'flex gap-4 text-xs font-light opacity-70',
    }
  },
  'header-modern-1': {
    id: 'header-modern-1',
    name: 'Modern Standard',
    category: 'modern',
    description: 'Header moderne standard',
    styles: {
      section: 'py-5 px-6 border-b',
      container: 'max-w-6xl mx-auto flex items-center justify-between',
      logo: 'h-8',
      nav: 'flex items-center gap-8 text-sm font-medium',
    }
  },
  'header-modern-2': {
    id: 'header-modern-2',
    name: 'Modern Sticky',
    category: 'modern',
    description: 'Header fixe moderne',
    styles: {
      section: 'py-4 px-6 border-b sticky top-0 z-50 backdrop-blur-sm',
      container: 'max-w-6xl mx-auto flex items-center justify-between',
      logo: 'h-8',
      nav: 'flex items-center gap-6 text-sm font-medium',
    }
  },
  'header-modern-3': {
    id: 'header-modern-3',
    name: 'Modern Transparent',
    category: 'modern',
    description: 'Header transparent',
    styles: {
      section: 'py-6 px-6 absolute top-0 left-0 right-0 z-50',
      container: 'max-w-6xl mx-auto flex items-center justify-between',
      logo: 'h-8',
      nav: 'flex items-center gap-8 text-sm font-semibold',
    }
  },
  'header-bold-1': {
    id: 'header-bold-1',
    name: 'Bold Large',
    category: 'bold',
    description: 'Header large audacieux',
    styles: {
      section: 'py-8 px-6 border-b-4',
      container: 'max-w-6xl mx-auto flex items-center justify-between',
      logo: 'h-12',
      nav: 'flex items-center gap-10 text-sm font-bold uppercase tracking-wide',
    }
  },
  'header-bold-2': {
    id: 'header-bold-2',
    name: 'Bold Boxed',
    category: 'bold',
    description: 'Header en boîte',
    styles: {
      section: 'py-6 px-6',
      container: 'max-w-6xl mx-auto flex items-center justify-between border-4 px-8 py-4',
      logo: 'h-10',
      nav: 'flex items-center gap-8 text-sm font-bold uppercase tracking-wider',
    }
  },
  'header-bold-3': {
    id: 'header-bold-3',
    name: 'Bold Full Width',
    category: 'bold',
    description: 'Header pleine largeur',
    styles: {
      section: 'py-6 px-8 border-b-4',
      container: 'flex items-center justify-between',
      logo: 'h-10',
      nav: 'flex items-center gap-10 text-base font-black uppercase tracking-widest',
    }
  },
}

// ========== FOOTER TEMPLATES ==========
export const footerTemplates: BlockTemplateGroup = {
  'footer-minimal-1': {
    id: 'footer-minimal-1',
    name: 'Minimal Centré',
    category: 'minimal',
    description: 'Footer centré épuré',
    styles: {
      section: 'py-10 px-6 border-t',
      container: 'max-w-4xl mx-auto text-center',
      logo: 'h-6 mx-auto mb-4',
      links: 'flex justify-center gap-6 text-sm opacity-60 mb-4',
      socials: 'flex justify-center gap-4 mb-6',
      socialLink: 'w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200',
      copyright: 'text-xs opacity-40',
    }
  },
  'footer-minimal-2': {
    id: 'footer-minimal-2',
    name: 'Minimal Ligne',
    category: 'minimal',
    description: 'Footer une ligne',
    styles: {
      section: 'py-6 px-6 border-t',
      container: 'max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4',
      logo: 'h-5',
      links: 'flex gap-4 text-xs opacity-50',
      socials: 'flex gap-3',
      socialLink: 'w-8 h-8 flex items-center justify-center transition-opacity duration-200 hover:opacity-80',
      copyright: 'text-xs opacity-40',
    }
  },
  'footer-minimal-3': {
    id: 'footer-minimal-3',
    name: 'Minimal Copyright Only',
    category: 'minimal',
    description: 'Juste le copyright',
    styles: {
      section: 'py-6 px-6',
      container: 'max-w-4xl mx-auto text-center',
      logo: 'hidden',
      links: 'hidden',
      socials: 'flex justify-center gap-4 mb-4',
      socialLink: 'w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200',
      copyright: 'text-xs opacity-50',
    }
  },
  'footer-modern-1': {
    id: 'footer-modern-1',
    name: 'Modern Columns',
    category: 'modern',
    description: 'Footer en colonnes',
    styles: {
      section: 'py-16 px-6 border-t',
      container: 'max-w-6xl mx-auto',
      logo: 'h-8 mb-6',
      links: 'grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-10',
      socials: 'flex gap-4 mb-6',
      socialLink: 'w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-105',
      copyright: 'text-xs opacity-50 pt-6 border-t',
    }
  },
  'footer-modern-2': {
    id: 'footer-modern-2',
    name: 'Modern Split',
    category: 'modern',
    description: 'Footer divisé',
    styles: {
      section: 'py-12 px-6 border-t',
      container: 'max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8',
      logo: 'h-7',
      links: 'flex flex-wrap gap-6 text-sm font-medium',
      socials: 'flex gap-4',
      socialLink: 'w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200',
      copyright: 'text-xs opacity-50 mt-8',
    }
  },
  'footer-modern-3': {
    id: 'footer-modern-3',
    name: 'Modern Compact',
    category: 'modern',
    description: 'Footer moderne compact',
    styles: {
      section: 'py-8 px-6 border-t',
      container: 'max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4',
      logo: 'h-6',
      links: 'flex gap-6 text-xs font-medium',
      socials: 'flex gap-3',
      socialLink: 'w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200',
      copyright: 'text-xs opacity-50',
    }
  },
  'footer-bold-1': {
    id: 'footer-bold-1',
    name: 'Bold Large',
    category: 'bold',
    description: 'Footer large audacieux',
    styles: {
      section: 'py-20 px-6 border-t-4',
      container: 'max-w-6xl mx-auto',
      logo: 'h-12 mb-10',
      links: 'grid grid-cols-2 md:grid-cols-4 gap-10 text-sm font-bold uppercase tracking-wide mb-12',
      socials: 'flex gap-5 mb-8',
      socialLink: 'w-12 h-12 flex items-center justify-center border-2 transition-all duration-200 hover:scale-110',
      copyright: 'text-sm font-medium pt-8 border-t-4 uppercase tracking-wider',
    }
  },
  'footer-bold-2': {
    id: 'footer-bold-2',
    name: 'Bold Centré',
    category: 'bold',
    description: 'Footer centré audacieux',
    styles: {
      section: 'py-16 px-6 border-t-4',
      container: 'max-w-4xl mx-auto text-center',
      logo: 'h-10 mx-auto mb-8',
      links: 'flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-wide mb-10',
      socials: 'flex justify-center gap-5 mb-8',
      socialLink: 'w-12 h-12 flex items-center justify-center border-2 transition-all duration-200 hover:scale-110',
      copyright: 'text-sm font-medium uppercase',
    }
  },
  'footer-bold-3': {
    id: 'footer-bold-3',
    name: 'Bold Full Width',
    category: 'bold',
    description: 'Footer pleine largeur',
    styles: {
      section: 'py-12 px-8 border-t-4',
      container: 'flex flex-col md:flex-row items-center justify-between gap-6',
      logo: 'h-10',
      links: 'flex gap-10 text-base font-black uppercase tracking-widest',
      socials: 'flex gap-4',
      socialLink: 'w-11 h-11 flex items-center justify-center border-2 transition-all duration-200',
      copyright: 'text-sm font-bold uppercase',
    }
  },

  // ===== PREMIUM FOOTER =====
  'footer-premium-elegant': {
    id: 'footer-premium-elegant',
    name: 'Premium Élégant',
    category: 'minimal',
    description: 'Footer élégant et raffiné',
    styles: {
      section: 'py-16 md:py-24 px-6 border-t',
      container: 'max-w-4xl mx-auto text-center',
      logo: 'h-8 mx-auto mb-8',
      links: 'flex flex-wrap justify-center gap-8 text-sm tracking-wide mb-10',
      socials: 'flex justify-center gap-5 mb-10',
      socialLink: 'w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110',
      copyright: 'text-xs tracking-widest uppercase opacity-40',
    }
  },
  'footer-premium-gradient': {
    id: 'footer-premium-gradient',
    name: 'Premium Gradient',
    category: 'modern',
    description: 'Footer avec effet gradient subtil',
    styles: {
      section: 'py-16 md:py-20 px-6 border-t bg-gradient-to-b from-transparent to-current/5',
      container: 'max-w-5xl mx-auto text-center',
      logo: 'h-8 mx-auto mb-8',
      links: 'flex flex-wrap justify-center gap-8 text-sm font-medium mb-10',
      socials: 'flex justify-center gap-4 mb-10',
      socialLink: 'w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105',
      copyright: 'text-sm opacity-50',
    }
  },
  'footer-premium-split': {
    id: 'footer-premium-split',
    name: 'Premium Split',
    category: 'modern',
    description: 'Footer divisé premium',
    styles: {
      section: 'py-14 md:py-20 px-6 border-t',
      container: 'max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center',
      logo: 'h-8',
      links: 'flex flex-wrap gap-6 text-sm font-medium',
      socials: 'flex gap-4',
      socialLink: 'w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105',
      copyright: 'text-xs opacity-50 md:text-right',
    }
  },
  'footer-premium-luxe': {
    id: 'footer-premium-luxe',
    name: 'Premium Luxe',
    category: 'bold',
    description: 'Footer luxueux avec détails dorés',
    styles: {
      section: 'py-20 md:py-28 px-6 border-t',
      container: 'max-w-5xl mx-auto text-center',
      logo: 'h-10 mx-auto mb-12',
      links: 'flex flex-wrap justify-center gap-10 text-sm font-medium tracking-widest uppercase mb-14',
      socials: 'flex justify-center gap-6 mb-12',
      socialLink: 'w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 hover:scale-110',
      copyright: 'text-sm tracking-[0.2em] uppercase opacity-40',
    }
  },
  'footer-premium-minimal': {
    id: 'footer-premium-minimal',
    name: 'Premium Ultra Minimal',
    category: 'minimal',
    description: 'Minimalisme extrême',
    styles: {
      section: 'py-10 md:py-14 px-6 border-t',
      container: 'max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6',
      logo: 'h-5',
      links: 'flex gap-6 text-xs tracking-wide opacity-60',
      socials: 'flex gap-3',
      socialLink: 'w-8 h-8 flex items-center justify-center transition-opacity duration-200 hover:opacity-70',
      copyright: 'text-xs opacity-40',
    }
  },
}

// ========== COUNTDOWN TEMPLATES ==========
export const countdownTemplates: BlockTemplateGroup = {
  'countdown-minimal-1': {
    id: 'countdown-minimal-1',
    name: 'Minimal Centré',
    category: 'minimal',
    description: 'Countdown centré épuré',
    styles: {
      section: 'py-10 md:py-14 px-6',
      container: 'max-w-2xl mx-auto text-center',
      title: 'text-lg font-light mb-6 opacity-80',
      timer: 'flex justify-center gap-6',
      digit: 'text-4xl md:text-5xl font-light tracking-tight',
      label: 'text-xs uppercase tracking-wider opacity-50 mt-2',
      separator: 'text-3xl opacity-30',
    }
  },
  'countdown-minimal-2': {
    id: 'countdown-minimal-2',
    name: 'Minimal Ligne',
    category: 'minimal',
    description: 'Countdown en ligne',
    styles: {
      section: 'py-6 md:py-8 px-6 border-t border-b',
      container: 'max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8',
      title: 'text-sm font-light opacity-70',
      timer: 'flex gap-4',
      digit: 'text-2xl font-light',
      label: 'text-xs uppercase opacity-40 ml-1',
      separator: 'text-xl opacity-20',
    }
  },
  'countdown-minimal-3': {
    id: 'countdown-minimal-3',
    name: 'Minimal Compact',
    category: 'minimal',
    description: 'Countdown très compact',
    styles: {
      section: 'py-4 px-6',
      container: 'max-w-xl mx-auto flex items-center justify-center gap-4',
      title: 'text-xs font-light opacity-60',
      timer: 'flex gap-2',
      digit: 'text-lg font-normal',
      label: 'text-[10px] uppercase opacity-40',
      separator: 'text-base opacity-20',
    }
  },
  'countdown-modern-1': {
    id: 'countdown-modern-1',
    name: 'Modern Cards',
    category: 'modern',
    description: 'Countdown en cartes',
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-3xl mx-auto text-center',
      title: 'text-xl md:text-2xl font-semibold mb-10',
      timer: 'flex justify-center gap-4',
      digit: 'text-4xl md:text-5xl font-bold border w-20 md:w-24 py-4',
      label: 'text-xs uppercase tracking-wide opacity-60 mt-3',
      separator: 'text-3xl opacity-30 self-center',
    }
  },
  'countdown-modern-2': {
    id: 'countdown-modern-2',
    name: 'Modern Accent',
    category: 'modern',
    description: 'Countdown avec accent',
    styles: {
      section: 'py-12 md:py-16 px-6 border-l-4',
      container: 'max-w-3xl mx-auto',
      title: 'text-lg font-semibold mb-8',
      timer: 'flex gap-8',
      digit: 'text-5xl md:text-6xl font-bold',
      label: 'text-xs uppercase tracking-wider opacity-70 mt-2',
      separator: 'hidden',
    }
  },
  'countdown-modern-3': {
    id: 'countdown-modern-3',
    name: 'Modern Split',
    category: 'modern',
    description: 'Countdown divisé',
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center',
      title: 'text-2xl md:text-3xl font-semibold',
      timer: 'flex gap-6',
      digit: 'text-4xl md:text-5xl font-bold',
      label: 'text-xs uppercase tracking-wide opacity-60 mt-2',
      separator: 'text-3xl opacity-30',
    }
  },
  'countdown-bold-1': {
    id: 'countdown-bold-1',
    name: 'Bold Impact',
    category: 'bold',
    description: 'Countdown à fort impact',
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-4xl mx-auto text-center',
      title: 'text-2xl md:text-3xl font-black mb-12 uppercase tracking-wide',
      timer: 'flex justify-center gap-6 md:gap-10',
      digit: 'text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter',
      label: 'text-sm uppercase tracking-widest font-bold mt-4',
      separator: 'text-5xl opacity-40 self-start',
    }
  },
  'countdown-bold-2': {
    id: 'countdown-bold-2',
    name: 'Bold Boxed',
    category: 'bold',
    description: 'Countdown en boîtes',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-4xl mx-auto text-center',
      title: 'text-2xl md:text-3xl font-black mb-10 uppercase',
      timer: 'flex justify-center gap-4',
      digit: 'text-5xl md:text-6xl font-black border-4 w-24 md:w-32 py-6',
      label: 'text-xs uppercase tracking-widest font-bold mt-4',
      separator: 'hidden',
    }
  },
  'countdown-bold-3': {
    id: 'countdown-bold-3',
    name: 'Bold Full Width',
    category: 'bold',
    description: 'Countdown pleine largeur',
    styles: {
      section: 'py-16 md:py-24 px-6 border-t-4 border-b-4',
      container: 'max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8',
      title: 'text-xl md:text-2xl font-black uppercase tracking-wider',
      timer: 'flex gap-8',
      digit: 'text-5xl md:text-6xl font-black',
      label: 'text-sm uppercase tracking-widest font-bold mt-2',
      separator: 'text-4xl opacity-40',
    }
  },

  // ===== PREMIUM COUNTDOWN =====
  'countdown-premium-elegant': {
    id: 'countdown-premium-elegant',
    name: 'Premium Élégant',
    category: 'minimal',
    description: 'Countdown élégant et raffiné',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-3xl mx-auto text-center',
      title: 'text-xl md:text-2xl font-light tracking-wide mb-10',
      timer: 'flex justify-center gap-10 md:gap-16',
      digit: 'text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tighter',
      label: 'text-xs uppercase tracking-[0.3em] opacity-50 mt-4',
      separator: 'hidden',
    }
  },
  'countdown-premium-neon': {
    id: 'countdown-premium-neon',
    name: 'Premium Néon',
    category: 'bold',
    description: 'Effet néon moderne',
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-4xl mx-auto text-center',
      title: 'text-2xl md:text-3xl font-bold tracking-tight mb-12',
      timer: 'flex justify-center gap-6',
      digit: 'text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter px-6 py-4 border-2 rounded-xl',
      label: 'text-xs uppercase tracking-widest font-semibold mt-4',
      separator: 'text-4xl opacity-30 self-center',
    }
  },
  'countdown-premium-flip': {
    id: 'countdown-premium-flip',
    name: 'Premium Flip Clock',
    category: 'modern',
    description: 'Style horloge à volets',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-4xl mx-auto text-center',
      title: 'text-lg md:text-xl font-medium tracking-wide mb-10 uppercase',
      timer: 'flex justify-center gap-4',
      digit: 'text-4xl md:text-5xl lg:text-6xl font-bold w-20 md:w-28 py-6 rounded-lg',
      label: 'text-xs uppercase tracking-wide opacity-60 mt-3',
      separator: 'text-3xl opacity-20 self-center mx-2',
    }
  },
  'countdown-premium-minimal': {
    id: 'countdown-premium-minimal',
    name: 'Premium Ultra Minimal',
    category: 'minimal',
    description: 'Minimalisme extrême',
    styles: {
      section: 'py-10 md:py-16 px-6 border-y',
      container: 'max-w-3xl mx-auto flex items-center justify-center gap-6',
      title: 'text-sm font-light tracking-wider opacity-60',
      timer: 'flex items-baseline gap-4',
      digit: 'text-3xl md:text-4xl font-light',
      label: 'text-[10px] uppercase tracking-wider opacity-40 ml-0.5',
      separator: 'text-2xl opacity-20',
    }
  },
}

export default { headerTemplates, footerTemplates, countdownTemplates }
