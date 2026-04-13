import React from 'react';
import { Button } from 'primereact/button';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, description, price, categoryName, image } = product;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price || 0);

  const handleImageError = (e) => {
    e.target.src = `https://picsum.photos/400/400?random=${id}`;
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 hover:border-cyan-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(8,112,184,0.07)] transition-all duration-500 p-6 flex flex-col h-full group relative overflow-hidden">
      
      {/* Glossy gradient accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50/50 blur-[50px] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Image Area - Tall and Spacious */}
      <div className="w-full aspect-square mb-6 overflow-hidden rounded-[1.8rem] relative bg-gray-50/50 flex items-center justify-center border border-gray-50 shadow-inner">
        <img
          src={image || `https://picsum.photos/id/${id}/500/500`}
          alt={name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category Badge - Minimalist */}
        {categoryName && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] bg-white/90 backdrop-blur-md text-cyan-600 rounded-full shadow-sm border border-white/50">
              {categoryName}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-start gap-4 mb-2">
           <h3 className="text-lg font-black text-gray-800 leading-tight line-clamp-2" title={name}>
            {name}
          </h3>
          <span className="text-xl font-bold text-gray-900 tracking-tighter">
            {formattedPrice}
          </span>
        </div>
        
        <p className="text-sm text-gray-400 font-medium line-clamp-2 leading-relaxed mb-6">
          {description || 'Calidad premium garantizada con materiales de alta durabilidad y diseño innovador.'}
        </p>

        {/* Action Button - Large and Rounded */}
        <div className="mt-auto pt-2">
          <Button 
            label="Añadir al carrito" 
            icon="pi pi-shopping-cart"
            outlined
            className="w-full text-cyan-600 border-2 border-cyan-500 hover:bg-cyan-600 hover:text-white rounded-2xl py-3.5 font-black text-sm transition-all duration-300 transform active:scale-[0.97]"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
