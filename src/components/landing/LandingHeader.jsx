import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { useTheme } from '../../context/ThemeContext';

const LandingHeader = ({ onExplore }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
            Sumaq<span className="text-cyan-600">.</span>
          </h1>
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1 ml-0.5">
            Origen y calidad
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">Características</a>
          <a href="#featured" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">Colección</a>
          <a href="#contact" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">Contacto</a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            icon={isDark ? "pi pi-sun" : "pi pi-moon"} 
            onClick={toggleTheme} 
            rounded 
            text 
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 w-10 h-10 flex items-center justify-center transition-all"
            aria-label="Alternar modo oscuro"
          />
          <Button 
            label="Explorar Tienda" 
            onClick={onExplore}
            className="bg-cyan-600 hover:bg-black border-none rounded-xl px-6 py-2.5 font-black text-sm transition-all shadow-lg shadow-cyan-200 dark:shadow-none"
          />
        </div>
      </div>
    </header>
  );
};

LandingHeader.propTypes = {
  onExplore: PropTypes.func.isRequired
};

export default LandingHeader;
