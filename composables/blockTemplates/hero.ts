import type { BlockTemplateGroup } from './types'

// Types étendus pour Hero
export type HeroLayout = 'centered' | 'split-right' | 'split-left' | 'fullscreen' | 'slider' | 'stacked' | 'video'
export type ContentPosition = 'top' | 'center' | 'bottom'
export type TextAlign = 'left' | 'center' | 'right'

export interface HeroTemplateConfig {
  layout: HeroLayout
  contentPosition: ContentPosition
  textAlign: TextAlign
  showBadge: boolean
  showSecondaryButton: boolean
  imageRatio: string // e.g., '16/9', '4/3', '1/1'
  overlayEnabled: boolean
}

export const heroTemplates: BlockTemplateGroup = {
  // ===== CENTERED (Texte centré) =====
  'hero-centered-clean': {
    id: 'hero-centered-clean',
    name: 'Centré Épuré',
    category: 'minimal',
    description: 'Texte centré sur fond uni, design minimaliste',
    config: { layout: 'centered', contentPosition: 'center', textAlign: 'center', showBadge: false, showSecondaryButton: false, imageRatio: '', overlayEnabled: false },
    styles: {
      section: 'py-20 md:py-32 lg:py-40 px-6',
      container: 'max-w-4xl mx-auto text-center',
      badge: 'inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-wider mb-6',
      title: 'text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight',
      subtitle: 'text-lg md:text-xl font-normal mt-6 opacity-70 max-w-2xl mx-auto leading-relaxed',
      buttonGroup: 'mt-10 flex flex-col sm:flex-row gap-4 justify-center',
      button: 'px-8 py-4 text-sm font-medium uppercase tracking-widest transition-all duration-200',
      buttonSecondary: 'px-8 py-4 text-sm font-medium uppercase tracking-widest border-2 transition-all duration-200',
    }
  },
  'hero-centered-bold': {
    id: 'hero-centered-bold',
    name: 'Centré Impact',
    category: 'bold',
    description: 'Grand titre centré avec fort impact visuel',
    config: { layout: 'centered', contentPosition: 'center', textAlign: 'center', showBadge: true, showSecondaryButton: true, imageRatio: '', overlayEnabled: false },
    styles: {
      section: 'py-24 md:py-36 lg:py-48 px-6',
      container: 'max-w-5xl mx-auto text-center',
      badge: 'inline-block px-5 py-2 text-xs font-bold uppercase tracking-widest mb-8 border-2',
      title: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none',
      subtitle: 'text-xl md:text-2xl font-medium mt-8 max-w-3xl mx-auto leading-relaxed',
      buttonGroup: 'mt-12 flex flex-col sm:flex-row gap-4 justify-center',
      button: 'px-10 py-5 text-base font-bold uppercase tracking-widest transition-all duration-200',
      buttonSecondary: 'px-10 py-5 text-base font-bold uppercase tracking-widest border-2 transition-all duration-200',
    }
  },
  'hero-centered-elegant': {
    id: 'hero-centered-elegant',
    name: 'Centré Élégant',
    category: 'modern',
    description: 'Design élégant avec typographie raffinée',
    config: { layout: 'centered', contentPosition: 'center', textAlign: 'center', showBadge: true, showSecondaryButton: false, imageRatio: '', overlayEnabled: false },
    styles: {
      section: 'py-20 md:py-28 lg:py-36 px-6',
      container: 'max-w-3xl mx-auto text-center',
      badge: 'inline-block px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border',
      title: 'text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-normal leading-snug',
      subtitle: 'text-base md:text-lg font-light mt-6 opacity-80 max-w-xl mx-auto leading-relaxed italic',
      buttonGroup: 'mt-10 flex justify-center',
      button: 'px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200',
      buttonSecondary: 'px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] border transition-all duration-200',
    }
  },

  // ===== SPLIT RIGHT (Image à droite, texte à gauche) =====
  'hero-split-right-modern': {
    id: 'hero-split-right-modern',
    name: 'Split Droite Moderne',
    category: 'modern',
    description: 'Texte à gauche, image à droite - style moderne',
    config: { layout: 'split-right', contentPosition: 'center', textAlign: 'left', showBadge: true, showSecondaryButton: true, imageRatio: '4/3', overlayEnabled: false },
    styles: {
      section: 'py-12 md:py-0 px-6 md:px-0',
      container: 'max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-0 items-center',
      content: 'md:px-12 lg:px-16 xl:px-20',
      badge: 'inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4',
      title: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
      subtitle: 'text-base md:text-lg font-normal mt-4 opacity-75 max-w-lg leading-relaxed',
      buttonGroup: 'mt-8 flex flex-col sm:flex-row gap-3',
      button: 'px-6 py-3 text-sm font-semibold transition-all duration-200',
      buttonSecondary: 'px-6 py-3 text-sm font-semibold border-2 transition-all duration-200',
      imageWrapper: 'relative aspect-[4/3] md:aspect-auto md:h-[600px] lg:h-[700px]',
      image: 'w-full h-full object-cover',
    }
  },
  'hero-split-right-minimal': {
    id: 'hero-split-right-minimal',
    name: 'Split Droite Minimal',
    category: 'minimal',
    description: 'Layout split épuré avec image à droite',
    config: { layout: 'split-right', contentPosition: 'center', textAlign: 'left', showBadge: false, showSecondaryButton: false, imageRatio: '1/1', overlayEnabled: false },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center',
      content: '',
      badge: 'hidden',
      title: 'text-3xl md:text-4xl font-light tracking-tight leading-tight',
      subtitle: 'text-base font-normal mt-5 opacity-60 leading-relaxed',
      buttonGroup: 'mt-8',
      button: 'px-6 py-3 text-sm font-medium tracking-wide border-2 transition-all duration-200',
      buttonSecondary: '',
      imageWrapper: 'relative aspect-square',
      image: 'w-full h-full object-cover',
    }
  },
  'hero-split-right-bold': {
    id: 'hero-split-right-bold',
    name: 'Split Droite Bold',
    category: 'bold',
    description: 'Layout split audacieux avec grande image',
    config: { layout: 'split-right', contentPosition: 'center', textAlign: 'left', showBadge: true, showSecondaryButton: true, imageRatio: '3/4', overlayEnabled: false },
    styles: {
      section: 'py-0',
      container: 'grid lg:grid-cols-2 min-h-screen',
      content: 'flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-0',
      badge: 'inline-block self-start px-4 py-2 text-xs font-black uppercase tracking-widest mb-6 border-4',
      title: 'text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none',
      subtitle: 'text-lg md:text-xl font-medium mt-6 opacity-90 max-w-lg leading-relaxed',
      buttonGroup: 'mt-10 flex flex-col sm:flex-row gap-4',
      button: 'px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-200',
      buttonSecondary: 'px-8 py-4 text-sm font-bold uppercase tracking-widest border-4 transition-all duration-200',
      imageWrapper: 'relative min-h-[400px] lg:min-h-0',
      image: 'w-full h-full object-cover',
    }
  },

  // ===== SPLIT LEFT (Image à gauche, texte à droite) =====
  'hero-split-left-modern': {
    id: 'hero-split-left-modern',
    name: 'Split Gauche Moderne',
    category: 'modern',
    description: 'Image à gauche, texte à droite - style moderne',
    config: { layout: 'split-left', contentPosition: 'center', textAlign: 'left', showBadge: true, showSecondaryButton: true, imageRatio: '4/3', overlayEnabled: false },
    styles: {
      section: 'py-12 md:py-0 px-6 md:px-0',
      container: 'max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-0 items-center',
      content: 'md:px-12 lg:px-16 xl:px-20 order-2 md:order-2',
      badge: 'inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4',
      title: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
      subtitle: 'text-base md:text-lg font-normal mt-4 opacity-75 max-w-lg leading-relaxed',
      buttonGroup: 'mt-8 flex flex-col sm:flex-row gap-3',
      button: 'px-6 py-3 text-sm font-semibold transition-all duration-200',
      buttonSecondary: 'px-6 py-3 text-sm font-semibold border-2 transition-all duration-200',
      imageWrapper: 'relative aspect-[4/3] md:aspect-auto md:h-[600px] lg:h-[700px] order-1 md:order-1',
      image: 'w-full h-full object-cover',
    }
  },
  'hero-split-left-elegant': {
    id: 'hero-split-left-elegant',
    name: 'Split Gauche Élégant',
    category: 'minimal',
    description: 'Design élégant avec image à gauche',
    config: { layout: 'split-left', contentPosition: 'center', textAlign: 'left', showBadge: false, showSecondaryButton: false, imageRatio: '3/4', overlayEnabled: false },
    styles: {
      section: 'py-16 md:py-0',
      container: 'max-w-7xl mx-auto grid md:grid-cols-5 gap-8 items-center',
      content: 'md:col-span-2 px-6 md:px-8 lg:px-12 order-2',
      badge: 'hidden',
      title: 'text-2xl md:text-3xl lg:text-4xl font-serif font-normal tracking-normal leading-snug',
      subtitle: 'text-sm md:text-base font-light mt-4 opacity-70 leading-relaxed',
      buttonGroup: 'mt-6',
      button: 'px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200',
      buttonSecondary: '',
      imageWrapper: 'relative md:col-span-3 aspect-[3/4] md:aspect-auto md:h-[500px] lg:h-[600px] order-1',
      image: 'w-full h-full object-cover',
    }
  },

  // ===== FULLSCREEN (Plein écran avec overlay) =====
  'hero-fullscreen-centered': {
    id: 'hero-fullscreen-centered',
    name: 'Plein Écran Centré',
    category: 'bold',
    description: 'Image plein écran avec texte centré et overlay',
    config: { layout: 'fullscreen', contentPosition: 'center', textAlign: 'center', showBadge: true, showSecondaryButton: true, imageRatio: '', overlayEnabled: true },
    styles: {
      section: 'relative min-h-screen flex items-center justify-center px-6',
      overlay: 'absolute inset-0 bg-black',
      container: 'relative z-10 max-w-4xl mx-auto text-center',
      badge: 'inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6 border-2 border-white/30 text-white',
      title: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none text-white',
      subtitle: 'text-lg md:text-xl font-normal mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed',
      buttonGroup: 'mt-10 flex flex-col sm:flex-row gap-4 justify-center',
      button: 'px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-200',
      buttonSecondary: 'px-8 py-4 text-sm font-semibold uppercase tracking-wider border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-black',
      imageWrapper: 'absolute inset-0',
      image: 'w-full h-full object-cover',
    }
  },
  'hero-fullscreen-bottom': {
    id: 'hero-fullscreen-bottom',
    name: 'Plein Écran Bas',
    category: 'modern',
    description: 'Plein écran avec contenu en bas',
    config: { layout: 'fullscreen', contentPosition: 'bottom', textAlign: 'left', showBadge: true, showSecondaryButton: true, imageRatio: '', overlayEnabled: true },
    styles: {
      section: 'relative min-h-screen flex items-end px-6 pb-16 md:pb-24',
      overlay: 'absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent',
      container: 'relative z-10 max-w-4xl',
      badge: 'inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4 bg-white/20 text-white',
      title: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white',
      subtitle: 'text-base md:text-lg font-normal mt-4 text-white/80 max-w-xl leading-relaxed',
      buttonGroup: 'mt-6 flex flex-col sm:flex-row gap-3',
      button: 'px-6 py-3 text-sm font-semibold transition-all duration-200',
      buttonSecondary: 'px-6 py-3 text-sm font-semibold border-2 border-white text-white transition-all duration-200',
      imageWrapper: 'absolute inset-0',
      image: 'w-full h-full object-cover',
    }
  },
  'hero-fullscreen-minimal': {
    id: 'hero-fullscreen-minimal',
    name: 'Plein Écran Minimal',
    category: 'minimal',
    description: 'Plein écran épuré avec overlay subtil',
    config: { layout: 'fullscreen', contentPosition: 'center', textAlign: 'center', showBadge: false, showSecondaryButton: false, imageRatio: '', overlayEnabled: true },
    styles: {
      section: 'relative min-h-[80vh] flex items-center justify-center px-6',
      overlay: 'absolute inset-0 bg-black/30',
      container: 'relative z-10 max-w-3xl mx-auto text-center',
      badge: 'hidden',
      title: 'text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-white',
      subtitle: 'text-base md:text-lg font-normal mt-6 text-white/70 max-w-xl mx-auto leading-relaxed',
      buttonGroup: 'mt-8',
      button: 'px-8 py-4 text-xs font-semibold uppercase tracking-widest border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-black',
      buttonSecondary: '',
      imageWrapper: 'absolute inset-0',
      image: 'w-full h-full object-cover',
    }
  },

  // ===== SLIDER (Carrousel) =====
  'hero-slider-fullscreen': {
    id: 'hero-slider-fullscreen',
    name: 'Slider Plein Écran',
    category: 'bold',
    description: 'Carrousel plein écran avec navigation',
    config: { layout: 'slider', contentPosition: 'center', textAlign: 'center', showBadge: true, showSecondaryButton: true, imageRatio: '', overlayEnabled: true },
    styles: {
      section: 'relative min-h-screen',
      overlay: 'absolute inset-0 bg-black/40',
      container: 'relative z-10 h-full flex items-center justify-center px-6',
      content: 'max-w-4xl mx-auto text-center',
      badge: 'inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6 bg-white text-black',
      title: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-white',
      subtitle: 'text-lg md:text-xl font-normal mt-6 text-white/80 max-w-2xl mx-auto',
      buttonGroup: 'mt-10 flex flex-col sm:flex-row gap-4 justify-center',
      button: 'px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-200',
      buttonSecondary: 'px-8 py-4 text-sm font-semibold uppercase tracking-wider border-2 border-white text-white transition-all duration-200',
      navigation: 'absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2',
      navDot: 'w-2 h-2 rounded-full bg-white/50 transition-all duration-200',
      navDotActive: 'w-8 bg-white',
      navArrow: 'absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors',
      navArrowLeft: 'left-4 md:left-8',
      navArrowRight: 'right-4 md:right-8',
    }
  },
  'hero-slider-compact': {
    id: 'hero-slider-compact',
    name: 'Slider Compact',
    category: 'modern',
    description: 'Carrousel compact avec contenu à gauche',
    config: { layout: 'slider', contentPosition: 'center', textAlign: 'left', showBadge: true, showSecondaryButton: false, imageRatio: '16/9', overlayEnabled: true },
    styles: {
      section: 'relative py-16 md:py-0 md:min-h-[600px]',
      overlay: 'absolute inset-0 bg-gradient-to-r from-black/70 to-transparent',
      container: 'relative z-10 h-full flex items-center px-6 md:px-12',
      content: 'max-w-xl',
      badge: 'inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4 bg-white/20 text-white',
      title: 'text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-white',
      subtitle: 'text-sm md:text-base font-normal mt-4 text-white/70 max-w-md',
      buttonGroup: 'mt-6',
      button: 'px-6 py-3 text-sm font-semibold transition-all duration-200',
      buttonSecondary: '',
      navigation: 'absolute bottom-6 right-6 z-20 flex gap-2',
      navDot: 'w-2 h-2 rounded-full bg-white/40 transition-all duration-200',
      navDotActive: 'bg-white',
      navArrow: 'hidden',
      navArrowLeft: '',
      navArrowRight: '',
    }
  },

  // ===== STACKED (Image au-dessus du texte) =====
  'hero-stacked-classic': {
    id: 'hero-stacked-classic',
    name: 'Empilé Classique',
    category: 'modern',
    description: 'Image en haut, contenu en bas',
    config: { layout: 'stacked', contentPosition: 'center', textAlign: 'center', showBadge: true, showSecondaryButton: true, imageRatio: '21/9', overlayEnabled: false },
    styles: {
      section: '',
      container: '',
      imageWrapper: 'relative aspect-[21/9] max-h-[500px]',
      image: 'w-full h-full object-cover',
      content: 'max-w-3xl mx-auto px-6 py-12 md:py-16 text-center',
      badge: 'inline-block px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-4',
      title: 'text-3xl md:text-4xl font-bold tracking-tight leading-tight',
      subtitle: 'text-base md:text-lg font-normal mt-4 opacity-70 max-w-xl mx-auto',
      buttonGroup: 'mt-8 flex flex-col sm:flex-row gap-3 justify-center',
      button: 'px-6 py-3 text-sm font-semibold transition-all duration-200',
      buttonSecondary: 'px-6 py-3 text-sm font-semibold border-2 transition-all duration-200',
    }
  },
  'hero-stacked-overlap': {
    id: 'hero-stacked-overlap',
    name: 'Empilé Superposé',
    category: 'bold',
    description: 'Contenu qui chevauche l\'image',
    config: { layout: 'stacked', contentPosition: 'center', textAlign: 'center', showBadge: true, showSecondaryButton: true, imageRatio: '16/9', overlayEnabled: false },
    styles: {
      section: 'pb-16 md:pb-24',
      container: '',
      imageWrapper: 'relative aspect-[16/9] max-h-[600px]',
      image: 'w-full h-full object-cover',
      content: 'relative max-w-3xl mx-auto px-6 -mt-20 md:-mt-32 bg-white py-10 md:py-14',
      badge: 'inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest mb-4 border-2',
      title: 'text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none',
      subtitle: 'text-base md:text-lg font-normal mt-4 opacity-75 max-w-xl mx-auto',
      buttonGroup: 'mt-8 flex flex-col sm:flex-row gap-4 justify-center',
      button: 'px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200',
      buttonSecondary: 'px-8 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-all duration-200',
    }
  },

  // ===== VIDEO BACKGROUND =====
  'hero-video-centered': {
    id: 'hero-video-centered',
    name: 'Vidéo Fond Centré',
    category: 'bold',
    description: 'Vidéo en fond avec texte centré',
    config: { layout: 'video', contentPosition: 'center', textAlign: 'center', showBadge: true, showSecondaryButton: true, imageRatio: '', overlayEnabled: true },
    styles: {
      section: 'relative min-h-screen flex items-center justify-center px-6',
      overlay: 'absolute inset-0 bg-black/50',
      container: 'relative z-10 max-w-4xl mx-auto text-center',
      badge: 'inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6 bg-white text-black',
      title: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none text-white',
      subtitle: 'text-lg md:text-xl font-normal mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed',
      buttonGroup: 'mt-10 flex flex-col sm:flex-row gap-4 justify-center',
      button: 'px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-200',
      buttonSecondary: 'px-8 py-4 text-sm font-semibold uppercase tracking-wider border-2 border-white text-white transition-all duration-200',
      videoWrapper: 'absolute inset-0 overflow-hidden',
      video: 'w-full h-full object-cover',
    }
  },
}

export default heroTemplates
