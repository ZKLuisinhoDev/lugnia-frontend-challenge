import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products = [], loading, error }) => {
  // Manejo de estado: Cargando (Muestra Skeleton)
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse">
            <div className="w-full aspect-[3/2] bg-gray-200"></div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="mt-auto flex items-center justify-between">
                <div className="h-7 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Manejo de estado: Error
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-8 rounded-xl border border-red-100 text-center shadow-sm">
        <svg className="w-12 h-12 mx-auto mb-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="font-semibold text-lg mb-1">¡Ups! Algo salió mal</p>
        <p className="text-red-500/80">{error}</p>
      </div>
    );
  }

  // Manejo de estado: Vacío
  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-50/50 p-12 rounded-xl text-center border text-gray-500 border-dashed border-gray-200">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <p className="text-xl font-medium text-gray-700">No se encontraron productos</p>
        <p className="mt-2 text-gray-500">Intenta buscar algo distinto o recarga la página.</p>
      </div>
    );
  }

  // Render principal de los productos
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          id={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
        />
      ))}
    </div>
  );
};

export default ProductList;
