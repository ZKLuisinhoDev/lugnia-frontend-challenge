import React from 'react';

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="p-8 bg-gray-50/50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-100/50 dark:hover:shadow-none group">
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
      <i className={`pi ${icon} text-white text-2xl`}></i>
    </div>
    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: 'pi-bolt',
      title: 'Compra rápida',
      description: 'Nuestra plataforma está optimizada para que encuentres y compres lo que necesitas en segundos.',
      color: 'bg-cyan-600'
    },
    {
      icon: 'pi-tags',
      title: 'Gran variedad',
      description: 'Desde tecnología de punta hasta artículos esenciales, curamos lo mejor de cada categoría.',
      color: 'bg-indigo-600'
    },
    {
      icon: 'pi-dollar',
      title: 'Precios competitivos',
      description: 'Calidad premium no tiene por qué significar precios inflados. Buscamos el mejor valor.',
      color: 'bg-emerald-600'
    },
    {
      icon: 'pi-sparkles',
      title: 'Experiencia fluida',
      description: 'Interfaz limpia y elegante diseñada para que disfrutes cada segundo navegando.',
      color: 'bg-amber-600'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-16 space-y-4">
          <h2 className="text-xs font-black text-cyan-600 uppercase tracking-[0.4em]">Beneficios Sumaq</h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
            Diseñado para una <br /> navegación <span className="text-cyan-600 italic">sin fricciones.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
