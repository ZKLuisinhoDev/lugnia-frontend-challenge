import React, { useState, Suspense, lazy, useCallback, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { CartProvider, useCart } from './context/CartContext';
import { useTheme } from './context/ThemeContext';
import ProductList from './components/products/ProductList';
import FilterBar from './components/filters/FilterBar';
import CartIcon from './components/cart/CartIcon';
import Pagination from './components/ui/Pagination';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';
import { API_CONFIG } from './constants/api';

// Loading CartDrawer lazily for better initial performance
const CartDrawer = lazy(() => import('./components/cart/CartDrawer'));

/**
 * Main shop content component to manage state and layout.
 */
function ShopContent() {
  const [page, setPage] = useState(API_CONFIG.DEFAULT_PAGE);
  const { products, loading, error, totalCount, filters, setFilter } = useProducts(page, API_CONFIG.DEFAULT_LIMIT);
  const { categories } = useCategories();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [cartVisible, setCartVisible] = useState(false);
  const toast = useRef(null);

  // Memoized handlers to prevent unnecessary re-renders in children
  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    toast.current?.show({
      severity: 'success',
      summary: 'Agregado',
      detail: product.name,
      life: 2000
    });
  }, [addToCart]);

  const handlePageChange = useCallback((event) => {
    setPage(event.page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((value) => {
    setFilter('search', value);
    setPage(1);
  }, [setFilter]);

  const handleCategoryFilter = useCallback((value) => {
    setFilter('category', value);
    setPage(1);
  }, [setFilter]);

  const handlePriceFilter = useCallback((min, max) => {
    setFilter('priceMin', min);
    setFilter('priceMax', max);
    setPage(1);
  }, [setFilter]);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 transition-colors duration-500 font-sans">
      <Toast ref={toast} position="top-right" />
      
      {/* Header Section */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-40 shadow-sm px-4 md:px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
              Sumaq<span className="text-cyan-600">.</span>
            </h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1 ml-0.5">
              Origen y calidad
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              icon={isDark ? "pi pi-sun" : "pi pi-moon"} 
              onClick={toggleTheme} 
              rounded 
              text 
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 p-0 w-10 h-10 flex items-center justify-center transition-all"
              aria-label="Alternar modo oscuro"
            />
            <CartIcon 
              itemsCount={getCartItemsCount()} 
              onClick={() => setCartVisible(true)} 
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Filters and Search Container */}
        <section className="mb-2">
          <FilterBar
            categories={categories}
            searchValue={filters.search}
            onSearch={handleSearch}
            categoryValue={filters.category}
            onCategoryFilter={handleCategoryFilter}
            onPriceFilter={handlePriceFilter}
          />
        </section>

        {/* Results Metadata */}
        {!loading && !error && (
          <div className="mb-8 flex items-center justify-between px-2">
            <h2 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-tight">
              Colección completa <span className="text-gray-300 dark:text-gray-700 mx-2">/</span> 
              <span className="text-gray-900 dark:text-white font-black">{totalCount} productos encontrados</span>
            </h2>
          </div>
        )}

        {/* Product Grid System */}
        <div className="min-h-[400px]">
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Pagination Controls */}
        {!loading && !error && totalCount > API_CONFIG.DEFAULT_LIMIT && (
          <div className="mt-20">
            <Pagination
              totalRecords={totalCount}
              rowsPerPage={API_CONFIG.DEFAULT_LIMIT}
              onPageChange={handlePageChange}
              first={(page - 1) * API_CONFIG.DEFAULT_LIMIT}
            />
          </div>
        )}
      </main>

      {/* Lazy Loaded Cart Overlay */}
      <Suspense fallback={null}>
        <CartDrawer
          visible={cartVisible}
          onHide={() => setCartVisible(false)}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClearCart={clearCart}
          getCartTotal={getCartTotal}
          getCartItemsCount={getCartItemsCount}
        />
      </Suspense>
    </div>
  );
}

/**
 * Root App component with global providers and ErrorBoundary.
 */
function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <ShopContent />
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
