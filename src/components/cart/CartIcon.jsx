import React from 'react';

const CartIcon = ({ itemsCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-3 rounded-xl text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 cursor-pointer group"
      title="Ver carrito"
    >
      <i className="pi pi-shopping-cart text-3xl group-hover:scale-110 transition-transform duration-200"></i>
      {itemsCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[22px] h-[22px] flex items-center justify-center bg-red-500 text-white text-[11px] font-bold rounded-full px-1 shadow-lg shadow-red-500/30 animate-[fadeIn_0.2s_ease-out] ring-2 ring-white">
          {itemsCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
