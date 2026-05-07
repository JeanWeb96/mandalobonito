
import React, { useState } from 'react';

interface BudgetFormProps {
  sectionTitle: string;
  placeholderTheme: string;
  buttonText: string;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ sectionTitle, placeholderTheme, buttonText }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quantity: '',
    theme: '',
    details: ''
  });

  const phoneNumber = "657340187";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `¡Hola! 👋 Solicito presupuesto para: ${sectionTitle}
✨ Nombre: ${formData.name}
📧 Email: ${formData.email}
📦 Cantidad: ${formData.quantity}
🎨 Estilo/Temática: ${formData.theme}
📝 Detalles: ${formData.details}`;
    
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-brand-gold/10 space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl text-brand-brown italic">Solicitud de Presupuesto</h3>
        <p className="text-brand-gray text-xs mt-2 font-light text-balance">Cuéntanos tu idea y la haremos tangible</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold ml-2 italic">Tu nombre</label>
          <input 
            type="text" 
            placeholder="¿Cómo te llamamos?" 
            required
            className="w-full p-3 bg-brand-cream/20 border-b border-brand-brown/10 focus:border-brand-gold outline-none font-sans text-brand-brown text-sm transition-all rounded-lg"
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold ml-2 italic">Tu contacto</label>
          <input 
            type="email" 
            placeholder="Email de contacto" 
            required
            className="w-full p-3 bg-brand-cream/20 border-b border-brand-brown/10 focus:border-brand-gold outline-none font-sans text-brand-brown text-sm transition-all rounded-lg"
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold ml-2 italic">Cantidad piezas</label>
          <input 
            type="number" 
            placeholder="Aprox." 
            className="w-full p-3 bg-brand-cream/20 border-b border-brand-brown/10 focus:border-brand-gold outline-none font-sans text-brand-brown text-sm transition-all rounded-lg"
            onChange={e => setFormData({...formData, quantity: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold ml-2 italic">Temática o Estilo</label>
          <input 
            type="text" 
            placeholder={placeholderTheme} 
            required
            className="w-full p-3 bg-brand-cream/20 border-b border-brand-brown/10 focus:border-brand-gold outline-none font-sans text-brand-brown text-sm transition-all rounded-lg"
            onChange={e => setFormData({...formData, theme: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold ml-2 italic">Cuéntanos tu idea</label>
        <textarea 
          placeholder="Describe materiales, colores, nombres..." 
          rows={3}
          className="w-full p-3 bg-brand-cream/20 border-b border-brand-brown/10 focus:border-brand-gold outline-none font-sans text-brand-brown text-sm transition-all rounded-lg resize-none"
          onChange={e => setFormData({...formData, details: e.target.value})}
        ></textarea>
      </div>

      <button 
        type="submit"
        className="w-full bg-brand-brown text-white font-sans font-bold py-4 rounded-full uppercase tracking-widest text-xs hover:bg-brand-gold transition-all shadow-lg shadow-brand-brown/20"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default function EventsPage() {
  return (
    <div className="pb-20 bg-brand-cream/20">
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <span className="font-sans uppercase tracking-[0.5em] text-xs text-brand-gold mb-6 block font-bold">Artesanía que celebra la vida</span>
          <h1 className="font-display text-5xl md:text-7xl text-brand-brown mb-8 leading-tight italic">Detalles que cuentan historias</h1>
          <p className="text-xl text-brand-gray font-light leading-relaxed max-w-2xl mx-auto">
            "No diseñamos objetos, encapsulamos la esencia de tus días más importantes para que nunca dejen de brillar."
          </p>
        </div>
      </section>

      {/* SECCIÓN: BAUTIZOS & BIENVENIDAS */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Texto Detallado Bautizos */}
            <div className="lg:col-span-7 space-y-12 text-brand-brown">
              <div className="space-y-6">
                <span className="text-brand-gold font-sans uppercase tracking-[0.3em] text-sm font-bold">Nuevas Vidas</span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">Recuerdos de Bautizo Artesanales: <br/><span className="text-brand-gold italic">Detalles que Emocionan</span></h2>
                <p className="text-lg font-light leading-relaxed text-brand-gray">
                  Celebra un momento único con piezas hechas a mano, diseñadas para convertir el bautizo de tu peque en un recuerdo que perdure para siempre. Te ofrecemos una exclusiva variedad de detalles en resina, elaborados con mimo y dedicación en España, ideales para agradecer a tus invitados su compañía en un día tan especial.
                </p>
              </div>

              {/* Bloque de Productos Destacados */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-brand-gold/10 shadow-sm">
                  <h4 className="font-display text-2xl mb-4 italic text-brand-gold">Llaveros de Resina</h4>
                  <p className="text-sm text-brand-gray font-light">Un regalo útil, dulce y elegante que tus seres queridos llevarán siempre consigo. Personalizados hasta el último detalle.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-brand-gold/10 shadow-sm">
                  <h4 className="font-display text-2xl mb-4 italic text-brand-gold">Portafotos Corazón</h4>
                  <p className="text-sm text-brand-gray font-light">Una pieza decorativa única con flores naturales encapsuladas, ideal para emocionar a familiares y padrinos.</p>
                </div>
              </div>

              {/* Tarifas Orientativas Bautizos */}
              <div className="bg-brand-gold/5 p-8 rounded-3xl border border-brand-gold/20">
                <h4 className="font-display text-2xl mb-4 italic text-brand-brown">Tarifas por volumen</h4>
                <div className="space-y-2 text-sm text-brand-gray font-sans">
                  <p className="flex justify-between border-b border-brand-gold/10 pb-1">
                    <span>1 a 10 unidades</span>
                    <span className="font-bold text-brand-brown">7€ / pieza</span>
                  </p>
                  <p className="flex justify-between border-b border-brand-gold/10 pb-1">
                    <span>A partir de 10 unidades</span>
                    <span className="font-bold text-brand-brown">5€ / pieza</span>
                  </p>
                  <p className="flex justify-between">
                    <span>De 25 a 35 unidades</span>
                    <span className="font-bold text-brand-brown">4€ / pieza</span>
                  </p>
                </div>
                <p className="text-[10px] text-brand-gray/60 mt-4 italic">* Precios orientativos para detalles estándar. Consultar para diseños complejos. Desde 3€ la pieza según cantidad.</p>
              </div>

              {/* Personalización y Por qué elegirnos */}
              <div className="bg-brand-brown/5 p-10 rounded-[3rem] space-y-10">
                <div className="space-y-4">
                  <h3 className="font-display text-3xl italic">Personalización total en cada pieza</h3>
                  <p className="text-sm font-light italic">Cuidamos cada detalle para que cada objeto sea único y refleje la esencia de ese día:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <li className="flex items-center gap-2"><span>🤍</span> Nombres y fechas especiales.</li>
                    <li className="flex items-center gap-2"><span>🤍</span> Mensajes bonitos con significado.</li>
                    <li className="flex items-center gap-2"><span>🤍</span> Diseños exclusivos con flores preservadas.</li>
                    <li className="flex items-center gap-2"><span>🤍</span> Gama de colores a tu elección.</li>
                  </ul>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-brand-brown/10">
                  <h3 className="font-display text-3xl italic">¿Por qué nuestras creaciones?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex gap-3">
                      <span className="text-brand-gold">✔</span>
                      <div>
                        <p className="font-bold">100% Personalizados</p>
                        <p className="text-xs text-brand-gray italic">Hechos a mano, según tus gustos.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-gold">✔</span>
                      <div>
                        <p className="font-bold">Calidad Premium</p>
                        <p className="text-xs text-brand-gray italic">Materiales duraderos y acabados profesionales.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-gold">✔</span>
                      <div>
                        <p className="font-bold">Emoción y Ternura</p>
                        <p className="text-xs text-brand-gray italic">Un regalo que decora y emociona.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-gold">✔</span>
                      <div>
                        <p className="font-bold">Esencia Artesanal</p>
                        <p className="text-xs text-brand-gray italic">Producción local con atención plena.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Galería Mosaico Bautizos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
                <div className="col-span-2 row-span-2 overflow-hidden rounded-[2.5rem]">
                  <img src="img/bautismo5.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Bautizo Principal" />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img src="img/bautismo7.webp" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Detalle Llavero" />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img src="img/bautismo8.webp" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Detalle Portafotos" />
                </div>
                <div className="col-span-2 overflow-hidden rounded-[2.5rem]">
                  <img src="img/bautismo3.jpeg" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Bautizo Atmosfera" />
                </div>
              </div>
            </div>

            {/* Formulario Sticky Bautizos */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <BudgetForm 
                sectionTitle="Bautizos Artesanales" 
                placeholderTheme="Ej: Animalitos, Selva, Clásico..." 
                buttonText="Diseñar mis recuerdos"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: BODAS & COMPROMISOS */}
      <section className="py-24 bg-brand-brown text-brand-cream relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Formulario Sticky Bodas (Corregido comportamiento sticky) */}
            <div className="lg:col-span-5 order-2 lg:order-1 lg:sticky lg:top-32 h-fit">
              <BudgetForm 
                sectionTitle="Bodas Artesanales" 
                placeholderTheme="Ej: Gótico, Rockero, Boho, Clásico..." 
                buttonText="Crear nuestra leyenda"
              />
            </div>

            {/* Texto Detallado Bodas */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
              <div className="space-y-6">
                <span className="text-brand-gold font-sans uppercase tracking-[0.3em] text-sm font-bold">Identidad Única</span>
                <h2 className="font-display text-4xl md:text-5xl leading-tight text-brand-cream">Recuerdos de Boda Artesanales: <br/><span className="text-brand-gold italic">La Esencia de Vuestro "Sí Quiero"</span></h2>
                <p className="text-lg font-light leading-relaxed text-brand-cream/80">
                  Vuestra unión es un momento irrepetible, y los detalles para vuestros invitados deben estar a la altura de vuestra historia. Creamos piezas únicas en resina, elaboradas artesanalmente en España, que fusionan elegancia, modernidad y sentimiento para que vuestro gran día sea recordado por siempre.
                </p>
              </div>

              {/* Bloque de Productos Destacados Bodas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-brand-gold/20 shadow-sm">
                  <h4 className="font-display text-2xl mb-4 italic text-brand-gold">Marcasitios Exclusivos</h4>
                  <p className="text-sm text-brand-cream/70 font-light italic">Un detalle sofisticado que guía a tus invitados y que luego se llevan como un regalo personalizado y eterno.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-brand-gold/20 shadow-sm">
                  <h4 className="font-display text-2xl mb-4 italic text-brand-gold">Agradecimientos Únicos</h4>
                  <p className="text-sm text-brand-cream/70 font-light italic">Desde llaveros hasta porta-joyas, diseñados para sorprender y agradecer a vuestros seres queridos con vuestro estilo propio.</p>
                </div>
              </div>

              {/* Tarifas Orientativas Bodas */}
              <div className="bg-brand-gold/10 backdrop-blur-sm p-8 rounded-3xl border border-brand-gold/30">
                <h4 className="font-display text-2xl mb-4 italic text-brand-gold">Tarifas por volumen</h4>
                <div className="space-y-2 text-sm text-brand-cream/90 font-sans">
                  <p className="flex justify-between border-b border-white/10 pb-1">
                    <span>1 a 10 unidades</span>
                    <span className="font-bold text-white">7€ / pieza</span>
                  </p>
                  <p className="flex justify-between border-b border-white/10 pb-1">
                    <span>A partir de 10 unidades</span>
                    <span className="font-bold text-white">5€ / pieza</span>
                  </p>
                  <p className="flex justify-between">
                    <span>De 25 a 35 unidades</span>
                    <span className="font-bold text-white">4€ / pieza</span>
                  </p>
                </div>
                <p className="text-[10px] text-brand-cream/50 mt-4 italic">* Precios orientativos para detalles estándar. Consultar para diseños complejos.</p>
              </div>

              {/* Personalización y Por qué elegirnos Bodas */}
              <div className="bg-white/5 p-10 rounded-[3rem] space-y-10 border border-white/10">
                <div className="space-y-4">
                  <h3 className="font-display text-3xl italic text-brand-cream">Personalización total en cada pieza</h3>
                  <p className="text-sm font-light italic text-brand-cream/60">Adaptamos cada creación para que sea un fiel reflejo de vuestra personalidad como pareja:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-brand-cream/90">
                    <li className="flex items-center gap-2"><span>🤍</span> Nombres de los novios y fecha especial.</li>
                    <li className="flex items-center gap-2"><span>🤍</span> Encapsulado de flores del ramo o pétalos.</li>
                    <li className="flex items-center gap-2"><span>🤍</span> Estilos desde lo romántico hasta lo gótico.</li>
                    <li className="flex items-center gap-2"><span>🤍</span> Acabados en pan de oro, plata o efectos ahumados.</li>
                  </ul>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h3 className="font-display text-3xl italic text-brand-cream">¿Por qué elegir nuestras piezas?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-brand-cream/90">
                    <div className="flex gap-3">
                      <span className="text-brand-gold">✔</span>
                      <div>
                        <p className="font-bold">Identidad sin Reglas</p>
                        <p className="text-xs text-brand-cream/60 italic">Especialistas en bodas alternativas y góticas.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-gold">✔</span>
                      <div>
                        <p className="font-bold">Durabilidad Eterna</p>
                        <p className="text-xs text-brand-cream/60 italic">La resina conserva la belleza del momento.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-gold">✔</span>
                      <div>
                        <p className="font-bold">Piezas de Colección</p>
                        <p className="text-xs text-brand-cream/60 italic">Cada detalle es una pequeña obra de arte.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-gold">✔</span>
                      <div>
                        <p className="font-bold">Mimo Artesanal</p>
                        <p className="text-xs text-brand-cream/60 italic">Atención individualizada para cada pedido.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Galería Mosaico Bodas */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img src="img/boda2.webp" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Boda Estilo Alternativo" />
                </div>
                <div className="aspect-square md:aspect-auto md:row-span-2 overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img src="img/boda1.webp" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Detalle Mesa Boda" />
                </div>
                <div className="aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img src="img/boda3.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Regalo Invitados Boda" />
                </div>
                <div className="aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl md:col-start-1">
                  <img src="img/boda4.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Detalle Flores Resina" />
                </div>
                <div className="aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img src="img/boda5.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="Textura Resina Bodas" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: OTROS EVENTOS */}
      <section className="py-24 container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-8 mb-20">
          <h2 className="font-display text-5xl md:text-6xl text-brand-brown italic">Celebrar es un arte</h2>
          <p className="text-brand-gray text-lg font-light max-w-2xl mx-auto italic text-balance">
            Cumpleaños, despedidas, hitos corporativos o reencuentros. Cualquier excusa es perfecta para dejar una huella artesanal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-12 rounded-[3rem] border border-brand-brown/5 shadow-sm text-center space-y-4 hover:shadow-xl transition-all">
            <h4 className="font-display text-2xl text-brand-gold italic">Cumpleaños</h4>
            <p className="text-sm text-brand-gray font-light">Kits personalizados, letras gigantes iluminadas o posavasos temáticos para soplar las velas con estilo.</p>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-brand-brown/5 shadow-sm text-center space-y-4 hover:shadow-xl transition-all">
            <h4 className="font-display text-2xl text-brand-gold italic">Teambuilding</h4>
            <p className="text-sm text-brand-gray font-light">Talleres grupales donde la resina une al equipo. Crea el branding de tu oficina de forma única.</p>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-brand-brown/5 shadow-sm text-center space-y-4 hover:shadow-xl transition-all">
            <h4 className="font-display text-2xl text-brand-gold italic">Despedidas</h4>
            <p className="text-sm text-brand-gray font-light">Un detalle gamberro o elegante para sellar esa etapa antes del gran "sí". Personalización máxima.</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
           <BudgetForm 
            sectionTitle="Eventos Sociales Varios" 
            placeholderTheme="¿Qué celebramos?" 
            buttonText="¡A celebrar!"
          />
        </div>
      </section>
    </div>
  );
}
