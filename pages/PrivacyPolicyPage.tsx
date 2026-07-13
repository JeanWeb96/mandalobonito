
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../lib/useSEO';

export default function PrivacyPolicyPage() {
  useSEO({
    title: 'Política de Privacidad | Mándalo Bonito',
    description: 'Política de privacidad de Mándalo Bonito: cómo tratamos y protegemos tus datos personales.',
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
          <h1 className="font-display text-5xl italic border-b border-brand-gold/20 pb-6">Política de Privacidad</h1>
          
          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">1. Responsable del Tratamiento</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              El responsable del tratamiento de sus datos es Sheila Moreno Soler, con DNI 53325812J y domicilio en Carrer Angel Guimerà 4-2 Local 1, 08923 Santa Coloma de Gramenet, Barcelona. Email: mandalobonito@yahoo.com.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">2. Finalidad del Tratamiento</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Tratamos la información que nos facilitan las personas interesadas con el fin de:
            </p>
            <ul className="text-brand-gray font-light space-y-2 list-disc pl-5">
              <li>Gestionar las solicitudes de información o presupuestos recibidas a través de WhatsApp o formularios.</li>
              <li>Prestar los servicios contratados (venta de productos artesanos y talleres).</li>
              <li>Realizar la gestión administrativa, contable y fiscal de los servicios solicitados.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">3. Legitimación</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              La base legal para el tratamiento de sus datos es la ejecución de un contrato o el consentimiento del interesado al contactar con nosotros para solicitar información o contratar nuestros servicios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">4. Conservación de los Datos</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">5. Destinatarios</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Los datos no se cederán a terceros salvo en los casos en que exista una obligación legal o sea necesario para la prestación del servicio (por ejemplo, empresas de transporte).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl italic text-brand-gold">6. Derechos de los Usuarios</h2>
            <p className="text-brand-gray font-light leading-relaxed">
              Cualquier persona tiene derecho a obtener confirmación sobre si estamos tratando datos personales que les conciernan, o no. Las personas interesadas tienen derecho a:
            </p>
            <ul className="text-brand-gray font-light space-y-2 list-disc pl-5">
              <li>Acceder a sus datos personales.</li>
              <li>Solicitar la rectificación de los datos inexactos.</li>
              <li>Solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.</li>
              <li>Solicitar la limitación de su tratamiento.</li>
              <li>Oponerse al tratamiento de sus datos.</li>
            </ul>
            <p className="text-brand-gray font-light leading-relaxed">
              Para ejercer estos derechos, puede enviar un correo electrónico a mandalobonito@yahoo.com adjuntando copia de su DNI.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
