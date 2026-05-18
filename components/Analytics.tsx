"use client";

import Script from "next/script";

/**
 * Google Analytics 4 integration.
 * Renders nothing if NEXT_PUBLIC_GA_ID is not configured — so dev and
 * preview deployments stay clean while production tracks normally.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `,
        }}
      />
    </>
  );
}

/** Track a custom GA4 event from anywhere. Safe no-op if GA isn't loaded. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (cmd: string, name: string, params?: Record<string, unknown>) => void;
  };
  w.gtag?.("event", name, params);
}
