
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../constants';
import { WhatsAppIcon } from '../components/icons/SocialIcons';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === productId);
  const [customizationText, setCustomizationText] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);

  if (!product) {
    return <div className="text-center py-20 font-display text-4xl">Producto no encontrado.</div>;
  }

  const [mainImage, setMainImage] = useState(product.gallery[0] || product.image);

  const phoneNumber = "657340187";
  
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  // Construimos el mensaje incluyendo el texto de personalización si existe
  const consultMessage = `¡Hola! 👋 Me interesa mucho este producto de tu catálogo: ${product.name}.${
    selectedVariant ? `\n\nTamaño/Variante: ${selectedVariant.name}` : ''
  }${
    customizationText ? `\n\nMis preferencias de personalización son: ${customizationText}` : ''
  }`;
  
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(consultMessage)}`;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Botón Volver */}
      <button 
        onClick={() => navigate('/catalogo')}
        className="flex items-center gap-2 text-brand-gray hover:text-brand-gold mb-12 transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-sans uppercase tracking-widest text-xs font-bold">Volver al catálogo</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden aspect-[4/5] relative group">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.gallery.map((img, index) => (
              <button 
                key={index} 
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-brand-gold shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`} 
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`${product.name} - vista ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-10">
          <div>
            <span className="text-brand-gold font-sans uppercase tracking-[0.3em] text-xs font-bold">{product.categories}</span>
            <h1 className="font-display text-6xl text-brand-brown mt-4 mb-6 leading-tight">{product.name}</h1>
            <p className="text-4xl text-brand-gold font-sans font-light">{product.price.toFixed(2)} €</p>
          </div>
          
          {product.variants && (
            <div className="space-y-4">
              <p className="font-sans uppercase tracking-widest text-xs font-bold text-brand-brown">Selecciona:</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-6 py-3 rounded-full border-2 transition-all font-sans text-sm font-bold ${
                      selectedVariant?.name === variant.name
                        ? 'border-brand-gold bg-brand-gold text-white shadow-lg'
                        : 'border-brand-brown/10 text-brand-brown hover:border-brand-gold'
                    }`}
                  >
                    {variant.name} - {variant.price}€
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="prose prose-brand text-brand-gray font-light text-lg leading-relaxed">
            <p>{product.description}</p>
          </div>
          
          {product.customization && (
            <div className="bg-brand-cream/50 p-8 rounded-3xl border border-brand-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white text-xs font-bold">1</div>
                <h2 className="font-display text-2xl text-brand-brown">Personaliza tu pieza</h2>
              </div>
              <p className="mb-6 text-sm text-brand-gray italic leading-relaxed">
                Cada pieza es única. Describe cómo te gustaría la tuya: colores, nombres, acabados... o simplemente dinos que te gustaría una igual a la de la foto.
              </p>
              <textarea
                value={customizationText}
                onChange={(e) => setCustomizationText(e.target.value)}
                rows={4}
                className="w-full p-4 border-2 border-brand-brown/5 rounded-2xl focus:ring-brand-gold focus:border-brand-gold focus:outline-none transition-all bg-white"
                placeholder="Ej: Quiero que tenga tonos azules y el nombre 'Laura' en dorado..."
              ></textarea>
            </div>
          )}

          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white text-xs font-bold">2</div>
                <p className="font-sans uppercase tracking-widest text-xs font-bold text-brand-brown">Contacta para confirmar tu pedido</p>
            </div>
            
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-4 bg-brand-gold text-white font-sans px-10 py-5 rounded-full hover:bg-brand-brown transition-all text-sm font-bold uppercase tracking-widest shadow-xl hover:shadow-brand-gold/40"
            >
              <WhatsAppIcon className="h-6 w-6"/>
              Me interesa
            </a>
            
            <p className="text-center text-xs text-brand-gray font-light mt-4 italic">
              * El pago y los detalles finales se gestionarán de forma personalizada tras tu consulta.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-10 border-t border-brand-brown/5">
             <div className="text-center">
                <p className="font-sans uppercase tracking-widest text-[10px] font-bold text-brand-gold mb-2">Envío Artesanal</p>
                <p className="text-xs text-brand-gray">Hecho a mano con calma</p>
             </div>
             <div className="text-center">
                <p className="font-sans uppercase tracking-widest text-[10px] font-bold text-brand-gold mb-2">Calidad Premium</p>
                <p className="text-xs text-brand-gray">Resinas de alta durabilidad</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}