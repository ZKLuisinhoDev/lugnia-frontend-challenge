import React from 'react';
import ProductList from './components/products/ProductList';
import { useProducts } from './hooks/useProducts';

function App() {
  // Usamos el custom hook, pidiendo los 12 primeros productos (página 1)
  const { products, loading, error } = useProducts(1, 12);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Catálogo de Productos
          </h1>
          <p className="text-gray-500">
            Mostrando resultados falsos para pruebas.
          </p>
        </div>
        
        <ProductList 
          products={products} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
}

export default App;
