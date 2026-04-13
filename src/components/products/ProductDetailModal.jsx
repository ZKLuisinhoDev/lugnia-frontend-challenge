import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart, priceFormatter }) => {
  if (!product) return null;

  const { id, name, description, categoryName, image, material } = product;

  const handleConfirmPurchase = () => {
    onAddToCart();
    onClose();
  };

  return (
    <Dialog 
      visible={isOpen} 
      onHide={onClose}
      draggable={false}
      resizable={false}
      showHeader={false}
      className="w-[90vw] md:w-[750px] lg:w-[900px] border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white dark:bg-slate-900"
      modal
      dismissableMask
    >
      <div className="flex flex-col md:flex-row h-full min-h-[400px]">
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-50 dark:bg-slate-800 relative overflow-hidden">
           <img
            src={image || `https://picsum.photos/id/${id}/900/600`}
            alt={name}
            className="w-full h-full object-cover animate-fadein"
            loading="lazy"
          />
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 w-12 h-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-lg hover:bg-black hover:text-white transition-all z-10"
            aria-label="Cerrar modal"
          >
            <i className="pi pi-arrow-left text-sm"></i>
          </button>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white dark:bg-slate-900">
          <div className="mb-6">
             <Tag 
              value={categoryName} 
              className="bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-cyan-100 dark:border-cyan-800"
            />
          </div>
          
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 leading-none tracking-tight">
            {name}
          </h2>
          <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mb-8 tracking-tighter">
            {priceFormatter}
          </p>

          <div className="space-y-6 mb-10">
            <div>
              <h4 className="text-xs font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] mb-3">Descripción</h4>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm font-medium">
                {description || 'Calidad Sumaq garantizada en cada detalle.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {material && (
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700">
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Material</p>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-300 capitalize">{material}</p>
                </div>
              )}
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700">
                 <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Garantía</p>
                 <p className="text-xs font-bold text-gray-700 dark:text-gray-300">12 Meses</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700">
                 <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Envío</p>
                 <p className="text-xs font-bold text-gray-700 dark:text-gray-300">Gratis hoy</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700">
                 <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Origen</p>
                 <p className="text-xs font-bold text-gray-700 dark:text-gray-300">Pasto, Col</p>
              </div>
            </div>
          </div>

          <Button 
            label="Agregar al carrito" 
            icon="pi pi-cart-plus"
            className="w-full bg-cyan-600 border-none rounded-2xl py-5 font-black text-lg shadow-2xl shadow-cyan-200 hover:bg-black transition-all"
            onClick={handleConfirmPurchase}
          />
        </div>
      </div>
    </Dialog>
  );
};

ProductDetailModal.propTypes = {
  product: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  priceFormatter: PropTypes.string.isRequired
};

export default ProductDetailModal;
