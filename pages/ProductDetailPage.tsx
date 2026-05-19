
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublicProduct } from '../lib/publicQueries';
import { WhatsAppIcon } from '../components/icons/SocialIcons';
import type { ProductVariant } from '../types';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = usePublicProduct(productId);

  // Todos los useState al inicio, antes de cualquier return condicional
  const [mainImage,         setMainImage]         = useState('');
  const [selectedVariant,   setSelectedVariant]   = useState<ProductVariant | null>(null);
  const [customizationText, setCustomizationText] = useState('');

  // Inicializa imagen y variante cuando el producto carga
  useEffect(() => {
    if (product) {
      setMainImage(product.gallery[0] || product.image);
      setSelectedVariant(product.variants?.[0] ?? null);
    }
  }, [product?.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 animate-pulse">
          <div className="aspect-[4/5] bg-brand-brown/5 rounded-[2rem]" />
          <div className="space-y-6">
            <div className="h-6 bg-brand-brown/5 rounded w-1/3" />
            <div className="h-16 bg-brand-brown/5 rounded w-3/4" />
            <div className="h-10 bg-brand-brown/5 rounded w-1/2" />
            <div className="h-24 bg-brand-brown/5 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-4xl text-brand-brown mb-4">Producto no encontrado.</p>
        <button
          onClick={() => navigate('/catalogo')}
          className="text-brand-gold hover:text-brand-brown transition-colors font-sans uppercase tracking-widest text-xs font-bold"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  const phoneNumber  = "657340187";
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

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
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden aspect-[4/5] relative group border border-brand-brown/5">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-cream">
                <span className="text-brand-gray/40 text-sm">Sin imagen</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {product.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-6">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 scale-95 hover:scale-100 ${
                    mainImage === img ? 'border-brand-gold shadow-lg shadow-brand-gold/20' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`${product.name} - vista ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-10">
          <div>
            {product.categories.length > 0 && (
              <span className="text-brand-gold font-sans uppercase tracking-[0.4em] text-[10px] font-bold bg-brand-gold/5 px-4 py-2 rounded-full border border-brand-gold/10 inline-block">
                {product.categories.join(' & ')}
              </span>
            )}
            <h1 className="font-display text-6xl md:text-7xl text-brand-brown mt-8 mb-6 leading-tight font-bold">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <p className="text-5xl text-brand-gold font-sans font-bold tracking-tight">{currentPrice.toFixed(2)} €</p>
              <span className="text-brand-gray text-xs uppercase tracking-widest">+ Envío gestionado por experto</span>
            </div>
          </div>

          {product.variants && product.variants.length > 0 && (
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
              />
            </div>
          )}

          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white text-xs font-bold">
                {product.customization ? '2' : '1'}
              </div>
              <p className="font-sans uppercase tracking-widest text-xs font-bold text-brand-brown">Contacta para personalizar tu pedido</p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-4 bg-brand-gold text-white font-sans px-10 py-5 rounded-full hover:bg-brand-brown transition-all text-sm font-bold uppercase tracking-widest shadow-xl hover:shadow-brand-gold/40"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Me interesa
            </a>

            <p className="text-center text-xs text-brand-gray font-light mt-4 italic">
              * El pago y los detalles finales se gestionarán de forma personalizada tras tu consulta.
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 border-y border-brand-brown/5 py-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-brown/40">Calidad Protegida</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-brown/40">Trabajo Manual</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-brown/40">Soporte Directo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 uppercase tracking-[0.2em] text-[10px] font-bold">
            <div className="flex flex-col items-center p-4 bg-brand-gold/5 rounded-2xl border border-brand-gold/10">
              <p className="text-brand-gold mb-1">Envío Artesanal</p>
              <p className="text-brand-gray/60 font-sans">Empaquetado con mimo</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-brand-gold/5 rounded-2xl border border-brand-gold/10">
              <p className="text-brand-gold mb-1">Garantía Resina</p>
              <p className="text-brand-gray/60 font-sans">Alta durabilidad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
