
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import FaqPage from './pages/FaqPage';
import WorkshopsPage from './pages/WorkshopsPage';
import OnlineCoursePage from './pages/OnlineCoursePage';
import LegalNoticePage from './pages/LegalNoticePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { CookieBannerProvider } from './components/CookieBanner';
import AnalyticsScript from './components/AnalyticsScript';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <CookieBannerProvider>
      <AnalyticsScript />
      <HashRouter>
        <ScrollToTop />
        <div className="bg-brand-cream text-brand-brown font-sans min-h-screen flex flex-col selection:bg-brand-gold/10 selection:text-brand-gold">
          <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<ShopPage />} />
            <Route path="/catalogo/:productId" element={<ProductDetailPage />} />
            <Route path="/eventos" element={<EventsPage />} />
            <Route path="/talleres" element={<WorkshopsPage />} />
            <Route path="/curso-online" element={<OnlineCoursePage />} />
            <Route path="/sobre-nosotros" element={<AboutPage />} />
            <Route path="/politica-reembolso" element={<RefundPolicyPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/aviso-legal" element={<LegalNoticePage />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        </div>
      </HashRouter>
    </CookieBannerProvider>
  );
}