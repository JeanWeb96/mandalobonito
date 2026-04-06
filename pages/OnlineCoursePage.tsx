
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnlineCoursePage() {
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

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-brand-gold/10">
          <div className="relative h-80 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" 
              alt="Curso Online de Resina" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 to-transparent flex items-end p-12">
              <h1 className="font-display text-4xl md:text-5xl text-white">Curso de Resina: Desde Principiante a Avanzado</h1>
            </div>
          </div>

          <div className="p-12 space-y-10">
            <div className="space-y-8">
              <span className="text-brand-gold font-sans uppercase tracking-[0.3em] text-sm font-bold">Formación Digital</span>
              
              <div className="prose prose-brand max-w-none text-brand-gray space-y-6 text-lg leading-relaxed font-light">
                <p className="text-brand-brown font-medium text-xl italic">
                  Imagina poder crear piezas únicas con tus propias manos: joyas, bandejas, llaveros y objetos decorativos con acabados brillantes, limpios y profesionales… incluso si empiezas desde cero.
                </p>
                
                <p>
                  Este curso online de resina epóxica está diseñado para que aprendas de forma clara, práctica y progresiva, evitando los errores más comunes que hacen que muchas personas abandonen al empezar. Te enseñaré exactamente qué hacer, cómo hacerlo y por qué, para que obtengas resultados bonitos desde tus primeras piezas.
                </p>

                <p>
                  Aprenderás a mezclar correctamente la resina, controlar los tiempos de trabajo y curado, evitar burbujas, lograr transparencia cristalina y crear proyectos que realmente te hagan sentir orgullosa. Cada módulo incluye vídeos paso a paso, demostraciones reales y consejos profesionales basados en experiencia real trabajando con resina.
                </p>

                <p>
                  Además, descubrirás cómo optimizar tus materiales, aprovechar la resina sobrante, cuidar tus moldes y mejorar cada pieza que crees, desarrollando no solo tu técnica, sino también tu seguridad y confianza creativa.
                </p>

                <p>
                  Podrás acceder al curso desde cualquier dispositivo y avanzar a tu propio ritmo, sin presión, repitiendo las lecciones siempre que lo necesites. No necesitas experiencia previa, solo ganas de aprender y crear.
                </p>

                <p>
                  Este curso es ideal tanto si quieres empezar como hobby, como si deseas crear piezas con calidad suficiente para regalar o incluso vender.
                </p>

                <div className="bg-brand-gold/5 p-8 rounded-2xl border-l-4 border-brand-gold">
                  <p className="text-brand-brown font-display text-2xl mb-2">Hoy es el momento perfecto para empezar.</p>
                  <p className="text-brand-gray italic">Forma parte de Mandalobonito y descubre todo lo que eres capaz de crear cuando tienes la guía adecuada.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-brand-brown/5">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-brown mb-1">Vídeos en HD</h3>
                    <p className="text-sm text-brand-gray">Lecciones paso a paso con demostraciones reales.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-brown mb-1">A tu propio ritmo</h3>
                    <p className="text-sm text-brand-gray">Acceso desde cualquier dispositivo, sin límites de tiempo.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-brown p-10 rounded-3xl text-center space-y-6 shadow-2xl">
              <p className="text-white font-display text-3xl">¿Listo para empezar tu viaje creativo?</p>
              <a 
                href="https://go.hotmart.com/B103640100B" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-brand-gold text-white font-sans px-16 py-5 rounded-full hover:bg-white hover:text-brand-brown transition-all uppercase tracking-widest text-sm font-bold shadow-xl"
              >
                Acceder al Curso Completo
              </a>
              <p className="text-xs text-brand-cream/40 italic">Serás redirigido a nuestra plataforma de formación en Hotmart.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
