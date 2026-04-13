import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';

const EMPTY_ARRAY = [];

const ProductList = ({ products = EMPTY_ARRAY, loading = false, error = null, onAddToCart }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm p-6 flex flex-col h-full animate-pulse">
            <Skeleton width="100%" className="mb-6 aspect-square rounded-[1.8rem] dark:bg-slate-800"></Skeleton>
            <div className="flex justify-between items-start mb-6 gap-4">
              <Skeleton width="60%" height="2rem"></Skeleton>
              <Skeleton width="20%" height="2rem"></Skeleton>
            </div>
            <Skeleton width="80%" height="1rem" className="mb-2"></Skeleton>
            <Skeleton width="50%" height="1rem" className="mb-10"></Skeleton>
            <div className="mt-auto">
              <Skeleton width="100%" height="3.5rem" className="rounded-2xl"></Skeleton>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-red-100 dark:border-red-900/30 text-center shadow-sm max-w-2xl mx-auto">
        <i className="pi pi-exclamation-triangle text-red-500 text-5xl mb-6"></i>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Error de conexión</h2>
        <p className="text-gray-500 mb-8">{error}</p>
        <Button 
          label="Reintentar ahora" 
          icon="pi pi-refresh" 
          className="p-button-danger border-none rounded-2xl px-10 py-3 font-bold" 
          onClick={() => window.location.reload()} 
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 text-center shadow-sm max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="pi pi-search text-gray-300 text-4xl"></i>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">No hay resultados</h2>
        <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
          Prueba ajustando los filtros o buscando algo diferente en nuestro catálogo.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductList;
