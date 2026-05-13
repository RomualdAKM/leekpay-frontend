/**
 * Utilitaire pour nettoyer les descriptions qui peuvent contenir du JSON
 * (cas des paiements créés via l'API avec métadonnées)
 * 
 * @param rawDescription - La description brute (peut être du JSON ou du texte)
 * @returns La description nettoyée
 * 
 * @example
 * // Retourne "Paiement pour services"
 * cleanDescription('{"api_description":"Paiement pour services","metadata":{}}')
 * 
 * @example
 * // Retourne "Facture #123"
 * cleanDescription('Facture #123')
 */
export function cleanDescription(rawDescription: string): string {
  if (!rawDescription) return ''
  
  try {
    const parsed = JSON.parse(rawDescription)
    
    // Si c'est un objet JSON avec api_description, l'extraire
    if (parsed && typeof parsed === 'object' && parsed.api_description) {
      return parsed.api_description
    }
    
    // Si c'est un objet JSON sans api_description, retourner une description générique
    if (parsed && typeof parsed === 'object') {
      return 'Paiement via API LeekPay'
    }
  } catch (e) {
    // Ce n'est pas du JSON, retourner la description telle quelle
  }
  
  return rawDescription
}

/**
 * Version pour les composants Vue (retourne une string vide si null/undefined)
 * 
 * @param rawDescription - La description brute (peut être null, undefined ou string)
 * @returns La description nettoyée
 */
export function getCleanDescription(rawDescription: string | null | undefined): string {
  return cleanDescription(rawDescription || '')
}
