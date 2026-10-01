// Google Analytics 4 (GA4) Client-Side Tracking Library
// Adheres strictly to Google Search Central & SPA Analytics guidelines

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetIdOrEventName: string | Date,
      optionsOrParams?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// Track pageviews during Next.js client-side route transitions
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) return;
  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: url,
  });
};

// Generic event tracker
export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) return;
  window.gtag('event', action, params);
};

// Specialized conversion and engagement tracking events
export const trackContactFormSubmit = (serviceName?: string) => {
  trackEvent('generate_lead', {
    event_category: 'engagement',
    event_label: serviceName || 'General Inquiry',
    service_requested: serviceName,
  });
};

export const trackCalculatorCalculation = (data: {
  systemType: string;
  dimensions: string;
  estimatedPrice: number;
}) => {
  trackEvent('calculator_estimate_generated', {
    event_category: 'quote_calculation',
    system_type: data.systemType,
    dimensions: data.dimensions,
    value: data.estimatedPrice,
    currency: 'IRR',
  });
};

export const trackPhoneCall = (phoneNumber: string) => {
  trackEvent('phone_call_click', {
    event_category: 'contact_action',
    phone_number: phoneNumber,
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_chat_click', {
    event_category: 'contact_action',
    channel: 'WhatsApp',
  });
};

export const trackEitaaClick = () => {
  trackEvent('eitaa_channel_click', {
    event_category: 'contact_action',
    channel: 'Eitaa',
  });
};

export const trackCatalogDownload = (catalogTitle: string) => {
  trackEvent('file_download', {
    event_category: 'catalog',
    file_name: catalogTitle,
  });
};
