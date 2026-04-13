import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';

const CartItem = ({ cartProduct, onUpdateQuantity, onRemove }) => {
  const { id, name, price, quantity, categoryName, image } = cartProduct;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price * quantity);

  const handleDecreaseQuantity = () => onUpdateQuantity(id, quantity - 1);
  const handleIncreaseQuantity = () => onUpdateQuantity(id, quantity + 1);
  const handleRemoveProduct = () => onRemove(id);

  return (
    <div className="flex gap-4 p-2 relative group">
      <button 
        onClick={handleRemoveProduct}
        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm z-10"
        aria-label="Eliminar producto"
      >
        <i className="pi pi-times text-[10px]"></i>
      </button>

      <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-slate-700">
        <img
          src={image || `https://picsum.photos/id/${id}/200/200`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 py-1">
        <div className="pr-4">
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1 leading-tight mb-1">{name}</h4>
          <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-gray-100 dark:border-slate-700">
            {categoryName}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center bg-gray-100/80 dark:bg-slate-800 rounded-xl p-1 gap-1">
            <Button 
                icon="pi pi-minus" 
                text 
                className="w-6 h-6 p-0 !text-gray-500 hover:!text-gray-900 dark:hover:!text-white" 
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
            />
            <span className="w-6 text-center text-xs font-black text-gray-900 dark:text-white">{quantity}</span>
            <Button 
                icon="pi pi-plus" 
                text 
                className="w-6 h-6 p-0 !text-gray-500 hover:!text-gray-900 dark:hover:!text-white" 
                onClick={handleIncreaseQuantity}
            />
          </div>

          <div className="text-sm font-black text-gray-900 dark:text-white">
            {formattedPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  cartProduct: PropTypes.object.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default CartItem;
