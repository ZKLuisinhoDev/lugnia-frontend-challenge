import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import CTASection from '../components/landing/CTASection';
import LandingFooter from '../components/landing/LandingFooter';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

const LandingPage = ({ onEnterStore }) => {
  const { products } = useProducts(1, 4); // Get first 4 products for preview
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen">
      <LandingHeader onExplore={onEnterStore} />
      
      <main>
        <Hero onExplore={onEnterStore} />
        
        <Features />

        {/* Featured Products Preview */}
        <section id="featured" className="py-24 bg-gray-50/50 dark:bg-slate-900/30 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div className="space-y-4">
                <h2 className="text-xs font-black text-cyan-600 uppercase tracking-[0.4em]">Lo más buscado</h2>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                  Nuestra colección <span className="text-cyan-600 italic">destacada.</span>
                </h3>
              </div>
              <button 
                onClick={onEnterStore}
                className="text-gray-900 dark:text-white font-black flex items-center gap-2 group hover:text-cyan-600 transition-colors"
              >
                Ver catálogo completo
                <i className="pi pi-arrow-right transition-transform group-hover:translate-x-2"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                  />
                ))
              ) : (
                <div className="col-span-full h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
                </div>
              )}
            </div>
          </div>
        </section>

        <CTASection onExplore={onEnterStore} />
      </main>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
