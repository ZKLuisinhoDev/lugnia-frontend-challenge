import React from 'react';
import ProductCard from './ProductCard';
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';

const ProductList = ({ products = [], loading, error, onAddToCart }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col h-full animate-pulse">
            <Skeleton width="100%" height="200px" className="mb-4 rounded-xl"></Skeleton>
            <Skeleton width="40%" height="24px" className="mb-3 rounded"></Skeleton>
            <Skeleton width="80%" height="20px" className="mb-2 rounded"></Skeleton>
            <Skeleton width="60%" height="20px" className="mb-4 rounded"></Skeleton>
            <div className="mt-auto">
              <Skeleton width="50%" height="28px" className="mb-3 rounded"></Skeleton>
              <Skeleton width="100%" height="40px" className="rounded-xl"></Skeleton>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-red-200 text-center shadow-sm max-w-2xl mx-auto">
        <i className="pi pi-exclamation-triangle text-red-500 text-5xl mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error de conexión</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button 
          label="Reintentar" 
          icon="pi pi-refresh" 
          className="p-button-danger rounded-xl px-6 py-2" 
          onClick={() => window.location.reload()} 
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center shadow-sm max-w-2xl mx-auto">
        <i className="pi pi-search text-gray-300 text-5xl mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay resultados</h2>
        <p className="text-gray-600">Prueba ajustando los filtros o buscando algo diferente.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
