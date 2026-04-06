
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../constants';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.flatMap(p => p.categories)));
    return ['Todos', ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.categories.includes(selectedCategory);
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCustomConsult = () => {
    const phoneNumber = "657340187";
    const message = "¡Hola! 👋 Estoy viendo vuestra tienda y me gustaría consultar sobre una pieza personalizada.";
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Navegación Superior */}
      <div className="flex items-center justify-between mb-16">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-brand-brown hover:text-brand-gold transition-all group"
        >
          <div className="w-10 h-10 rounded-full border border-brand-brown/10 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="font-sans uppercase tracking-[0.2em] text-xs font-bold">Volver</span>
        </button>

        <h1 className="hidden md:block font-display text-5xl text-brand-brown">Nuestro Catálogo</h1>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="¿Qué buscas?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 border-b-2 border-brand-brown/10 focus:border-brand-gold outline-none bg-transparent font-sans text-sm w-40 md:w-64 transition-all focus:w-80"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Sidebar de Categorías Estilizado */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-32">
            <h2 className="font-sans uppercase tracking-[0.3em] text-xs font-bold mb-8 text-brand-gold border-b border-brand-gold/20 pb-4">Filtrar por</h2>
            <ul className="space-y-4 font-sans tracking-[0.1em] text-sm">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`group flex items-center justify-between w-full text-left py-2 transition-all ${
                      selectedCategory === cat 
                      ? 'text-brand-brown font-bold' 
                      : 'text-brand-gray hover:text-brand-gold'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && (
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-20 p-8 bg-brand-brown text-white rounded-[2.5rem] shadow-xl">
              <h3 className="font-display text-2xl mb-4">¿Algo especial?</h3>
              <p className="text-sm text-brand-cream/60 leading-relaxed mb-6 italic">
                Cualquier pieza puede ser personalizada. Si no encuentras lo que imaginas, contáctanos.
              </p>
              <button 
                onClick={handleCustomConsult} 
                className="text-brand-gold font-bold uppercase tracking-widest text-xs hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Consultar ahora</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Rejilla de Productos */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-32 bg-brand-cream/30 rounded-3xl border-2 border-dashed border-brand-brown/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-6 text-brand-brown/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="font-display text-3xl text-brand-gray mb-4">Lo sentimos, no hay resultados</p>
              <button 
                onClick={() => {setSelectedCategory('Todos'); setSearchQuery('');}}
                className="text-brand-gold hover:text-brand-brown font-sans uppercase tracking-widest text-xs font-bold transition-colors"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}