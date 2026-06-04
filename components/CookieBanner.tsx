import React, { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------
// TIPOS Y CONTEXTO
// ----------------------------------------------------------------------
export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieContextType = {
  isAccepted: boolean;
  preferences: CookiePreferences;
  hasConsented: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieContext = createContext<CookieContextType>({
  isAccepted: false,
  preferences: defaultPreferences,
  hasConsented: false,
});

export const useCookieConsent =() => useContext(CookieContext);

// ----------------------------------------------------------------------
// PROVIDER Y COMPONENTE BANNER
// ----------------------------------------------------------------------
export const CookieBannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState<boolean>(true); // Evita flash visual (SSR/Hydration)
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [tempPreferences, setTempPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consentData = localStorage.getItem("cookieConsentData");
    if (consentData) {
      try {
        const { prefs, timestamp } = JSON.parse(consentData);
        const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;
        
        if (Date.now() - timestamp > ONE_YEAR) {
          throw new Error("El consentimiento expiró (365 días).");
        }
        
        setPreferences(prefs);
        setHasConsented(true);
      } catch (e) {
        localStorage.removeItem("cookieConsentData");
        setHasConsented(false);
        setShowBanner(true);
      }
    } else {
      setHasConsented(false);
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(
      "cookieConsentData",
      JSON.stringify({ prefs, timestamp: Date.now() })
    );
    setPreferences(prefs);
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);
    
    // Dispara un evento global útil si se usan scripts legacy fuera de React
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: prefs }));
  };

  const aceptarTodo = () => savePreferences({ necessary: true, analytics: true, marketing: true });
  const rechazarTodo = () => savePreferences({ necessary: true, analytics: false, marketing: false });
  const guardarSeleccion = () => savePreferences(tempPreferences);

  // isAccepted suele usarse como booleano central si el usuario accedió a alguna no esencial
  const isAccepted = preferences.analytics || preferences.marketing;

  return (
    <CookieContext.Provider value={{ isAccepted, preferences, hasConsented }}>
      {children}

      {/* BANNER INFERIOR */}
      {showBanner && !showSettings && (
        <div 
          role="dialog" 
          aria-live="polite" 
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-brand-cream border-t border-brand-silk shadow-[0_-5px_30px_rgba(62,39,35,0.1)] transition-all"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-brand-brown mb-2 font-display">
                Privacidad y Cookies
              </h2>
              <p className="text-sm text-brand-gray">
                Utilizamos cookies propias y de terceros para asegurar el correcto funcionamiento del sitio, personalizar su experiencia y analizar nuestro tráfico. Puede aceptar todas, rechazarlas o configurar sus preferencias.{" "}
                <Link to="/politica-de-cookies" className="underline font-medium text-brand-gold hover:opacity-80 transition-opacity" aria-label="Leer más sobre la política de cookies">
                  Saber más
                </Link>.
              </p>
            </div>

            {/* BOTONES CON EL MISMO PESO VISUAL PARA ACEPTAR Y RECHAZAR */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setTempPreferences(preferences);
                  setShowSettings(true);
                }}
                className="px-5 py-2.5 text-sm font-medium rounded-organic transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold border border-brand-silk text-brand-brown bg-brand-cream hover:bg-brand-silk shadow-sm"
                aria-label="Configurar preferencias de cookies"
              >
                Configurar
              </button>
              
              <button
                onClick={rechazarTodo}
                className="px-5 py-2.5 text-sm font-medium rounded-organic transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold border-2 border-brand-brown text-brand-brown bg-transparent hover:bg-brand-silk"
                aria-label="Rechazar todas las cookies no esenciales"
              >
                Rechazar Todo
              </button>

              <button
                onClick={aceptarTodo}
                className="px-5 py-2.5 text-sm font-medium rounded-organic transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold border-2 border-brand-brown text-brand-brown bg-transparent hover:bg-brand-silk hover:shadow-md"
                aria-label="Aceptar todas las cookies"
              >
                Aceptar Todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIGURACIÓN LATERAL/CENTRAL */}
      {showSettings && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-brown/40 backdrop-blur-sm">
          <div 
            role="dialog" 
            aria-modal="true" 
            className="bg-brand-cream w-full max-w-lg rounded-organic shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-brand-silk"
          >
            <div className="p-5 flex justify-between items-center border-b border-brand-silk bg-brand-cream">
              <h3 className="text-xl font-semibold text-brand-brown font-display">
                Configuración de Cookies
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 rounded-md text-brand-gray hover:text-brand-brown hover:bg-brand-silk transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Cerrar configuración"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-base font-semibold text-brand-brown">Estrictamente Necesarias</h4>
                  <p className="text-sm text-brand-gray mt-1">Obligatorias para permitir la funcionalidad básica de este sitio, como el acceso seguro. No almacenan datos identificables, por lo que no requieren consentimiento.</p>
                </div>
                <div className="pt-1">
                  <input type="checkbox" checked disabled className="w-5 h-5 opacity-50 cursor-not-allowed accent-brand-gold" aria-label="Cookies necesarias, bloqueado" />
                </div>
              </div>

              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-base font-semibold text-brand-brown">Analíticas</h4>
                  <p className="text-sm text-brand-gray mt-1">Permiten cuantificar visitas y fuentes de tráfico para evaluar y mejorar el rendimiento de nuestro sitio con información anónima.</p>
                </div>
                <div className="pt-1">
                  <input
                    type="checkbox"
                    checked={tempPreferences.analytics}
                    onChange={(e) => setTempPreferences({ ...tempPreferences, analytics: e.target.checked })}
                    className="w-5 h-5 cursor-pointer accent-brand-gold focus:ring-brand-gold text-brand-gold rounded border-brand-silk"
                    aria-label="Permitir cookies analíticas"
                  />
                </div>
              </div>

              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-base font-semibold text-brand-brown">Marketing y Publicidad</h4>
                  <p className="text-sm text-brand-gray mt-1">Usadas para perfilar sus intereses y mostrarle anuncios relevantes. Si no las permite, verá publicidad menos adaptada a usted.</p>
                </div>
                <div className="pt-1">
                  <input
                    type="checkbox"
                    checked={tempPreferences.marketing}
                    onChange={(e) => setTempPreferences({ ...tempPreferences, marketing: e.target.checked })}
                    className="w-5 h-5 cursor-pointer accent-brand-gold focus:ring-brand-gold text-brand-gold rounded border-brand-silk"
                    aria-label="Permitir cookies de marketing"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-brand-silk bg-brand-cream/80 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                onClick={rechazarTodo}
                className="px-5 py-2.5 text-sm font-medium rounded-organic transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold border-2 border-brand-brown text-brand-brown bg-transparent hover:bg-brand-silk"
              >
                Rechazar Todo
              </button>
              <button
                onClick={guardarSeleccion}
                className="px-5 py-2.5 text-sm font-medium rounded-organic transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold border border-brand-gold bg-brand-gold text-brand-cream hover:opacity-90 shadow-md"
              >
                Guardar Selección
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieContext.Provider>
  );
};
