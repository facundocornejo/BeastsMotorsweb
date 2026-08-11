declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number>
) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", action, params);
  } else if (window.dataLayer) {
    // GTM-only setup: no gtag on the page, push a GTM-style event object
    window.dataLayer.push({ event: action, ...params });
  }
}

export function trackWhatsAppClick(vehicleName?: string) {
  trackEvent("click_whatsapp", {
    vehicle_name: vehicleName || "general",
  });
}

export function trackVehicleView(vehicleName: string, vehicleType: string) {
  trackEvent("view_vehicle", {
    vehicle_name: vehicleName,
    vehicle_type: vehicleType,
  });
}

export function trackSearch(query: string) {
  trackEvent("search", { search_term: query });
}

export function trackFilterApplied(filterType: string, filterValue: string) {
  trackEvent("filter_applied", {
    filter_type: filterType,
    filter_value: filterValue,
  });
}
