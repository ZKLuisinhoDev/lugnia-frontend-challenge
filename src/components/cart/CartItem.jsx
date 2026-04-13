import React from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(item.price);

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(item.price * item.quantity);

  return (
    <div className="group relative bg-white rounded-xl border-2 border-gray-100 hover:border-cyan-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex gap-3 p-3 pl-4">
        {/* Product image */}
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ring-1 ring-gray-100">
          <img
            src={item.image || `https://picsum.photos/id/${item.id}/100/100`}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://picsum.photos/100/100?random=' + item.id;
            }}
          />
        </div>

        {/* Product info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h4 className="font-bold text-gray-800 text-sm line-clamp-1 mb-1 group-hover:text-cyan-700 transition-colors">
              {item.name}
            </h4>
            {item.categoryName && (
              <Chip 
                label={item.categoryName} 
                className="bg-cyan-50 text-cyan-700 font-medium text-[0.65rem] border border-cyan-200 px-2 py-0.5"
              />
            )}
          </div>

          <div className="flex items-end justify-between mt-1.5">
            {/* Quantity controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <i className="pi pi-minus text-xs"></i>
              </button>
              <span className="w-7 text-center font-extrabold text-gray-800 text-sm bg-gradient-to-b from-cyan-50 to-white rounded-md py-0.5">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
              >
                <i className="pi pi-plus text-xs"></i>
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-base font-extrabold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                {formattedTotal}
              </div>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
          title="Eliminar producto"
        >
          <i className="pi pi-times text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
