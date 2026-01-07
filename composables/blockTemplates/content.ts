import type { BlockTemplateGroup } from './types'

// Types pour les configs
export type TextLayout = 'centered' | 'left' | 'right' | 'columns-2' | 'columns-3' | 'quote' | 'highlight' | 'card'
export type ImageLayout = 'centered' | 'full-width' | 'split-left' | 'split-right' | 'grid-2' | 'gallery' | 'parallax' | 'card'
export type VideoLayout = 'centered' | 'full-width' | 'split-left' | 'split-right' | 'modal' | 'background'

// ========== TEXT TEMPLATES ==========
export const textTemplates: BlockTemplateGroup = {
  // === MINIMAL ===
  'text-minimal-centered': {
    id: 'text-minimal-centered',
    name: 'Minimal Centré',
    category: 'minimal',
    description: 'Texte centré épuré',
    config: { layout: 'centered' },
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-2xl mx-auto text-center',
      text: 'text-base md:text-lg font-light leading-relaxed opacity-80',
    }
  },
  'text-minimal-left': {
    id: 'text-minimal-left',
    name: 'Minimal Gauche',
    category: 'minimal',
    description: 'Texte aligné à gauche',
    config: { layout: 'left' },
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-2xl mx-auto',
      text: 'text-base font-light leading-relaxed opacity-80',
    }
  },
  'text-minimal-columns': {
    id: 'text-minimal-columns',
    name: 'Minimal Colonnes',
    category: 'minimal',
    description: 'Texte en deux colonnes',
    config: { layout: 'columns-2' },
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-4xl mx-auto columns-1 md:columns-2 gap-10',
      text: 'text-sm leading-relaxed opacity-70',
    }
  },
  
  // === MODERN ===
  'text-modern-highlight': {
    id: 'text-modern-highlight',
    name: 'Modern Surligné',
    category: 'modern',
    description: 'Texte avec bordure accent',
    config: { layout: 'highlight' },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-3xl mx-auto border-l-4 pl-8',
      text: 'text-lg md:text-xl leading-relaxed',
    }
  },
  'text-modern-card': {
    id: 'text-modern-card',
    name: 'Modern Carte',
    category: 'modern',
    description: 'Texte dans une carte élégante',
    config: { layout: 'card' },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-2xl mx-auto border p-10',
      text: 'text-base leading-relaxed opacity-80',
    }
  },
  'text-modern-dropcap': {
    id: 'text-modern-dropcap',
    name: 'Modern Lettrine',
    category: 'modern',
    description: 'Grande première lettre décorative',
    config: { layout: 'left' },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-3xl mx-auto',
      text: 'text-base leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:leading-none',
    }
  },
  'text-modern-quote': {
    id: 'text-modern-quote',
    name: 'Modern Citation',
    category: 'modern',
    description: 'Style citation élégante',
    config: { layout: 'quote' },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-3xl mx-auto text-center',
      text: 'text-xl md:text-2xl font-light leading-relaxed italic before:content-["«"] before:text-4xl before:block before:mb-4 before:opacity-30 after:content-["»"] after:text-4xl after:block after:mt-4 after:opacity-30',
    }
  },
  'text-modern-columns-3': {
    id: 'text-modern-columns-3',
    name: 'Modern 3 Colonnes',
    category: 'modern',
    description: 'Texte en trois colonnes',
    config: { layout: 'columns-3' },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-6xl mx-auto columns-1 md:columns-3 gap-8',
      text: 'text-sm leading-relaxed opacity-75',
    }
  },
  
  // === BOLD ===
  'text-bold-statement': {
    id: 'text-bold-statement',
    name: 'Bold Statement',
    category: 'bold',
    description: 'Déclaration audacieuse',
    config: { layout: 'centered' },
    styles: {
      section: 'py-20 md:py-28 px-6',
      container: 'max-w-4xl mx-auto text-center',
      text: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-tight',
    }
  },
  'text-bold-boxed': {
    id: 'text-bold-boxed',
    name: 'Bold Encadré',
    category: 'bold',
    description: 'Texte en boîte épaisse',
    config: { layout: 'card' },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-3xl mx-auto border-4 p-12',
      text: 'text-xl md:text-2xl font-bold leading-tight',
    }
  },
  'text-bold-uppercase': {
    id: 'text-bold-uppercase',
    name: 'Bold Majuscules',
    category: 'bold',
    description: 'Texte en majuscules impactant',
    config: { layout: 'centered' },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto text-center',
      text: 'text-xl md:text-2xl font-black leading-relaxed uppercase tracking-wider',
    }
  },
  'text-bold-gradient-border': {
    id: 'text-bold-gradient-border',
    name: 'Bold Bordure Gradient',
    category: 'bold',
    description: 'Texte avec bordure gradient',
    config: { layout: 'highlight' },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-3xl mx-auto border-l-8 pl-10',
      text: 'text-xl md:text-2xl font-semibold leading-relaxed',
    }
  },
  
  // === PREMIUM ===
  'text-premium-magazine': {
    id: 'text-premium-magazine',
    name: 'Premium Magazine',
    category: 'modern',
    description: 'Style magazine premium',
    config: { layout: 'left' },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-3xl mx-auto',
      text: 'text-lg leading-loose font-serif first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:leading-none first-letter:font-sans',
    }
  },
  'text-premium-sidebar': {
    id: 'text-premium-sidebar',
    name: 'Premium Sidebar',
    category: 'modern',
    description: 'Texte avec barre latérale',
    config: { layout: 'highlight' },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-3xl mx-auto relative pl-12 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1',
      text: 'text-base md:text-lg leading-relaxed',
    }
  },
  'text-premium-elegant': {
    id: 'text-premium-elegant',
    name: 'Premium Élégant',
    category: 'minimal',
    description: 'Style élégant raffiné',
    config: { layout: 'centered' },
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-2xl mx-auto text-center',
      text: 'text-lg md:text-xl font-light leading-loose tracking-wide',
    }
  },
}

// ========== IMAGE TEMPLATES ==========
export const imageTemplates: BlockTemplateGroup = {
  // === MINIMAL ===
  'image-minimal-centered': {
    id: 'image-minimal-centered',
    name: 'Minimal Centré',
    category: 'minimal',
    description: 'Image centrée simple',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-10 md:py-14 px-6',
      container: 'max-w-3xl mx-auto',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-xs text-center opacity-50 mt-3',
    }
  },
  'image-minimal-fullwidth': {
    id: 'image-minimal-fullwidth',
    name: 'Minimal Pleine Largeur',
    category: 'minimal',
    description: 'Image pleine largeur',
    config: { layout: 'full-width', showCaption: true },
    styles: {
      section: 'py-0',
      container: 'w-full',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-64 md:h-96 object-cover',
      caption: 'text-xs text-center opacity-50 mt-3 px-6',
    }
  },
  'image-minimal-compact': {
    id: 'image-minimal-compact',
    name: 'Minimal Compact',
    category: 'minimal',
    description: 'Image compacte',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-6 md:py-8 px-6',
      container: 'max-w-xl mx-auto',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-xs opacity-50 mt-2',
    }
  },
  
  // === MODERN ===
  'image-modern-bordered': {
    id: 'image-modern-bordered',
    name: 'Modern Bordure',
    category: 'modern',
    description: 'Image avec bordure élégante',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-4xl mx-auto',
      imageWrapper: 'relative overflow-hidden border',
      image: 'w-full h-auto',
      caption: 'text-sm opacity-70 mt-4',
    }
  },
  'image-modern-offset': {
    id: 'image-modern-offset',
    name: 'Modern Décalé',
    category: 'modern',
    description: 'Image décalée créative',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-3xl mx-auto md:ml-20',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-sm font-medium mt-4',
    }
  },
  'image-modern-split': {
    id: 'image-modern-split',
    name: 'Modern Split',
    category: 'modern',
    description: 'Image avec légende à côté',
    config: { layout: 'split-right', showCaption: true },
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-5xl mx-auto grid md:grid-cols-4 gap-6 items-end',
      imageWrapper: 'md:col-span-3 relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-sm opacity-70 md:col-span-1',
    }
  },
  'image-modern-card': {
    id: 'image-modern-card',
    name: 'Modern Carte',
    category: 'modern',
    description: 'Image dans une carte',
    config: { layout: 'card', showCaption: true },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-3xl mx-auto border p-4',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-sm mt-4 px-2',
    }
  },
  'image-modern-rounded': {
    id: 'image-modern-rounded',
    name: 'Modern Arrondi',
    category: 'modern',
    description: 'Image avec coins arrondis',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-3xl mx-auto',
      imageWrapper: 'relative overflow-hidden rounded-2xl',
      image: 'w-full h-auto',
      caption: 'text-sm opacity-70 mt-4 text-center',
    }
  },
  
  // === BOLD ===
  'image-bold-hero': {
    id: 'image-bold-hero',
    name: 'Bold Héro',
    category: 'bold',
    description: 'Grande image héro impactante',
    config: { layout: 'full-width', showCaption: true },
    styles: {
      section: 'py-0',
      container: 'w-full',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-80 md:h-[500px] object-cover',
      caption: 'text-base font-bold mt-6 px-6 uppercase tracking-wide',
    }
  },
  'image-bold-framed': {
    id: 'image-bold-framed',
    name: 'Bold Encadré',
    category: 'bold',
    description: 'Image avec cadre épais',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-4xl mx-auto',
      imageWrapper: 'relative overflow-hidden border-8',
      image: 'w-full h-auto',
      caption: 'text-lg font-bold mt-6 uppercase tracking-wide',
    }
  },
  'image-bold-overlap': {
    id: 'image-bold-overlap',
    name: 'Bold Superposition',
    category: 'bold',
    description: 'Image avec texte superposé',
    config: { layout: 'centered', showCaption: true, captionOverlay: true },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto relative',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-xl font-black absolute bottom-0 left-0 p-6 uppercase tracking-wider',
    }
  },
  
  // === PREMIUM ===
  'image-premium-gallery': {
    id: 'image-premium-gallery',
    name: 'Premium Galerie',
    category: 'modern',
    description: 'Style galerie professionnelle',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-xs uppercase tracking-widest mt-6 opacity-60',
    }
  },
  'image-premium-magazine': {
    id: 'image-premium-magazine',
    name: 'Premium Magazine',
    category: 'modern',
    description: 'Style magazine haut de gamme',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-4xl mx-auto',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-sm font-serif italic mt-4 text-center',
    }
  },
  'image-premium-minimal': {
    id: 'image-premium-minimal',
    name: 'Premium Minimal',
    category: 'minimal',
    description: 'Style minimal premium',
    config: { layout: 'centered', showCaption: true },
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-4xl mx-auto',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-xs tracking-wider uppercase mt-8 opacity-40',
    }
  },
}

// ========== VIDEO TEMPLATES ==========
export const videoTemplates: BlockTemplateGroup = {
  // === MINIMAL ===
  'video-minimal-centered': {
    id: 'video-minimal-centered',
    name: 'Minimal Centré',
    category: 'minimal',
    description: 'Vidéo centrée simple',
    config: { layout: 'centered', showTitle: true },
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-3xl mx-auto',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-sm font-light mt-4 opacity-70 text-center',
    }
  },
  'video-minimal-fullwidth': {
    id: 'video-minimal-fullwidth',
    name: 'Minimal Pleine Largeur',
    category: 'minimal',
    description: 'Vidéo pleine largeur',
    config: { layout: 'full-width', showTitle: true },
    styles: {
      section: 'py-0',
      container: 'w-full',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-xs text-center opacity-50 mt-3 px-6',
    }
  },
  'video-minimal-compact': {
    id: 'video-minimal-compact',
    name: 'Minimal Compact',
    category: 'minimal',
    description: 'Vidéo compacte',
    config: { layout: 'centered', showTitle: true },
    styles: {
      section: 'py-8 md:py-10 px-6',
      container: 'max-w-xl mx-auto',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-xs opacity-50 mt-2',
    }
  },
  
  // === MODERN ===
  'video-modern-bordered': {
    id: 'video-modern-bordered',
    name: 'Modern Bordure',
    category: 'modern',
    description: 'Vidéo avec bordure élégante',
    config: { layout: 'centered', showTitle: true },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-4xl mx-auto',
      videoWrapper: 'relative overflow-hidden border',
      video: 'w-full aspect-video',
      title: 'text-lg font-semibold mt-6 text-center',
    }
  },
  'video-modern-split': {
    id: 'video-modern-split',
    name: 'Modern Split',
    category: 'modern',
    description: 'Vidéo avec titre à côté',
    config: { layout: 'split-right', showTitle: true },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-5xl mx-auto grid md:grid-cols-3 gap-8 items-center',
      videoWrapper: 'md:col-span-2 relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-2xl font-semibold',
    }
  },
  'video-modern-card': {
    id: 'video-modern-card',
    name: 'Modern Carte',
    category: 'modern',
    description: 'Vidéo dans une carte',
    config: { layout: 'card', showTitle: true },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-3xl mx-auto border p-6',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-base font-medium mt-4',
    }
  },
  'video-modern-rounded': {
    id: 'video-modern-rounded',
    name: 'Modern Arrondi',
    category: 'modern',
    description: 'Vidéo avec coins arrondis',
    config: { layout: 'centered', showTitle: true },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-4xl mx-auto',
      videoWrapper: 'relative overflow-hidden rounded-2xl',
      video: 'w-full aspect-video',
      title: 'text-sm mt-4 text-center opacity-70',
    }
  },
  'video-modern-caption': {
    id: 'video-modern-caption',
    name: 'Modern Légende',
    category: 'modern',
    description: 'Vidéo avec grande légende',
    config: { layout: 'centered', showTitle: true },
    styles: {
      section: 'py-14 md:py-20 px-6',
      container: 'max-w-4xl mx-auto',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-xl md:text-2xl font-light mt-8 text-center',
    }
  },
  
  // === BOLD ===
  'video-bold-hero': {
    id: 'video-bold-hero',
    name: 'Bold Héro',
    category: 'bold',
    description: 'Grande vidéo héro impactante',
    config: { layout: 'full-width', showTitle: true },
    styles: {
      section: 'py-0',
      container: 'w-full',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video md:aspect-[21/9]',
      title: 'text-2xl font-black mt-8 px-6 uppercase tracking-wide',
    }
  },
  'video-bold-framed': {
    id: 'video-bold-framed',
    name: 'Bold Encadré',
    category: 'bold',
    description: 'Vidéo avec cadre épais',
    config: { layout: 'centered', showTitle: true },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto',
      videoWrapper: 'relative overflow-hidden border-8',
      video: 'w-full aspect-video',
      title: 'text-xl font-bold mt-8 uppercase tracking-wide text-center',
    }
  },
  'video-bold-titled': {
    id: 'video-bold-titled',
    name: 'Bold Titré',
    category: 'bold',
    description: 'Vidéo avec grand titre',
    config: { layout: 'centered', showTitle: true },
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto text-center',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-3xl md:text-4xl font-black mt-10 uppercase',
    }
  },
  
  // === PREMIUM ===
  'video-premium-cinema': {
    id: 'video-premium-cinema',
    name: 'Premium Cinéma',
    category: 'bold',
    description: 'Style cinématographique',
    config: { layout: 'full-width', showTitle: true },
    styles: {
      section: 'py-0 bg-black',
      container: 'w-full max-w-7xl mx-auto',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-[21/9]',
      title: 'text-white text-sm uppercase tracking-widest mt-6 px-6 opacity-60',
    }
  },
  'video-premium-showcase': {
    id: 'video-premium-showcase',
    name: 'Premium Showcase',
    category: 'modern',
    description: 'Présentation premium',
    config: { layout: 'centered', showTitle: true },
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-5xl mx-auto',
      videoWrapper: 'relative overflow-hidden rounded-lg',
      video: 'w-full aspect-video',
      title: 'text-lg font-light mt-8 text-center tracking-wide',
    }
  },
  'video-premium-minimal': {
    id: 'video-premium-minimal',
    name: 'Premium Minimal',
    category: 'minimal',
    description: 'Style minimal premium',
    config: { layout: 'centered', showTitle: false },
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-4xl mx-auto',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'hidden',
    }
  },
}

export default { textTemplates, imageTemplates, videoTemplates }
