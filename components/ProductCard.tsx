
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
}

// React.memo: evita re-renders cuando el padre actualiza estado (ej: buscador)
// pero las props del producto no han cambiado.
const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, showPrice = true }) => {
  return (
    <div className="bg-white rounded-organic shadow-sm overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 liquid-gradient border border-brand-brown/5">
      <Link to={`/catalogo/${product.id}`}>
        <div className="overflow-hidden aspect-[4/5] relative">
            <img 
              src={product.image} 
              alt={product.name} 
              loading="lazy" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out resin-filter" 
            />
            {/* Glossy Overlay Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="p-3 sm:p-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/60 mb-2 block font-bold">{product.categories[0]}</span>
          <h3 className="font-display text-base md:text-2xl text-brand-brown group-hover:text-brand-gold transition-colors line-clamp-1">{product.name}</h3>
          {showPrice && (
            <p className="text-brand-gray mt-2 font-sans tracking-wide text-sm font-light">
              {product.variants ? 'Desde ' : ''}<span className="text-brand-gold font-bold">{product.price.toFixed(2)} €</span>
            </p>
          )}
          <div className="mt-4 md:mt-5 overflow-hidden">
            <span className="inline-block bg-brand-gold/5 text-brand-gold border border-brand-gold/20 font-sans text-[8px] md:text-[10px] uppercase tracking-[0.2em] px-4 py-2 md:px-8 md:py-3 rounded-full group-hover:bg-brand-gold group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-gold/30 transition-all duration-500 font-bold whitespace-nowrap">
              Ver Pieza
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
