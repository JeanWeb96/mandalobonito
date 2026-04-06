
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LegalNoticePage() {
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
          <h1 className="font-display text-5xl italic border-b border-brand-gold/20 pb-6">Aviso Legal</h1>
          
          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">1. Datos Identificativos</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:
            </p>
            <ul className="text-brand-gray font-light space-y-2 list-disc pl-5">
              <li><strong>Titular:</strong> Sheila Moreno Soler</li>
              <li><strong>DNI: 53325812-J</strong> </li>
              <li><strong>Domicilio:</strong> Carrer d'Àngel Guimerà, 4, 08923 Santa Coloma de Gramenet, Barcelona</li>
              <li><strong>Teléfono:</strong> 657 34 01 87</li>
              <li><strong>Email:</strong> mandalobonito@yahoo.com</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">2. Usuarios</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              El acceso y/o uso de este portal de Mándalo Bonito atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">3. Uso del Portal</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Mándalo Bonito proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Mándalo Bonito o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">4. Propiedad Intelectual e Industrial</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Mándalo Bonito por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, etc.), titularidad de Mándalo Bonito o bien de sus licenciantes. Todos los derechos reservados.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">5. Exclusión de Garantías y Responsabilidad</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Mándalo Bonito no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">6. Modificaciones</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Mándalo Bonito se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
