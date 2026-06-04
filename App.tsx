import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header         from './components/Header';
import Footer         from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { CookieBannerProvider, useCookieConsent } from './components/CookieBanner';
import { Analytics }  from '@vercel/analytics/react';

// ── Páginas públicas: chunk propio, cargado solo al navegar ───
const HomePage          = lazy(() => import('./pages/HomePage'));
const ShopPage          = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const EventsPage        = lazy(() => import('./pages/EventsPage'));
const WorkshopsPage     = lazy(() => import('./pages/WorkshopsPage'));
const OnlineCoursePage  = lazy(() => import('./pages/OnlineCoursePage'));
const AboutPage         = lazy(() => import('./pages/AboutPage'));
const RefundPolicyPage  = lazy(() => import('./pages/RefundPolicyPage'));
const FaqPage           = lazy(() => import('./pages/FaqPage'));
const LegalNoticePage   = lazy(() => import('./pages/LegalNoticePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiePolicyPage  = lazy(() => import('./pages/CookiePolicyPage'));

// ── Admin: chunk separado, nunca descargado por visitantes ────
// AdminProtected envuelve AuthGuard + DashboardPage en un solo dynamic import,
// de modo que @supabase/supabase-js (auth, realtime, storage) solo se carga
// cuando alguien visita /admin — nunca en páginas públicas.
const LoginPage      = lazy(() => import('./admin/LoginPage'));
const AdminProtected = lazy(() => import('./admin/AdminProtected'));

// ── React Query ───────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:            1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry:                1,
    },
  },
});

// ── RGPD: Analytics solo si el usuario aceptó cookies analíticas ─
function ConditionalAnalytics() {
  const { preferences, hasConsented } = useCookieConsent();
  if (!hasConsented || !preferences.analytics) return null;
  return <Analytics />;
}

// ── Spinner mínimo mientras se descarga el chunk de la página ─
function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
    </div>
  );
}

// ── Scroll al inicio en cada cambio de ruta ───────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ── Layout público ────────────────────────────────────────────
function PublicLayout() {
  return (
    <div className="bg-brand-cream text-brand-brown font-sans min-h-screen flex flex-col selection:bg-brand-gold/10 selection:text-brand-gold">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route path="/"                    element={<HomePage />} />
            <Route path="/catalogo"            element={<ShopPage />} />
            <Route path="/catalogo/:productId" element={<ProductDetailPage />} />
            <Route path="/eventos"             element={<EventsPage />} />
            <Route path="/talleres"            element={<WorkshopsPage />} />
            <Route path="/curso-online"        element={<OnlineCoursePage />} />
            <Route path="/sobre-nosotros"      element={<AboutPage />} />
            <Route path="/politica-reembolso"  element={<RefundPolicyPage />} />
            <Route path="/faq"                 element={<FaqPage />} />
            <Route path="/aviso-legal"         element={<LegalNoticePage />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
            <Route path="/politica-de-cookies" element={<CookiePolicyPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <CookieBannerProvider>
          <ConditionalAnalytics />
          <ScrollToTop />
          <Suspense fallback={<PageSpinner />}>
            <Routes>
              <Route path="/admin/login"     element={<LoginPage />} />
              <Route path="/admin/dashboard" element={<AdminProtected />} />
              <Route path="/admin"           element={<AdminProtected />} />
              <Route path="/*"               element={<PublicLayout />} />
            </Routes>
          </Suspense>
        </CookieBannerProvider>
      </HashRouter>
    </QueryClientProvider>
  );
}
