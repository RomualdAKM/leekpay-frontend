/**
 * Redirige le navigateur vers l'URL de paiement d'un provider (Zayono, Moneroo,
 * PayPal…).
 *
 * Les providers refusent d'être affichés dans une iframe (X-Frame-Options /
 * CSP `frame-ancestors 'self'`, protection anti-clickjacking). Or certains
 * marchands intègrent notre checkout / widget dans une iframe sur leur site :
 * une simple `window.location.href` naviguerait alors DANS l'iframe et le
 * provider bloquerait l'affichage (NS_ERROR_CSP_FRAME_ANCESTOR_VIOLATION).
 *
 * On navigue donc la fenêtre du HAUT pour charger le provider en pleine page.
 * La navigation top est autorisée car déclenchée par un clic utilisateur
 * (« Payer ») sur une iframe non sandboxée. Fallbacks pour les cas restreints.
 *
 * Quand le checkout n'est PAS dans une iframe, le comportement est identique à
 * une redirection classique (aucune régression).
 */
export function redirectToProvider(url: string): void {
  if (!url) return
  if (typeof window === 'undefined') return

  // Sommes-nous dans une iframe ? (l'accès à window.top peut lever côté cross-origin)
  let framed = false
  try {
    framed = window.top !== window.self
  } catch (e) {
    framed = true
  }

  if (framed) {
    // 1) Sortir de l'iframe en naviguant la fenêtre du haut (cas le plus courant).
    try {
      const top = window.top
      if (top) {
        top.location.href = url
        return
      }
    } catch (e) {
      // Iframe sandboxée sans allow-top-navigation : on tente un nouvel onglet.
      try {
        const opened = window.open(url, '_blank')
        if (opened) return
      } catch (_) {
        // ignore -> dernier recours ci-dessous
      }
    }
  }

  // Cas normal (pas d'iframe) ou dernier recours.
  window.location.href = url
}
