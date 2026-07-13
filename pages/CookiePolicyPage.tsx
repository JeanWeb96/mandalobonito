import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../lib/useSEO';

export default function CookiePolicyPage() {
  useSEO({
    title: 'Política de Cookies | Mándalo Bonito',
    description: 'Política de cookies de Mándalo Bonito: qué cookies utilizamos y cómo gestionarlas.',
    noindex: true,
  });
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-brand-gray hover:text-brand-gold mb-12 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-sans uppercase tracking-widest text-xs font-bold">Volver al inicio</span>
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl p-12 md:p-16 space-y-10 text-brand-brown">
          <h1 className="font-display text-5xl italic border-b border-brand-gold/20 pb-6">Política de Cookies</h1>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">1. ¿Qué son las cookies?</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en su navegador cuando los visita. Permiten que el sitio recuerde sus acciones y preferencias durante un periodo de tiempo, de modo que no tenga que volver a introducirlas cada vez que regrese o navegue de una página a otra.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">2. ¿Qué cookies utilizamos?</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              En este sitio web utilizamos los siguientes tipos de cookies:
            </p>

            <div className="space-y-6 mt-2">
              <div className="border border-brand-silk rounded-2xl p-6 space-y-2">
                <h3 className="font-semibold text-brand-brown">Cookies estrictamente necesarias</h3>
                <p className="text-brand-gray font-light leading-relaxed text-sm">
                  Son imprescindibles para el funcionamiento básico del sitio. Entre ellas se encuentra la cookie que almacena sus preferencias de consentimiento (<code className="bg-brand-silk/60 px-1 rounded text-xs">cookieConsentData</code>), guardada en <em>localStorage</em> durante 365 días. No requieren su consentimiento previo.
                </p>
              </div>

              <div className="border border-brand-silk rounded-2xl p-6 space-y-2">
                <h3 className="font-semibold text-brand-brown">Cookies analíticas</h3>
                <p className="text-brand-gray font-light leading-relaxed text-sm">
                  Utilizamos <strong>Vercel Analytics</strong> para recopilar datos estadísticos anónimos sobre el uso del sitio (páginas visitadas, tiempo de permanencia, origen del tráfico). Esta herramienta no utiliza cookies propias de seguimiento; los datos se procesan de forma agregada y no permiten identificar a los usuarios. Solo se activa si usted acepta las cookies analíticas.
                </p>
              </div>

              <div className="border border-brand-silk rounded-2xl p-6 space-y-2">
                <h3 className="font-semibold text-brand-brown">Cookies de marketing y publicidad</h3>
                <p className="text-brand-gray font-light leading-relaxed text-sm">
                  Actualmente este sitio web no utiliza cookies de marketing ni de publicidad de terceros. Si en el futuro se incorporaran, esta política se actualizará y se le solicitará un nuevo consentimiento.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">3. ¿Cómo gestionar las cookies?</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Puede gestionar sus preferencias de cookies en cualquier momento a través del panel de configuración que aparece en el banner de cookies al pie de la página. Además, puede configurar o deshabilitar las cookies directamente desde su navegador:
            </p>
            <ul className="text-brand-gray font-light space-y-2 list-disc pl-5 text-sm">
              <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
              <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
              <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Gestionar datos del sitio web.</li>
              <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio.</li>
            </ul>
            <p className="text-brand-gray font-light leading-relaxed">
              Tenga en cuenta que deshabilitar determinadas cookies puede afectar al funcionamiento del sitio web.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">4. Actualizaciones de esta política</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Podemos actualizar esta Política de Cookies para reflejar cambios en las cookies que utilizamos o por otras razones operativas, legales o reglamentarias. Le recomendamos que revise esta página periódicamente para estar informado sobre el uso de cookies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">5. Contacto</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Si tiene alguna pregunta sobre el uso de cookies en este sitio, puede contactarnos en{' '}
              <a href="mailto:mandalobonito@yahoo.com" className="text-brand-gold underline hover:opacity-80 transition-opacity">
                mandalobonito@yahoo.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
