import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

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
      className="w-full sm:w-[480px]"
      baseZIndex={1000}
      transitionTime={300}
      dismissableMask={true}
      header={
        <div className="flex items-center gap-3 w-full pt-4 pb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <i className="pi pi-shopping-cart text-white text-lg"></i>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
              Mi Carrito
            </h2>
            {cart.length > 0 && (
              <p className="text-xs font-medium text-gray-500">
                {getCartItemsCount()} {getCartItemsCount() === 1 ? 'producto' : 'productos'}
              </p>
            )}
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full bg-gradient-to-b from-gray-50/50 to-white">
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-16">
            {/* Animated floating cart icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-100 flex items-center justify-center animate-pulse">
                <i className="pi pi-shopping-cart text-teal-400 text-6xl"></i>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-200 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute top-4 -left-2 w-2 h-2 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>

            <h3 className="text-2xl font-extrabold text-gray-800 mb-3 leading-tight">
              ¡Tu carrito está vacío!
            </h3>
            <p className="text-gray-500 mb-8 max-w-[260px] leading-relaxed text-sm">
              Explora nuestra colección y agrega tus productos favoritos para comenzar.
            </p>
            <Button
              label="Explorar productos"
              icon="pi pi-arrow-left"
              onClick={onHide}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 border-none rounded-xl px-10 py-3 font-bold text-base shadow-lg shadow-teal-500/25 transition-all duration-300"
            />
          </div>
        ) : (
          <>
            {/* Decorative top bar - reduced */}
            <div className="h-[2px] bg-gradient-to-r from-cyan-400/40 via-teal-400/40 to-cyan-400/40 rounded-full mx-4 mb-5"></div>

            {/* Cart items list - more separation */}
            <div className="flex-1 overflow-y-auto space-y-4 px-1 pr-2 pb-4">
              {cart.map((item, index) => (
                <div 
                  key={item.id} 
                  className="animate-[fadeIn_0.3s_ease-out]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CartItem
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                </div>
              ))}
            </div>

            {/* Cart summary with gradient background */}
            <div className="px-1 pb-4 pt-2">
              <div className="bg-gradient-to-t from-white via-white to-transparent rounded-2xl p-1">
                <Divider className="my-3 border-gray-200" />
                
                {/* Total highlight */}
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-4 mb-4 border border-cyan-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Total a pagar
                      </p>
                      <p className="text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                        {formattedTotal}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <i className="pi pi-wallet text-white text-2xl"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-2">
                  <Button
                    label="Proceder al pago"
                    icon="pi pi-credit-card"
                    className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 border-none rounded-xl py-3 font-bold text-base shadow-lg shadow-cyan-500/20 transition-all duration-300"
                    onClick={handleCheckout}
                  />
                  <Button
                    label="Vaciar carrito"
                    icon="pi pi-trash"
                    outlined
                    severity="danger"
                    className="w-full rounded-xl py-2.5 text-sm border-gray-200 hover:bg-red-50 transition-colors"
                    onClick={onClearCart}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Sidebar>
  );
};

export default CartDrawer;
