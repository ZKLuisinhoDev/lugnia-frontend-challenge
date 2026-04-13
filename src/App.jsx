import React from 'react';
import ProductList from './components/products/ProductList';
import FilterBar from './components/filters/FilterBar';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';

function App() {
  const { products, loading, error } = useProducts(1, 12);
  const { categories } = useCategories();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Premium<span className="text-blue-600">Store</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explora nuestra colección exclusiva de productos con diseño minimalista y calidad excepcional.
          </p>
        </header>
        
        <div className="mb-12">
          <FilterBar 
            categories={categories}
            onSearch={(q) => console.log('Buscando:', q)}
            onCategoryFilter={(c) => console.log('Categoría:', c)}
            onPriceFilter={(min, max) => console.log('Rango:', min, max)}
          />
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
