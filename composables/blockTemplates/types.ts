// Types pour le système de templates de blocs

export interface TemplateStyles {
  section?: string
  container?: string
  title?: string
  subtitle?: string
  text?: string
  button?: string
  buttonSecondary?: string
  buttonGroup?: string
  card?: string
  icon?: string
  image?: string
  imageWrapper?: string
  grid?: string
  content?: string
  badge?: string
  overlay?: string
  navigation?: string
  navDot?: string
  navDotActive?: string
  navArrow?: string
  navArrowLeft?: string
  navArrowRight?: string
  videoWrapper?: string
  video?: string
  [key: string]: string | undefined
}

// Configuration spécifique pour certains templates (ex: Hero)
export interface TemplateConfig {
  layout?: string
  contentPosition?: string
  textAlign?: string
  showBadge?: boolean
  showSecondaryButton?: boolean
  imageRatio?: string
  overlayEnabled?: boolean
  columns?: number
  iconStyle?: string
  showDescription?: boolean
  showCaption?: boolean
  captionOverlay?: boolean
  showTitle?: boolean
  showRating?: boolean
  showAvatar?: boolean
  showRole?: boolean
  showCompany?: boolean
  showBadgePopular?: boolean
  showOriginalPrice?: boolean
  showPeriod?: boolean
  showFeatures?: boolean
  showGuarantee?: boolean
  [key: string]: string | boolean | number | undefined
}

// Configuration pour les previews visuelles dans le TemplatePicker
export interface PreviewConfig {
  bgType: 'light' | 'dark' | 'gradient' | 'accent'
  bgValue?: string // couleur ou gradient CSS
  layoutType: 'centered' | 'split-left' | 'split-right' | 'cards' | 'grid' | 'list' | 'slider' | 'single'
  icon?: 'quote' | 'star' | 'card' | 'grid' | 'slider' | 'list' | 'split'
  columns?: number
  accentColor?: string
  badge?: string // texte du badge optionnel
}

export interface BlockTemplate {
  id: string
  name: string
  category: 'minimal' | 'modern' | 'bold'
  description?: string
  config?: TemplateConfig
  preview?: PreviewConfig
  styles: TemplateStyles
}

export interface BlockTemplateGroup {
  [templateId: string]: BlockTemplate
}

// Types pour les props communes des boutons avec URL
export interface ButtonProps {
  buttonText?: string
  buttonUrl?: string
  buttonTarget?: '_self' | '_blank'
  buttonColor?: string
}

// Fonction utilitaire pour obtenir un template par défaut
export function getDefaultTemplate<T extends BlockTemplateGroup>(
  templates: T,
  templateId?: string
): BlockTemplate {
  if (templateId && templates[templateId]) {
    return templates[templateId]
  }
  // Retourne le premier template comme défaut
  const keys = Object.keys(templates)
  const firstKey = keys[0]
  if (!firstKey || !templates[firstKey]) {
    throw new Error('No templates available')
  }
  return templates[firstKey]
}

// Fonction pour lister les templates par catégorie
export function getTemplatesByCategory<T extends BlockTemplateGroup>(
  templates: T,
  category?: 'minimal' | 'modern' | 'bold'
): BlockTemplate[] {
  const all = Object.values(templates)
  if (!category) return all
  return all.filter(t => t.category === category)
}

// Fonction pour obtenir toutes les catégories disponibles
export function getAvailableCategories<T extends BlockTemplateGroup>(
  templates: T
): string[] {
  const categories = new Set<string>()
  Object.values(templates).forEach(t => categories.add(t.category))
  return Array.from(categories)
}
