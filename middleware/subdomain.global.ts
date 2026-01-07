/**
 * Middleware de détection des sous-domaines pour les pages de vente
 * Redirige les visiteurs de sous-domaines (ex: monshop.leekpay.me) vers /s/[slug]
 */
export default defineNuxtRouteMiddleware((to) => {
  // Obtenir le hostname selon l'environnement
  let host: string | undefined
  
  if (process.server) {
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
  
  // Vérifier si c'est un domaine principal
  if (mainDomains.includes(host)) {
    return // Pas de redirection
  }
  
  // Extraire le sous-domaine
  const parts = host.split('.')
  
  // Vérifier le format (doit être xxx.leekpay.me ou xxx.localhost)
  if (parts.length < 2) return
  
  const subdomain = parts[0]
  const baseDomain = parts.slice(1).join('.')
  
  // Vérifier que le sous-domaine existe
  if (!subdomain) return
  
  // Vérifier que c'est bien un sous-domaine de leekpay.me (ou localhost pour dev)
  const validBaseDomains = ['leekpay.me', 'localhost']
  if (!validBaseDomains.some(d => baseDomain.includes(d))) {
    return
  }
  
  // Vérifier si le sous-domaine est réservé
  if (reservedSubdomains.includes(subdomain.toLowerCase())) {
    return
  }
  
  // Ne pas rediriger si déjà sur la page de vente publique
  if (to.path.startsWith('/s/')) {
    return
  }
  
  // Rediriger vers la page de vente publique
  return navigateTo(`/s/${subdomain}`, { external: false })
})
