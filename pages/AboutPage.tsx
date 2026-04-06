
import React from 'react';
import { LOGO_URL } from '../constants';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-gold blur-3xl opacity-20 rounded-full"></div>
            <div className="relative z-10 h-40 w-40 rounded-full border-4 border-brand-gold shadow-xl mx-auto overflow-hidden bg-white">
              <img 
                src={LOGO_URL} 
                alt="Mándalo Bonito Logo" 
                className="w-full h-full object-cover scale-[1.12]" 
              />
            </div>
          </div>
        </div>
        <h1 className="font-display text-5xl mb-8 text-brand-brown">Nuestra Historia Creativa</h1>
        <div className="space-y-6 text-lg leading-relaxed text-left">
          <p>
            Diseñamos y creamos piezas únicas, combinando creatividad, técnica y detalle para que cada objeto cuente una historia. Nos apasiona el arte de la resina y la posibilidad de transformar ideas en objetos tangibles y llenos de significado.
          </p>
          <p>
            Además, compartimos consejos y tutoriales en nuestras redes sociales para todos aquellos que, como nosotros, aman el mundo de las manualidades y la creación. Queremos inspirar y fomentar la creatividad en nuestra comunidad.
          </p>
          <p>
            Nuestro compromiso es ofrecerte calidad, inspiración y acompañarte en la creación de tus propios proyectos. Cada pieza que sale de nuestro taller lleva una parte de nuestra dedicación y amor por lo hecho a mano.
          </p>
        </div>
      </div>
    </div>
  );
}
