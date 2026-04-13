import React from 'react';
import { Button } from 'primereact/button';

const CTASection = ({ onExplore }) => {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="bg-cyan-600 rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center space-y-8 relative overflow-hidden shadow-2xl shadow-cyan-200 dark:shadow-none">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight relative z-10 max-w-3xl">
            ¿Listo para llevar tu experiencia al siguiente nivel?
          </h2>
          
          <p className="text-cyan-100 text-lg md:text-xl font-medium max-w-xl relative z-10">
            Únete a miles de clientes que ya disfrutan de nuestra selección exclusiva.
          </p>

          <Button 
            label="Empieza a comprar ahora" 
            icon="pi pi-shopping-bag"
            onClick={onExplore}
            className="bg-white text-cyan-600 border-none rounded-2xl px-12 py-5 font-black text-xl hover:bg-black hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-900/20 relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
