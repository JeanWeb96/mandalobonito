
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublicProducts, usePublicCategories } from '../lib/publicQueries';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: categories = [], isLoading: catsLoading } = usePublicCategories();
  const { data: products  = [], isLoading: prodsLoading } = usePublicProducts({
    categoryId: selectedCategory,
    search:     searchQuery || undefined,
  });

  const isLoading = catsLoading || prodsLoading;

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
        {/* Sidebar de Categorías */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-32">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden w-full flex items-center justify-between p-5 bg-brand-cream border border-brand-brown/5 rounded-2xl mb-6 shadow-sm hover:border-brand-gold/20 transition-all font-sans uppercase tracking-widest text-xs font-bold"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filtrar por: <span className="text-brand-gold">{categories.find(c => c.id === selectedCategory)?.name ?? 'Todos'}</span></span>
              </div>
              <svg className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-500 lg:h-auto ${isFilterOpen ? 'max-h-[500px] mb-12 opacity-100 scale-100' : 'max-h-0 lg:max-h-none opacity-0 scale-95 lg:opacity-100 lg:scale-100'}`}>
              <h2 className="hidden lg:block font-sans uppercase tracking-[0.3em] text-xs font-bold mb-8 text-brand-gold border-b border-brand-gold/20 pb-4">Categorías</h2>
              <ul className="space-y-4 font-sans tracking-[0.1em] text-sm bg-white/50 lg:bg-transparent p-6 lg:p-0 rounded-3xl lg:rounded-none border border-brand-brown/5 lg:border-none shadow-sm lg:shadow-none">
                {/* "Todos" */}
                <li>
                  <button
                    onClick={() => { setSelectedCategory(null); setIsFilterOpen(false); }}
                    className={`group flex items-center justify-between w-full text-left py-2 transition-all px-4 lg:px-0 rounded-xl ${
                      !selectedCategory
                        ? 'text-brand-brown font-bold bg-brand-gold/5 lg:bg-transparent'
                        : 'text-brand-gray hover:text-brand-gold hover:bg-brand-gold/5 lg:hover:bg-transparent'
                    }`}
                  >
                    <span>Todos</span>
                    {!selectedCategory && <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />}
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => { setSelectedCategory(cat.id); setIsFilterOpen(false); }}
                      className={`group flex items-center justify-between w-full text-left py-2 transition-all px-4 lg:px-0 rounded-xl ${
                        selectedCategory === cat.id
                          ? 'text-brand-brown font-bold bg-brand-gold/5 lg:bg-transparent'
                          : 'text-brand-gray hover:text-brand-gold hover:bg-brand-gold/5 lg:hover:bg-transparent'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block mt-20 p-8 bg-brand-brown text-white rounded-[2.5rem] shadow-xl">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Rejilla de Productos */}
        <div className="flex-grow">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-4 md:gap-y-16 md:gap-x-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-brand-brown/5 rounded-3xl mb-4" />
                  <div className="h-4 bg-brand-brown/5 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-brand-brown/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-4 md:gap-y-16 md:gap-x-12">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-brand-cream/30 rounded-3xl border-2 border-dashed border-brand-brown/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-6 text-brand-brown/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="font-display text-3xl text-brand-gray mb-4">
                {searchQuery || selectedCategory ? 'Lo sentimos, no hay resultados' : 'Pronto habrá productos aquí'}
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                  className="text-brand-gold hover:text-brand-brown font-sans uppercase tracking-widest text-xs font-bold transition-colors"
                >
                  Limpiar todos los filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
