import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, description, price, categoryName, image } = product;
  const [showModal, setShowModal] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price || 0);

  const handleImageError = (e) => {
    e.target.src = `https://picsum.photos/400/400?random=${id}`;
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowModal(true);
    }
  };

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${name}`}
        className="bg-white rounded-[2.5rem] border border-gray-100 hover:border-cyan-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(8,112,184,0.08)] transition-all duration-500 p-6 flex flex-col h-full group cursor-pointer"
      >
        {/* Image Area */}
        <div className="w-full aspect-square mb-6 overflow-hidden rounded-[2rem] relative bg-gray-50 flex items-center justify-center border border-gray-50 shadow-inner">
          <img
            src={image || `https://picsum.photos/id/${id}/500/500`}
            alt=""
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
          {categoryName && (
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-md text-cyan-600 rounded-full shadow-sm">
                {categoryName}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-1">
          <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className="text-xl font-black text-gray-800 leading-tight line-clamp-2">{name}</h3>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">{formattedPrice}</span>
          </div>
          
          <p className="text-sm text-gray-400 font-medium line-clamp-2 leading-relaxed mb-8">
            {description || 'Calidad sumaq garantizada con los mejores materiales.'}
          </p>

          <div className="mt-auto">
            <Button 
              label="Añadir al carrito" 
              icon="pi pi-shopping-cart"
              outlined
              className="w-full text-cyan-600 border-2 border-cyan-500 hover:bg-cyan-600 hover:text-white rounded-2xl py-4 font-black text-sm transition-all duration-300"
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog 
        visible={showModal} 
        onHide={() => setShowModal(false)}
        draggable={false}
        resizable={false}
        showHeader={false}
        className="w-[90vw] md:w-[750px] lg:w-[900px] border-none shadow-2xl rounded-[3rem] overflow-hidden"
        contentClassName="p-0 border-none rounded-[3rem] bg-white overflow-hidden"
        modal
        dismissableMask
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-50 relative overflow-hidden">
             <img
              src={image || `https://picsum.photos/id/${id}/800/800`}
              alt={name}
              onError={handleImageError}
              className="w-full h-full object-cover animate-fadein"
              loading="lazy"
            />
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 left-6 w-12 h-12 bg-white/80 backdrop-blur-lg rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:bg-black hover:text-white transition-all z-10"
              aria-label="Cerrar modal"
            >
              <i className="pi pi-arrow-left text-sm"></i>
            </button>
          </div>

          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <div className="mb-6">
               <Tag 
                value={categoryName} 
                className="bg-cyan-50 text-cyan-700 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-cyan-100"
              />
            </div>
            
            <h2 className="text-4xl font-black text-gray-900 mb-2 leading-none tracking-tight">
              {name}
            </h2>
            <p className="text-3xl font-black text-cyan-600 mb-8 tracking-tighter">
              {formattedPrice}
            </p>

            <div className="space-y-6 mb-10">
              <div>
                <h4 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] mb-3">Descripción</h4>
                <p className="text-gray-500 leading-relaxed text-sm font-medium">
                  {description || 'Este producto suma calidad y diseño en cada detalle. Perfectamente balanceado para ofrecer una experiencia duradera y estética excepcional.'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Garantía</p>
                   <p className="text-xs font-bold text-gray-700">12 Meses</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Envío</p>
                   <p className="text-xs font-bold text-gray-700">Gratis hoy</p>
                </div>
              </div>
            </div>

            <Button 
              label="Agregar al carrito" 
              icon="pi pi-cart-plus"
              className="w-full bg-cyan-600 border-none rounded-2xl py-5 font-black text-lg shadow-2xl shadow-cyan-200 hover:bg-black transition-all"
              onClick={() => {
                handleAddToCart();
                setShowModal(false);
              }}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    categoryName: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.object
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductCard;
