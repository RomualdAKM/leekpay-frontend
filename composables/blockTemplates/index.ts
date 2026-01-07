// Export central des templates de blocs

// Types
export * from './types'

// Templates par type de bloc
export { heroTemplates } from './hero'
export { ctaTemplates } from './cta'
export { featuresTemplates } from './features'
export { testimonialsTemplates } from './testimonials'
export { pricingTemplates } from './pricing'
export { faqTemplates } from './faq'
export { textTemplates, imageTemplates, videoTemplates } from './content'
export { headerTemplates, footerTemplates, countdownTemplates } from './layout'
export { productTemplates } from './product'
export { gridTemplates } from './grid'

// Import pour le mapping
import { heroTemplates } from './hero'
import { ctaTemplates } from './cta'
import { featuresTemplates } from './features'
import { testimonialsTemplates } from './testimonials'
import { pricingTemplates } from './pricing'
import { faqTemplates } from './faq'
import { textTemplates, imageTemplates, videoTemplates } from './content'
import { headerTemplates, footerTemplates, countdownTemplates } from './layout'
import { productTemplates } from './product'
import { gridTemplates } from './grid'
import type { BlockTemplateGroup, BlockTemplate } from './types'
import { getDefaultTemplate } from './types'

// Mapping type de bloc -> templates
export const blockTemplatesMap: Record<string, BlockTemplateGroup> = {
  hero: heroTemplates,
  cta: ctaTemplates,
  features: featuresTemplates,
  testimonials: testimonialsTemplates,
  pricing: pricingTemplates,
  faq: faqTemplates,
  text: textTemplates,
  image: imageTemplates,
  video: videoTemplates,
  header: headerTemplates,
  footer: footerTemplates,
  countdown: countdownTemplates,
  product: productTemplates,
  grid: gridTemplates,
}

// Fonction pour obtenir les templates d'un type de bloc
export function getTemplatesForBlockType(blockType: string): BlockTemplateGroup | null {
  return blockTemplatesMap[blockType] || null
}

// Fonction pour obtenir un template spécifique
export function getTemplate(blockType: string, templateId?: string): BlockTemplate | null {
  const templates = blockTemplatesMap[blockType]
  if (!templates) return null
  return getDefaultTemplate(templates, templateId)
}

// Fonction pour lister tous les templates d'un type de bloc
export function listTemplates(blockType: string): BlockTemplate[] {
  const templates = blockTemplatesMap[blockType]
  if (!templates) return []
  return Object.values(templates)
}

// Fonction pour obtenir le premier template (défaut) d'un type de bloc
export function getDefaultTemplateId(blockType: string): string | null {
  const templates = blockTemplatesMap[blockType]
  if (!templates) return null
  const keys = Object.keys(templates)
  return keys.length > 0 ? keys[0] : null
}
