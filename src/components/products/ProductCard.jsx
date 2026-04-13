import React from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

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
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-cyan-400 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full group">
      {/* Image area */}
      <div className="w-full aspect-square mb-4 overflow-hidden rounded-xl relative bg-gray-100">
        <img
          src={image || `https://picsum.photos/id/${id}/400/400`}
          alt={name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Category chip */}
      {categoryName && (
        <div className="mb-3">
          <Chip 
            label={categoryName} 
            className="bg-cyan-50 text-cyan-700 font-medium text-xs border border-cyan-200"
          />
        </div>
      )}

      {/* Product info */}
      <div className="flex-1 mb-4">
        <h3 className="text-base font-bold text-gray-800 leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {description || 'Sin descripción'}
        </p>
      </div>

      {/* Price and button */}
      <div className="mt-auto pb-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <span className="text-xl font-bold text-gray-900">
            {formattedPrice}
          </span>
        </div>
        <div className="px-4 mb-4">
          <button
            onClick={handleAddToCart}
            className="w-auto mx-auto flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg py-2.5 px-6 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            <i className="pi pi-shopping-cart text-sm"></i>
            <span>Añadir al carrito</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
