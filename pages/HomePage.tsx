
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products, LOGO_URL } from '../constants';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';

const featuredProducts = products.slice(0, 4);
const testimonials = [
  { quote: "¡El llavero para mi padre fue un éxito total! Calidad increíble y un trato muy cercano. Repetiré seguro.", author: "Laura G." },
  { quote: "Los posavasos son preciosos, mucho más bonitos que en las fotos. Se nota que están hechos con mucho mimo.", author: "Carlos M." },
  { quote: "Pedí un reloj personalizado y ha quedado espectacular. Justo lo que quería para mi salón. ¡Gracias!", author: "Sofía P." },
];

const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="transition-all duration-1000 ease-out opacity-0 translate-y-12">
      {children}
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section con imagen de resina sutil */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 transition-transform duration-[10000ms] ease-linear scale-100 animate-[zoom_20s_infinite_alternate]"
            alt="Textura de resina fluida"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_80%)] opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <div className="flex flex-col items-center">
              <div className="relative mb-8 group">
                {/* Glow efecto */}
                <div className="absolute inset-[-50px] bg-brand-gold blur-[150px] opacity-20 rounded-full"></div>
                
                {/* Contenedor del Logo con Animación de Gota en Caída */}
                <div className="h-72 w-72 md:h-96 md:w-96 rounded-full border-4 border-brand-gold shadow-[0_35px_60px_-15px_rgba(62,39,35,0.3)] overflow-hidden relative z-10 bg-white transition-transform duration-1000 group-hover:scale-105 animate-dropIn">
                  <img 
                    src={LOGO_URL} 
                    alt="Mándalo Bonito" 
                    className="w-full h-full object-cover scale-[1.12]" 
                  />
                </div>
              </div>
              <h1 className="font-display text-5xl md:text-8xl text-brand-brown max-w-5xl mx-auto leading-[1.1] tracking-tight">
                Artesanía que <span className="text-brand-gold italic">emociona</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-brand-gray font-sans tracking-[0.3em] uppercase font-light">
                Piezas Únicas • Resina • Alma Artesana
              </p>
              <div className="mt-12">
                <Link to="/catalogo" className="inline-block border-b-2 border-brand-gold pb-2 text-brand-brown hover:text-brand-gold transition-all font-sans uppercase tracking-widest font-bold">
                  Explorar la Colección
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Estilos para las animaciones */}
      <style>{`
        @keyframes zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }

        @keyframes dropIn {
          0% {
            transform: translateY(-1000px) scaleY(1.8) scaleX(0.7);
            opacity: 0;
          }
          60% {
            transform: translateY(30px) scaleY(0.6) scaleX(1.3);
            opacity: 1;
          }
          80% {
            transform: translateY(-10px) scaleY(1.1) scaleX(0.9);
          }
          100% {
            transform: translateY(0) scaleY(1) scaleX(1);
            opacity: 1;
          }
        }

        .animate-dropIn {
          animation: dropIn 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform-origin: bottom center;
        }
      `}</style>

      {/* Introduction */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <span className="text-brand-gold font-sans uppercase tracking-[0.4em] text-sm">Bienvenidos</span>
            <h2 className="font-display text-5xl md:text-6xl text-brand-brown leading-tight">
              Diseñamos objetos que capturan la esencia de tus mejores momentos
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-brand-gray font-light max-w-2xl mx-auto italic">
              "Cada burbuja y cada destello en la resina es una intención puesta a mano para crear algo irrepetible."
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Products - Sin precios */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex justify-between items-end mb-16 border-b border-brand-brown/10 pb-8">
            <h2 className="font-display text-5xl text-brand-brown">Nuestros Favoritos</h2>
            <Link to="/catalogo" className="text-brand-gold hover:text-brand-brown transition-colors font-sans uppercase tracking-widest text-sm font-bold">Ver todo</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 150}>
                <ProductCard product={product} showPrice={false} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Workshops Section - Elegante */}
      <section className="bg-brand-brown py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="grid grid-cols-6 gap-4 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-white h-full"></div>
              ))}
           </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <span className="text-brand-gold font-sans uppercase tracking-[0.5em] text-xs mb-6 block">Experiencias Creativas</span>
            <h2 className="font-display text-6xl text-brand-cream mb-8">¿Te atreves a crear?</h2>
            <p className="max-w-2xl mx-auto text-xl text-brand-cream/60 mb-12 font-light italic">
              Únete a nuestros talleres presenciales y descubre el placer de trabajar con tus manos. No necesitas conocimientos previos, solo tu imaginación.
            </p>
            <Link to="/talleres" className="inline-block bg-brand-gold text-white font-sans px-16 py-5 rounded-full hover:bg-white hover:text-brand-brown transition-all uppercase tracking-widest text-sm font-bold shadow-2xl">
              Descubrir Talleres
            </Link>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="font-display text-5xl text-center mb-20 italic text-brand-brown">Historias de clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                  <ScrollReveal key={index} delay={index * 200}>
                    <TestimonialCard testimonial={testimonial} />
                  </ScrollReveal>
              ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}