import React, { useState, Suspense, lazy, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { API_CONFIG } from '../constants/api';

import ProductList from '../components/products/ProductList';
import FilterBar from '../components/filters/FilterBar';
import CartIcon from '../components/cart/CartIcon';
import Pagination from '../components/ui/Pagination';

const CartDrawer = lazy(() => import('../components/cart/CartDrawer'));

const ShopPage = ({ onBackToHome }) => {
  const [currentPage, setCurrentPage] = useState(API_CONFIG.DEFAULT_PAGE);
  const { products, loading, error, totalCount, filters, setFilter } = useProducts(currentPage, API_CONFIG.DEFAULT_LIMIT);
  const { categories } = useCategories();
  const { addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount, cart } = useCart();
  const { isDark, toggleTheme, isSticky, toggleSticky } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toastRef = useRef(null);

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    toastRef.current?.show({
      severity: 'success',
      summary: 'Agregado',
      detail: product.name,
      life: 2000
    });
  }, [addToCart]);

  const handlePageChange = (event) => {
    setCurrentPage(event.page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value) => {
    setFilter('search', value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (value) => {
    setFilter('category', value);
    setCurrentPage(1);
  };

  const handlePriceFilter = (min, max) => {
    setFilter('priceMin', min);
    setFilter('priceMax', max);
    setCurrentPage(1);
  };

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 transition-colors duration-500 font-sans">
      <Toast ref={toastRef} position="top-right" />
      
      <div className={`${isSticky ? 'sticky top-0 z-40' : 'relative z-40'}`}>
        <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button onClick={onBackToHome} className="flex flex-col text-left group">
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter group-hover:text-cyan-600 transition-colors">
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
                className={`w-9 h-9 flex items-center justify-center transition-all ${isSticky ? 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20 rotate-45' : 'text-gray-400'}`}
              />
              <Button 
                icon={isDark ? "pi pi-sun" : "pi pi-moon"} 
                onClick={toggleTheme} 
                rounded 
                text 
                className="text-gray-500 dark:text-gray-400 w-9 h-9 flex items-center justify-center"
              />
              <CartIcon 
                itemsCount={getCartItemsCount()} 
                onClick={handleOpenCart} 
              />
            </div>
          </div>
        </header>

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!loading && !error && (
          <div className="mb-8 flex items-center justify-between px-2">
            <h2 className="text-gray-500 font-bold text-sm uppercase tracking-tight">
              Colección completa <span className="text-gray-900 dark:text-white font-black">{totalCount} productos</span>
            </h2>
            <button onClick={onBackToHome} className="text-xs font-bold text-cyan-600 hover:text-black transition-colors">
              Volver al inicio
            </button>
          </div>
        )}

        <div className="min-h-[400px]">
          <ProductList products={products} loading={loading} error={error} onAddToCart={handleAddToCart} />
        </div>

        {!loading && !error && totalCount > API_CONFIG.DEFAULT_LIMIT && (
          <div className="mt-20">
            <Pagination
              totalRecords={totalCount}
              rowsPerPage={API_CONFIG.DEFAULT_LIMIT}
              onPageChange={handlePageChange}
              first={(currentPage - 1) * API_CONFIG.DEFAULT_LIMIT}
            />
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <CartDrawer
          visible={isCartOpen}
          onHide={handleCloseCart}
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
};

ShopPage.propTypes = {
  onBackToHome: PropTypes.func.isRequired
};

export default ShopPage;
