import React, { useState, Suspense, lazy, useCallback, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { CartProvider, useCart } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProductList from './components/products/ProductList';
import FilterBar from './components/filters/FilterBar';
import CartIcon from './components/cart/CartIcon';
import Pagination from './components/ui/Pagination';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LandingPage from './pages/LandingPage';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';
import { API_CONFIG } from './constants/api';

// Loading CartDrawer lazily for better initial performance
const CartDrawer = lazy(() => import('./components/cart/CartDrawer'));

/**
 * Main shop content component to manage state and layout.
 */
function ShopContent() {
  const [view, setView] = useState(() => {
    return localStorage.getItem('last-view') || 'landing';
  });
  const [page, setPage] = useState(API_CONFIG.DEFAULT_PAGE);
  const { products, loading, error, totalCount, filters, setFilter } = useProducts(page, API_CONFIG.DEFAULT_LIMIT);
  const { categories } = useCategories();
  const { addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount, cart } = useCart();
  const { isDark, toggleTheme, isSticky, toggleSticky } = useTheme();
  const [cartVisible, setCartVisible] = useState(false);
  const toast = useRef(null);

  // Navigation handlers
  const handleEnterStore = useCallback(() => {
    setView('shop');
    localStorage.setItem('last-view', 'shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = useCallback(() => {
    setView('landing');
    localStorage.setItem('last-view', 'landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Shop handlers
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

  if (view === 'landing') {
    return <LandingPage onEnterStore={handleEnterStore} />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 transition-colors duration-500 font-sans">
      <Toast ref={toast} position="top-right" />
      
      {/* Dynamic Navigation & Filters Bar */}
      <div className={`${isSticky ? 'sticky top-0 z-40' : 'relative z-40'}`}>
        <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button onClick={handleBackToHome} className="flex flex-col text-left group">
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter leading-none group-hover:text-cyan-600 transition-colors">
                Sumaq<span className="text-cyan-600">.</span>
              </h1>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1 ml-0.5">
                Origen y calidad
              </p>
            </button>
            
            <div className="flex items-center gap-2 md:gap-4">
              <Button 
                icon="pi pi-thumbtack" 
                onClick={toggleSticky} 
                rounded 
                text 
                className={`w-9 h-9 flex items-center justify-center transition-all ${isSticky ? 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20 rotate-45' : 'text-gray-400 dark:text-gray-600'}`}
                aria-label="Alternar encabezado fijo"
              />
              <Button 
                icon={isDark ? "pi pi-sun" : "pi pi-moon"} 
                onClick={toggleTheme} 
                rounded 
                text 
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 p-0 w-9 h-9 flex items-center justify-center transition-all"
                aria-label="Alternar modo oscuro"
              />
              <CartIcon 
                itemsCount={getCartItemsCount()} 
                onClick={() => setCartVisible(true)} 
              />
            </div>
          </div>
        </header>

        {/* Filters integrated into the sticky area */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <FilterBar
              categories={categories}
              searchValue={filters.search}
              onSearch={handleSearch}
              categoryValue={filters.category}
              onCategoryFilter={handleCategoryFilter}
              onPriceFilter={handlePriceFilter}
              isIntegrated
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!loading && !error && (
          <div className="mb-8 flex items-center justify-between px-2">
            <h2 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-tight">
              Colección completa <span className="text-gray-300 dark:text-gray-700 mx-2">/</span> 
              <span className="text-gray-900 dark:text-white font-black">{totalCount} productos</span>
            </h2>
            <button 
              onClick={handleBackToHome}
              className="text-xs font-bold text-cyan-600 hover:text-black dark:hover:text-white transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        )}

        <div className="min-h-[400px]">
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
          />
        </div>

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

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CartProvider>
          <ShopContent />
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
