import React from 'react';

const LandingFooter = () => {
  return (
    <footer id="contact" className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
              Sumaq<span className="text-cyan-600">.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm leading-relaxed mb-6">
              Inspirados en la belleza y la calidad, curamos productos que transforman tu día a día. Calidad artesanal en un mundo digital.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-600 transition-all border border-gray-100 dark:border-slate-700">
                <i className="pi pi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-600 transition-all border border-gray-100 dark:border-slate-700">
                <i className="pi pi-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-600 transition-all border border-gray-100 dark:border-slate-700">
                <i className="pi pi-facebook"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6">Tienda</h4>
            <ul className="space-y-4">
              <li><a href="/" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">Todos los productos</a></li>
              <li><a href="/" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">Categorías</a></li>
              <li><a href="/" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">Ofertas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-6">Soporte</h4>
            <ul className="space-y-4">
              <li><a href="/faq" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">FAQ</a></li>
              <li><a href="/envios" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">Envíos</a></li>
              <li><a href="/privacidad" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-cyan-600 transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            © 2026 Sumaq Store . Hecho con pasión en Pasto.
          </p>
          <div className="flex gap-6">
             <span className="text-[10px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-widest">Visa</span>
             <span className="text-[10px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-widest">Mastercard</span>
             <span className="text-[10px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-widest">Paypal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
