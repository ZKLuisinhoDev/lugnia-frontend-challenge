import React from 'react';
import { Button } from 'primereact/button';

const Hero = ({ onExplore }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-cyan-100/30 dark:bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-100/20 dark:bg-purple-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col items-start space-y-8 animate-fadein">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/50">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400">Nueva Colección 2026</span>
          </div>

          <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9]">
            Descubre productos <span className="text-cyan-600">increíbles.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-lg leading-relaxed">
            Explora una selección curada de tecnología y estilo inspirada en el origen y la calidad artesanal. Compra fácil, rápido y sin complicaciones.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              label="Explorar productos" 
              icon="pi pi-arrow-right" 
              iconPos="right"
              onClick={onExplore}
              className="bg-black dark:bg-white text-white dark:text-gray-900 border-none rounded-2xl px-10 py-5 font-black text-lg transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
            />
            <Button 
              label="Ver demo" 
              icon="pi pi-play" 
              text
              className="text-gray-900 dark:text-white font-black hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl px-8 py-5"
            />
          </div>

          <div className="flex items-center gap-6 pt-8 border-t border-gray-100 dark:border-slate-800 w-full">
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">50k+</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Clientes</p>
            </div>
            <div className="w-px h-10 bg-gray-100 dark:border-slate-800"></div>
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">4.9/5</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rating</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fadein-up">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group">
            <img 
              src="/images/hero.png" 
              alt="Sumaq Showcase" 
              className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Floating Card Design Element */}
          <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-gray-50 dark:border-slate-800 hidden md:block animate-bounce-slow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                <i className="pi pi-shield text-cyan-600"></i>
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 dark:text-white">Pagar seguro</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">100% Garantizado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
