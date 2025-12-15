/**
 * Composable pour utiliser Facebook Pixel dans les composants
 * Permet de tracker des événements personnalisés facilement
 */
export const useFacebookPixel = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, parameters);
    }
  };

  const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', eventName, parameters);
    }
  };

  // Événements standards Facebook
  const trackPurchase = (value: number, currency: string = 'XOF', extraParams?: Record<string, any>) => {
    trackEvent('Purchase', { value, currency, ...extraParams });
  };

  const trackInitiateCheckout = (value?: number, currency?: string, extraParams?: Record<string, any>) => {
    trackEvent('InitiateCheckout', { value, currency, ...extraParams });
  };

  const trackAddPaymentInfo = (extraParams?: Record<string, any>) => {
    trackEvent('AddPaymentInfo', extraParams);
  };

  const trackCompleteRegistration = (extraParams?: Record<string, any>) => {
    trackEvent('CompleteRegistration', extraParams);
  };

  const trackLead = (extraParams?: Record<string, any>) => {
    trackEvent('Lead', extraParams);
  };

  const trackViewContent = (contentName?: string, extraParams?: Record<string, any>) => {
    trackEvent('ViewContent', { content_name: contentName, ...extraParams });
  };

  return {
    trackEvent,
    trackCustomEvent,
    trackPurchase,
    trackInitiateCheckout,
    trackAddPaymentInfo,
    trackCompleteRegistration,
    trackLead,
    trackViewContent,
  };
};
