import React, { useEffect } from "react";
import { useCookieConsent } from "./CookieBanner";

export default function AnalyticsScript() {
  const { preferences, hasConsented } = useCookieConsent();

  useEffect(() => {
    // Escucha si hubo consentimiento y si expresamente la opción de analytics está habilitada
    if (hasConsented && preferences.analytics) {
      // Creamos e inyectamos el script si no existía previo
      if (!document.getElementById("google-analytics")) {
        const script = document.createElement("script");
        script.id = "google-analytics";
        // ID de prueba/marcador. Reemplazar "G-XXXXXXX" con el real.
        script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`;
        script.async = true;
        document.head.appendChild(script);

        // Inicializamos GTAG
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", "G-XXXXXXX", {
          page_path: window.location.pathname,
        });
      }
    }
  }, [hasConsented, preferences.analytics]);

  return null; // Este componente no renderiza HTML
}
