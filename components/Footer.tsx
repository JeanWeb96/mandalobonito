
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';
import { InstagramIcon, TikTokIcon } from './icons/SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white/50 border-t border-brand-brown/10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <Link to="/" onClick={scrollToTop}>
              <img src={LOGO_URL} alt="Mándalo Bonito Logo" className="h-32 w-32 object-cover rounded-full cursor-pointer hover:opacity-90 transition-opacity" />
            </Link>
          </div>

          <div className="text-brand-brown">
            <h3 className="font-display text-2xl mb-2">Contacto</h3>
            <p>
              <a href="tel:657340187" className="hover:text-brand-gold transition-colors">657 34 01 87</a>
            </p>
            <p>
              <a href="mailto:mandalobonito@yahoo.com" className="hover:text-brand-gold transition-colors">mandalobonito@yahoo.com</a>
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl mb-2">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.instagram.com/mandalobonito" target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:text-brand-gold transition-colors">
                <InstagramIcon className="h-8 w-8" />
              </a>
              <a href="https://www.tiktok.com/@mandalo_bonito?_r=1&_t=ZN-92b3NdbbpeI" target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:text-brand-gold transition-colors">
                <TikTokIcon className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-brand-brown/10 text-center text-sm text-brand-gray">
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <Link to="/aviso-legal" className="hover:text-brand-gold transition-colors">Aviso Legal</Link>
            <Link to="/politica-privacidad" className="hover:text-brand-gold transition-colors">Privacidad</Link>
            <Link to="/faq" className="hover:text-brand-gold transition-colors">Preguntas Frecuentes</Link>
            <Link to="/politica-reembolso" className="hover:text-brand-gold transition-colors">Política de Reembolso</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Mándalo Bonito. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
