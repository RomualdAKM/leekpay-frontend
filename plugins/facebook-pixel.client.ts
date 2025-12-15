export default defineNuxtPlugin(() => {
  // ID du pixel Facebook
  const pixelId = '2428692480923365';

  // Initialisation du pixel Facebook
  if (typeof window !== 'undefined') {
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
  }
});
