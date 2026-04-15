import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';

/**
 * Main Application Shell.
 * Wraps the entire app in global providers and manages view routing.
 */
const App = () => {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('sumaq-view') || 'landing';
  });

  useEffect(() => {
    localStorage.setItem('sumaq-view', currentView);
  }, [currentView]);

  const navigateToShop = () => setCurrentView('shop');
  const navigateToLanding = () => setCurrentView('landing');

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app-container min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
          {currentView === 'landing' ? (
            <LandingPage onEnterStore={navigateToShop} />
          ) : (
            <ShopPage onBackToHome={navigateToLanding} />
          )}
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
