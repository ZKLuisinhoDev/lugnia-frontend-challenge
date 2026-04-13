import React from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const CartSummary = ({ total, itemsCount, onClearCart, onCheckout }) => {
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(total);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Resumen del Carrito
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center text-gray-600">
          <span>Productos:</span>
          <span className="font-medium">{itemsCount} {itemsCount === 1 ? 'artículo' : 'artículos'}</span>
        </div>
        
        <Divider className="my-2" />
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-cyan-600">{formattedTotal}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          label="Proceder al pago"
          icon="pi pi-credit-card"
          className="w-full bg-cyan-600 hover:bg-cyan-700 border-none rounded-xl py-2.5 font-semibold mb-2"
          onClick={onCheckout}
        />
        <Button
          label="Vaciar carrito"
          icon="pi pi-trash"
          outlined
          severity="danger"
          className="w-full rounded-xl py-2.5"
          onClick={onClearCart}
          disabled={itemsCount === 0}
        />
      </div>
    </div>
  );
};

export default CartSummary;
