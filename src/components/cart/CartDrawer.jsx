import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import CartItem from './CartItem';

const CartDrawer = ({ visible, onHide, cart, onUpdateQuantity, onRemove, onClearCart, getCartTotal, getCartItemsCount }) => {
  const handleCheckout = () => {
    alert('¡Gracias por tu compra! (Demo)');
    onClearCart();
  };

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(getCartTotal());

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      position="right"
      className="w-full sm:w-[450px] border-none shadow-2xl"
      // Remove default padding for full control
      contentClassName="p-0 flex flex-col h-full bg-white"
      header={
        <div className="flex items-center gap-4 px-6 pt-6 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-200">
            <i className="pi pi-shopping-bag text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 leading-tight">Tu Carrito</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {getCartItemsCount()} {getCartItemsCount() === 1 ? 'Artículo' : 'Artículos'}
            </p>
          </div>
        </div>
      }
    >
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <i className="pi pi-shopping-cart text-gray-200 text-5xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Está muy vacío por aquí</h3>
            <p className="text-gray-500 max-w-[200px] text-sm leading-relaxed">Agrega productos para encontrarlos aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-gray-500 font-bold text-sm uppercase tracking-tighter">Total Estimado</span>
            <span className="text-3xl font-black text-gray-900 tracking-tight">
              {formattedTotal}
            </span>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button
              label="Proceder al pago"
              icon="pi pi-lock"
              className="w-full bg-cyan-600 border-none rounded-2xl py-4 font-black text-lg shadow-xl shadow-cyan-100 hover:bg-black transition-all transform active:scale-[0.98]"
              onClick={handleCheckout}
            />
            <Button
              label="Vaciar Carrito"
              icon="pi pi-trash"
              text
              severity="secondary"
              className="w-full text-gray-400 font-bold text-sm hover:text-red-500 transition-colors py-2"
              onClick={onClearCart}
            />
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default CartDrawer;
