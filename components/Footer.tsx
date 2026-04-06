
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';
import { InstagramIcon, TikTokIcon } from './icons/SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white/40 backdrop-blur-md border-t border-brand-brown/5 mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-silk/50 to-transparent pointer-events-none"></div>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 border-b border-brand-brown/5 pb-8">
            <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
              <Link to="/aviso-legal" className="hover:text-brand-gold transition-colors">Aviso Legal</Link>
              <Link to="/politica-privacidad" className="hover:text-brand-gold transition-colors">Privacidad RGPD</Link>
              <Link to="/faq" className="hover:text-brand-gold transition-colors">Preguntas Frecuentes</Link>
              <Link to="/politica-reembolso" className="hover:text-brand-gold transition-colors">Política de Reembolso</Link>
            </div>
            
            <div className="flex items-center gap-2 text-brand-gray/40">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L9.03 1.2a2 2 0 011.94 0l6.864 3.7A2 2 0 0119 6.62v6.76a2 2 0 01-1.166 1.83l-6.864 3.7a2 2 0 01-1.94 0l-6.864-3.7A2 2 0 011 13.38V6.62a2 2 0 011.166-1.72zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Navegación Protegida SSL</span>
            </div>
          </div>
          <p className="text-[11px] tracking-widest uppercase font-bold text-brand-gray/40">&copy; {new Date().getFullYear()} Mándalo Bonito. Elaboración artesanal con resinas premium.</p>
        </div>
    </footer>
  );
}
