/**
 * Middleware de détection des sous-domaines et domaines personnalisés pour les pages de vente
 * - Sous-domaines: monshop.leekpay.me → /s/monshop
 * - Domaines personnalisés: monsite.com → /s/[slug] (via API)
 */
export default defineNuxtRouteMiddleware(async (to) => {
  // Obtenir le hostname selon l'environnement
  let host: string | undefined
  
  if (import.meta.server) {
    // Côté serveur : utiliser les headers de la requête
    const headers = useRequestHeaders(['host'])
    host = headers.host?.split(':')[0] // Retirer le port si présent
  } else {
    // Côté client : utiliser window.location
    host = window.location.hostname
  }
  
  if (!host) return
  
  // Domaines principaux à exclure (pas de redirection)
  const mainDomains = [
    'leekpay.me',
    'www.leekpay.me',
    'localhost',
    '127.0.0.1',
  ]
  
  // Sous-domaines réservés à exclure
  const reservedSubdomains = [
    'www',
    'app',
    'api',
    'admin',
    'dashboard',
    'mail',
    'webmail',
    'ftp',
    'cpanel',
    'dev',
    'staging',
  ]
  
  // Ne pas rediriger si déjà sur la page de vente publique
  if (to.path.startsWith('/s/')) {
    return
  }
  
  // Vérifier si c'est un domaine principal
  if (mainDomains.includes(host)) {
    return // Pas de redirection
  }
  
  // Extraire les parties du domaine
  const parts = host.split('.')
  
  // Vérifier si c'est un sous-domaine de leekpay.me
  const baseDomain = parts.slice(1).join('.')
  const validLeekpayDomains = ['leekpay.me', 'localhost']
  const isLeekpaySubdomain = validLeekpayDomains.some(d => baseDomain.includes(d))
  
  if (isLeekpaySubdomain && parts.length >= 2) {
    const subdomain = parts[0]
    
    // Vérifier que le sous-domaine existe et n'est pas réservé
    if (!subdomain || reservedSubdomains.includes(subdomain.toLowerCase())) {
      return
    }
    
    // Rediriger vers la page de vente publique par sous-domaine
    return navigateTo(`/s/${subdomain}`, { external: false })
  }
  
  // Si ce n'est pas un sous-domaine leekpay.me, vérifier si c'est un domaine personnalisé
  // Exclure les domaines avec trop peu de parties (ex: localhost sans extension)
  if (parts.length < 2) return
  
  // Appeler l'API pour vérifier si ce domaine personnalisé est configuré
  try {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase as string
    const response = await $fetch<{ found: boolean; slug?: string }>(
      `/api/public/domain/${encodeURIComponent(host)}/check`,
      {
        baseURL: apiBase,
        timeout: 5000,
      }
    )
    
    if (response.found && response.slug) {
      // Domaine personnalisé trouvé, rediriger vers la page de vente
      return navigateTo(`/s/${response.slug}`, { external: false })
    }
  } catch (error) {
    // En cas d'erreur API, ne pas bloquer la navigation
    console.error('[CustomDomain] Erreur lors de la vérification du domaine:', error)
  }
  
  // Domaine non reconnu, laisser passer (page 404 standard)
})
