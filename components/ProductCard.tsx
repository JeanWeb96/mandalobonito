
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showPrice = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <Link to={`/catalogo/${product.id}`}>
        <div className="overflow-hidden aspect-[4/5]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
        </div>
        <div className="p-5 text-center">
          <h3 className="font-display text-2xl text-brand-brown group-hover:text-brand-gold transition-colors">{product.name}</h3>
          {showPrice && (
            <p className="text-brand-gray mt-2 font-sans tracking-wide">
              {product.variants ? 'Desde ' : ''}{product.price.toFixed(2)} €
            </p>
          )}
          <div className="mt-4 overflow-hidden">
            <span className="inline-block bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-sans text-xs uppercase tracking-widest px-6 py-2 rounded-full group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
              Descubrir
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
