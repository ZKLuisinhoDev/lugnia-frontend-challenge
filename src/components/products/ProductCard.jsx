import React from 'react';

const ProductCard = ({ id, name, price, category }) => {
  // Formatear precio a COP
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price || 0);

  // Manejador de error en la carga de la imagen
  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/300x200?text=Sin+Imagen';
  };

  const handleAddToCart = () => {
    console.log(`Agregar al carrito producto: ${name} (ID: ${id})`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full group">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/2]">
        <img
          src={`https://picsum.photos/id/${id}/300/200`}
          alt={`Imagen de ${name}`}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight mb-1" title={name}>
          {name}
        </h3>
        
        <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-semibold">
          {category?.name || 'Categoría no disponible'}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formattedPrice}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-blue-700 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
