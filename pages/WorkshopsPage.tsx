
import React from 'react';
import { WhatsAppIcon } from '../components/icons/SocialIcons';

interface Workshop {
  id: string;
  title: string;
  description: string;
  image: string;
  priceInfo: string;
  duration: string;
  category: string;
}

const workshops: Workshop[] = [
  {
    id: 'epoxi',
    title: 'Talleres formativos de resina epoxi',
    category: 'Formación Técnica',
    description: 'Son experiencias creativas donde aprendes a trabajar esta técnica desde cero, de forma práctica y guiada. Descubres cómo mezclar, colorear y aplicar la resina para crear piezas únicas en un ambiente relajado. No necesitas experiencia previa: te acompañamos paso a paso.',
    image: 'img/taller3.webp',
    priceInfo: '60€/pers.',
    duration: '1 Hora - 3 Días'
  },
  {
    id: 'acrilica',
    title: 'Talleres recreativos de resina acrílica con pica-pica',
    category: 'Actividad Grupal',
    description: 'Experiencia pensada para desconectar y crear sin presión. Incluimos pica-pica en sesiones grupales para compartir y reír. Al final, realizamos una foto grupal para inmortalizar el recuerdo. Creas con tus manos, conectas con el momento y te llevas una experiencia única.',
    image: 'img/talleracrilica.webp',
    priceInfo: 'Desde 20€/pers.',
    duration: '1:30 Horas'
  }
];

export default function WorkshopsPage() {
  const handleInterest = (workshopTitle: string) => {
    const phoneNumber = "657340187";
    const message = `¡Hola! 👋 Me interesa obtener más información sobre el taller: ${workshopTitle}.`;
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
  };

  const mapAddress = "Carrer Angel Guimerà 4-2 Local 1, Santa Coloma de Gramenet, 08923 Barcelona";
  const googleMapsUrl = "https://maps.app.goo.gl/piyTPpQ4xszhLkpp6";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-brand-gold font-sans uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Aprende y Disfruta</span>
        <h1 className="font-display text-6xl text-brand-brown mb-6 leading-tight">Nuestros Talleres</h1>
        <p className="text-xl text-brand-gray leading-relaxed font-light italic">
          Sumérgete en el mundo de la creación artesanal. Descubre el placer de crear con tus manos en un entorno acogedor y profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {workshops.map((workshop) => (
          <div key={workshop.id} className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col group border border-brand-brown/5 transition-all duration-500 hover:shadow-brand-gold/10">
            <div className="h-80 overflow-hidden relative">
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-brand-gold/90 backdrop-blur text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                {workshop.category}
              </div>
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-brand-brown shadow-lg">
                {workshop.duration}
              </div>
            </div>
            <div className="p-10 flex flex-col flex-grow">
              <h3 className="font-display text-3xl lg:text-4xl text-brand-brown mb-6 leading-tight group-hover:text-brand-gold transition-colors">{workshop.title}</h3>
              <p className="text-brand-gray mb-10 flex-grow leading-relaxed font-light text-lg">
                {workshop.description}
              </p>
              <div className="pt-8 border-t border-brand-brown/10 flex items-center justify-between mt-auto">
                <span className="font-sans font-bold text-brand-gold text-2xl">{workshop.priceInfo}</span>
                <button
                  onClick={() => handleInterest(workshop.title)}
                  className="flex items-center gap-3 bg-brand-gold text-white px-8 py-4 rounded-full hover:bg-brand-brown transition-all shadow-xl hover:shadow-brand-gold/40 text-sm font-bold uppercase tracking-widest"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Saber más</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Galería de Talleres - Estilo Bento Grid */}
      <section className="mt-32">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-sans uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Momentos</span>
          <h2 className="font-display text-5xl text-brand-brown italic">Nuestra Galería</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[800px] md:h-[1050px]">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-[2.5rem] shadow-lg group">
            <img
              src="img/taller1.jpg"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Ambiente de taller"
            />
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden rounded-3xl shadow-lg group">
            <img
              src="img/taller2.webp"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Detalle de resina"
            />
          </div>
          <div className="col-span-1 row-span-2 overflow-hidden rounded-[2.5rem] shadow-lg group">
            <img
              src="img/taller6.png"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Proceso creativo"
            />
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden rounded-3xl shadow-lg group">
            <img
              src="img/taller4.png"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Resultado final"
            />
          </div>
          <div className="col-span-2 row-span-2 overflow-hidden rounded-[2.5rem] shadow-lg group">
            <img
              src="img/taller7.jpeg"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Momento especial en el taller"
            />
          </div>
          <div className="col-span-2 row-span-1 overflow-hidden rounded-[2.5rem] shadow-lg group">
            <img
              src="img/taller5.webp"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Grupo trabajando"
            />
          </div>
          <div className="col-span-2 row-span-1 overflow-hidden rounded-[2.5rem] shadow-lg group">
            <img
              src="img/taller3.webp"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Grupo trabajando"
            />
          </div>
        </div>
      </section>

      {/* Nueva Sección de Ubicación - Opción 2 */}
      <section className="mt-24 max-w-4xl mx-auto">
        <div className="bg-brand-cream/50 border border-brand-gold/10 rounded-[3rem] p-12 text-center space-y-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <h2 className="font-display text-4xl text-brand-brown italic">Dónde nos encontramos</h2>
          <div className="space-y-2">
            <p className="font-sans text-brand-gray tracking-widest uppercase text-sm font-medium">Carrer Angel Guimerà 4-2 Local 1</p>
            <p className="font-sans text-brand-gray tracking-widest uppercase text-sm font-medium">08923 Santa Coloma de Gramenet, Barcelona</p>
          </div>
          <div className="pt-4">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-brand-gold border-b border-brand-gold pb-1 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:text-brand-brown hover:border-brand-brown transition-all"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>

      <div className="mt-24 bg-brand-brown text-white p-12 lg:p-20 rounded-[4rem] text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <h2 className="font-display text-4xl lg:text-5xl mb-8 relative z-10">¿Buscas una experiencia para tu grupo?</h2>
        <p className="text-xl text-brand-cream/70 mb-12 font-light max-w-2xl mx-auto relative z-10 italic">
          Organizamos talleres privados para cumpleaños, despedidas o team building. Nos adaptamos a vuestras ideas para crear un momento inolvidable. A partir de 20€/pers. 1:30 Horas.
        </p>
        <button
          onClick={() => handleInterest("Taller Grupal / Evento")}
          className="bg-brand-gold text-white px-16 py-5 rounded-full hover:bg-white hover:text-brand-brown transition-all shadow-2xl font-bold uppercase tracking-[0.2em] text-xs relative z-10"
        >
          Consultar fechas y grupos
        </button>
      </div>
    </div>
  );
}