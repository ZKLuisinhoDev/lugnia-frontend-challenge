import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, description, price, categoryName, image } = product;
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const formattedPrice = useMemo(() => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price || 0),
  [price]);

  const handleImageError = (e) => {
    e.target.src = `https://picsum.photos/id/${id}/300/200`;
  };

  const handleQuickAdd = (event) => {
    event.stopPropagation();
    onAddToCart(product);
  };

  const handleOpenDetail = () => setIsDetailOpen(true);
  const handleCloseDetail = () => setIsDetailOpen(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenDetail();
    }
  };

  return (
    <>
      <div 
        onClick={handleOpenDetail}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:border-cyan-200 dark:hover:border-cyan-600 shadow-sm hover:shadow-2xl transition-all duration-500 p-6 flex flex-col h-full group cursor-pointer"
      >
        <div className="w-full aspect-square mb-6 overflow-hidden rounded-[2rem] relative bg-gray-50 dark:bg-slate-800 flex items-center justify-center border border-gray-50 dark:border-slate-700 shadow-inner">
          <img
            src={image || `https://picsum.photos/id/${id}/300/200`}
            alt={name}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
          {categoryName && (
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-cyan-600 dark:text-cyan-400 rounded-full">
                {categoryName}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 px-1">
          <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 leading-tight line-clamp-2">{name}</h3>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">{formattedPrice}</span>
          </div>
          
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium line-clamp-2 leading-relaxed mb-8">
            {description || 'Calidad Sumaq garantizada con los mejores materiales.'}
          </p>

          <div className="mt-auto">
            <Button 
              label="Añadir al carrito" 
              icon="pi pi-shopping-cart"
              outlined
              className="w-full text-cyan-600 dark:text-cyan-400 border-2 border-cyan-500 dark:border-cyan-600 hover:bg-cyan-600 hover:text-white rounded-2xl py-4 font-black text-sm transition-all"
              onClick={handleQuickAdd}
            />
          </div>
        </div>
      </div>

      <ProductDetailModal 
        product={product}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onAddToCart={() => onAddToCart(product)}
        priceFormatter={formattedPrice}
      />
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductCard;
