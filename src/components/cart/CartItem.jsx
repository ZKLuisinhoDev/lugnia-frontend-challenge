import React from 'react';
import { Button } from 'primereact/button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(item.price);

  return (
    <div className="flex gap-4 p-2 relative group">
      {/* Botón eliminar estilo minimalista */}
      <button 
        onClick={() => onRemove(item.id)}
        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm z-10"
      >
        <i className="pi pi-times text-[10px]"></i>
      </button>

      {/* Imagen */}
      <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
        <img
          src={item.image || `https://picsum.photos/id/${item.id}/200/200`}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info y Controles */}
      <div className="flex flex-col justify-between flex-1 py-1">
        <div className="pr-4">
          <h4 className="text-sm font-bold text-gray-800 line-clamp-1 leading-tight mb-1">{item.name}</h4>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
            {item.categoryName}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Controles cantidad minimalistas */}
          <div className="flex items-center bg-gray-100/80 rounded-xl p-1 gap-1">
            <Button 
                icon="pi pi-minus" 
                text 
                className="w-6 h-6 p-0 !text-gray-500 hover:!text-gray-900" 
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
            />
            <span className="w-6 text-center text-xs font-black text-gray-900">{item.quantity}</span>
            <button 
                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
                <i className="pi pi-plus text-[10px] font-bold"></i>
            </button>
          </div>

          <div className="text-sm font-black text-gray-900">
            {formattedPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
