import React from 'react';

const ProductCard = ({ id, name, price, categoryName }) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price || 0);

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/400x300?text=Sin+Imagen';
  };

  const handleAddToCart = () => {
    console.log(`Agregar al carrito: ${name}`);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={`https://picsum.photos/id/${id}/400/300`}
          alt={name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm text-blue-600 rounded-full shadow-sm">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight mb-2 min-h-[3rem]">
          {name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Precio</span>
            <span className="text-2xl font-black text-blue-600 tracking-tight">
              {formattedPrice}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-xl hover:bg-black transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-none active:scale-95 group/btn"
          >
            <svg className="w-6 h-6 transform transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
