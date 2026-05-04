"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/utils/analytics";

export default function HomepageCtaTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-cta-section]");
      if (!trigger) return;
      const section = trigger.dataset.ctaSection;
      const label = trigger.dataset.ctaLabel;
      if (!section) return;
      trackEvent("homepage_section_cta_click", {
        section,
        ...(label ? { label } : {}),
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
