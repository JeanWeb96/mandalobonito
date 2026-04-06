import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-gray/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <span className="text-xl font-display text-brand-brown">{question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-4' : 'max-h-0'}`}>
        <div className="prose text-brand-brown">{children}</div>
      </div>
    </div>
  );
};


export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-5xl text-center mb-12 text-brand-brown">Preguntas Frecuentes</h1>
      <div className="max-w-3xl mx-auto">
        <FaqItem question="¿Cuáles son los tiempos de envío y entrega?">
          <p>
            Dado que la mayoría de nuestros productos son personalizados y hechos a mano bajo pedido, los tiempos de producción y entrega son variables.
            El proceso artesanal requiere tiempo y cuidado. A veces, una pieza puede dañarse durante el proceso de curado y es necesario repetirla para garantizar la máxima calidad. Esto puede afectar los plazos de entrega. Agradecemos tu paciencia y comprensión, ¡la espera merecerá la pena!
          </p>
        </FaqItem>
        <FaqItem question="¿Cómo funciona la personalización?">
          <p>
            En la página de cada producto personalizable, encontrarás un campo de texto para especificar los detalles que deseas (nombres, fechas, colores, etc.). Una vez realizado el pedido, nos pondremos en contacto contigo a través de email o WhatsApp para confirmar todos los detalles y asegurarnos de que el resultado final sea exactamente como lo imaginaste.
          </p>
        </FaqItem>
        <FaqItem question="¿Cuál es la política de devoluciones?">
          <p>
            Puedes consultar nuestra política de devoluciones y reembolsos completa en nuestra página de <a href="/#/politica-reembolso" className="text-brand-gold hover:underline">Política de Reembolso</a>.
          </p>
        </FaqItem>
      </div>

      <h2 className="font-display text-4xl text-center mt-16 mb-8 text-brand-brown">Cuidados del Producto</h2>
       <div className="max-w-3xl mx-auto bg-white/50 p-6 rounded-lg shadow-sm">
            <p className="text-lg text-brand-brown text-center">
            Nuestras piezas de resina no requieren cuidados especiales. Para limpiarlas, simplemente utiliza un paño suave y seco o ligeramente húmedo. Es importante <strong>no usar productos de limpieza corrosivos o abrasivos</strong>, ya que podrían dañar el acabado de la pieza. ¡Con este sencillo cuidado, tus artículos se mantendrán bonitos por mucho tiempo!
            </p>
       </div>
    </div>
  );
}