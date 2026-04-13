import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products = [], loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse">
            <div className="w-full aspect-[4/3] bg-gray-100"></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="h-4 bg-gray-100 rounded-full w-2/3 mb-4"></div>
              <div className="h-4 bg-gray-100 rounded-full w-1/3 mb-8"></div>
              <div className="mt-auto flex items-center justify-between">
                <div className="h-8 bg-gray-100 rounded-lg w-24"></div>
                <div className="h-10 bg-gray-200 rounded-xl w-10"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-red-100 text-center shadow-xl shadow-red-50 max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Error de conexión</h2>
        <p className="text-gray-500 mb-8">{error}</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all">
          Reintentar ahora
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">No hay resultados</h2>
        <p className="text-gray-500">Prueba ajustando los filtros o buscando algo diferente.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          id={product.id}
          name={product.name}
          price={product.price}
          categoryName={product.categoryName}
        />
      ))}
    </div>
  );
};

export default ProductList;
