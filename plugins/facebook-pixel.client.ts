export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return;

  const pathname = window.location.pathname;

  // Ne pas charger le pixel sur les pages de vente, de paiement et le widget
  if (pathname.startsWith('/s/') || pathname.startsWith('/payment/') || pathname.startsWith('/widget-pay')) {
    return;
  }

  // Ne charger que sur les pages connues de l'app (pas les custom_url de paiement)
  const knownAppPaths = ['/', '/login', '/register', '/forgot-password', '/verify-email', '/dashboard', '/a-propos', '/docs', '/api', '/invoices', '/payment-links', '/sales-pages', '/print'];
  const isKnownPath = knownAppPaths.some(p => pathname === p || pathname.startsWith(p + '/'));
  if (!isKnownPath) {
    return; // C'est probablement un custom_url de paiement
  }

  // ID du pixel Facebook LeekPay
  const pixelId = '2428692480923365';

  // Script d'initialisation Facebook Pixel
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  // Initialiser le pixel avec l'ID
  (window as any).fbq('init', pixelId);
  // Track automatique du PageView
  (window as any).fbq('track', 'PageView');

  // Exposer fbq globalement pour utilisation dans les composants
  return {
    provide: {
      fbq: (window as any).fbq
    }
  };
});
