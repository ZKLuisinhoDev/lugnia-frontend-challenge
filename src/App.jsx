import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import ProductList from './components/products/ProductList';
import FilterBar from './components/filters/FilterBar';
import CartIcon from './components/cart/CartIcon';
import CartDrawer from './components/cart/CartDrawer';
import Pagination from './components/ui/Pagination';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const ITEMS_PER_PAGE = 12;

function ShopContent() {
  const [page, setPage] = useState(1);
  const { products, loading, error, totalCount, filters, setFilter } = useProducts(page, ITEMS_PER_PAGE);
  const { categories } = useCategories();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const [cartVisible, setCartVisible] = useState(false);
  const toast = useRef(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.current.show({
      severity: 'success',
      summary: 'Agregado al carrito',
      detail: product.name,
      life: 2000
    });
  };

  const handlePageChange = (event) => {
    setPage(event.page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Toast ref={toast} position="top-right" />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Premium<span className="text-cyan-600">Store</span>
            </h1>
            <p className="text-sm text-gray-500">
              Colección exclusiva de productos
            </p>
          </div>
          
          <CartIcon 
            itemsCount={getCartItemsCount()} 
            onClick={() => setCartVisible(true)} 
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <section className="mb-8">
          <FilterBar
            categories={categories}
            searchValue={filters.search}
            onSearch={(value) => {
              setFilter('search', value);
              setPage(1);
            }}
            categoryValue={filters.category}
            onCategoryFilter={(value) => {
              setFilter('category', value);
              setPage(1);
            }}
            onPriceFilter={(min, max) => {
              setFilter('priceMin', min);
              setFilter('priceMax', max);
              setPage(1);
            }}
          />
        </section>

        {/* Products count */}
        {!loading && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Mostrando <span className="font-bold text-gray-900">{products.length}</span> de{' '}
              <span className="font-bold text-gray-900">{totalCount}</span> productos
              {filters.search || filters.category || filters.priceMin > 0 || filters.priceMax < Infinity ? ' (filtrados)' : ''}
            </p>
          </div>
        )}

        {/* Product List */}
        <ProductList
          products={products}
          loading={loading}
          error={error}
          onAddToCart={handleAddToCart}
        />

        {/* Pagination */}
        {!loading && totalCount > ITEMS_PER_PAGE && (
          <Pagination
            totalRecords={totalCount}
            rowsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            first={(page - 1) * ITEMS_PER_PAGE}
          />
        )}
      </main>

      {/* Cart Drawer */}
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
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  );
}

export default App;
