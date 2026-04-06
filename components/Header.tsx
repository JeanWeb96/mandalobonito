
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGO_URL } from '../constants';

const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onLinkClick) onLinkClick();
  };

  return (
    <>
      <NavLink 
        to="/" 
        onClick={handleScrollTop}
        className={({ isActive }) => `py-2 px-3 rounded-md transition-colors ${isActive ? 'text-brand-gold' : 'hover:text-brand-gold'}`}
      >
        Inicio
      </NavLink>
      <NavLink to="/catalogo" onClick={onLinkClick} className={({ isActive }) => `py-2 px-3 rounded-md transition-colors ${isActive ? 'text-brand-gold' : 'hover:text-brand-gold'}`}>Catálogo</NavLink>
      <NavLink to="/eventos" onClick={onLinkClick} className={({ isActive }) => `py-2 px-3 rounded-md transition-colors ${isActive ? 'text-brand-gold' : 'hover:text-brand-gold'}`}>Para Celebrar</NavLink>
      <NavLink to="/talleres" onClick={onLinkClick} className={({ isActive }) => `py-2 px-3 rounded-md transition-colors ${isActive ? 'text-brand-gold' : 'hover:text-brand-gold'}`}>Talleres</NavLink>
      <NavLink to="/curso-online" onClick={onLinkClick} className={({ isActive }) => `py-2 px-3 rounded-md transition-colors ${isActive ? 'text-brand-gold' : 'hover:text-brand-gold'}`}>Curso Online</NavLink>
      <NavLink to="/sobre-nosotros" onClick={onLinkClick} className={({ isActive }) => `py-2 px-3 rounded-md transition-colors ${isActive ? 'text-brand-gold' : 'hover:text-brand-gold'}`}>Sobre Nosotros</NavLink>
    </>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="bg-brand-cream/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-brand-gold/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0 py-2">
            <NavLink to="/" onClick={scrollToTop} className="group block">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-brand-gold/30 shadow-xl overflow-hidden bg-white ring-2 ring-brand-gold/10 ring-offset-2 transition-all duration-500 group-hover:ring-brand-gold/50 group-hover:scale-105">
                <img className="h-full w-full object-cover scale-[1.15]" src={LOGO_URL} alt="Mándalo Bonito Logo" />
              </div>
            </NavLink>
          </div>
          <nav className="hidden md:flex items-center space-x-2 font-display text-lg lg:text-xl">
            <NavLinks />
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-brown hover:text-brand-gold focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-cream/95 backdrop-blur-lg border-b border-brand-gold/10">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center font-display text-lg">
            <NavLinks onLinkClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
