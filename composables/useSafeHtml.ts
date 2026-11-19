// composables/useSafeHtml.ts
//
// SÉCURITÉ : tout HTML fourni par un utilisateur (description de lien de paiement,
// blocs de pages de vente...) DOIT passer par ici avant un v-html.
// Le token de session est lisible en JS sur leekpay.me : une seule XSS = vol de
// compte (y compris admin).
//
// - Côté client : DOMPurify avec une liste blanche de balises/attributs, URLs
//   limitées à http(s)/mailto/tel/ancres.
// - Côté serveur (SSR, pas de DOM) : texte brut échappé. Le HTML riche
//   assaini remplace ce texte juste après le montage (useSafeHtml).
import DOMPurify from 'dompurify'

const ALLOWED_TAGS = [
  'p', 'br', 'b', 'strong', 'i', 'em', 'u', 's', 'strike', 'del', 'mark', 'small',
  'sub', 'sup', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'blockquote', 'span', 'div', 'hr', 'code', 'pre', 'font'
]
const ALLOWED_ATTR = ['href', 'target', 'rel', 'class', 'style', 'title', 'color']
const ALLOWED_URI_REGEXP = /^(?:https?:|mailto:|tel:|#|\/(?!\/))/i

let hookInstalled = false

/** Échappe une chaîne pour un affichage en texte (aucune balise interprétée). */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** HTML -> texte brut échappé (sûr partout, y compris en SSR). */
export function htmlToSafeText(html: string | null | undefined): string {
  if (!html) return ''
  const text = String(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|blockquote)>/gi, '\n')
    // Balises (même non fermées) supprimées ; les « < » isolés sont échappés ensuite.
    .replace(/<[a-zA-Z!/?][^>]*>?/g, '')
  return escapeHtml(text)
}

/** HTML utilisateur -> HTML assaini (client) ou texte échappé (serveur). */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return ''
  if (import.meta.server || typeof window === 'undefined' || !DOMPurify.isSupported) {
    return htmlToSafeText(html)
  }

  if (!hookInstalled) {
    // Liens externes : jamais d'accès à window.opener.
    DOMPurify.addHook('afterSanitizeAttributes', (node: Element) => {
      if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
        node.setAttribute('rel', 'noopener noreferrer nofollow')
      }
    })
    hookInstalled = true
  }

  return DOMPurify.sanitize(String(html), {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP,
    ALLOW_DATA_ATTR: false
  }) as string
}

/**
 * Lien sûr pour un href de contenu utilisateur : http(s), mailto:, tel:, ancre
 * (#...) ou chemin relatif (/...). Tout le reste (javascript:, data:...) => undefined.
 */
export function safeLinkUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const v = value.trim()
  if (!v) return undefined
  // Retire caractères de contrôle / espaces qui pourraient masquer "javascript:".
  const normalized = v.replace(/[\u0000- \u007f-\u009f]/g, '')
  return ALLOWED_URI_REGEXP.test(normalized) ? v : undefined
}

/** URL sûre pour un href / une redirection : http(s) uniquement, sinon ''. */
export function safeHttpUrl(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return ''
  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

/**
 * Version réactive pour un template : texte échappé au rendu serveur, HTML
 * assaini une fois monté côté client (évite tout écart d'hydratation).
 */
export function useSafeHtml(source: () => string | null | undefined) {
  const mounted = ref(false)
  onMounted(() => { mounted.value = true })
  return computed(() => (mounted.value ? sanitizeHtml(source()) : htmlToSafeText(source())))
}

/** Variante fonction (listes v-for) : safe(item.content) dans le template. */
export function useSafeHtmlFn() {
  const mounted = ref(false)
  onMounted(() => { mounted.value = true })
  return (html: string | null | undefined) => (mounted.value ? sanitizeHtml(html) : htmlToSafeText(html))
}
