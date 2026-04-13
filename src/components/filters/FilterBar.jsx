import React from 'react';
import PriceRangeFilter from './PriceRangeFilter';

const FilterBar = ({ 
  categories = [], 
  searchValue,
  onSearch, 
  categoryValue,
  onCategoryFilter, 
  onPriceFilter 
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-gray-200">
      <div className="flex flex-col lg:flex-row items-stretch gap-3">
        {/* Search - occupies most space */}
        <div className="flex-1 lg:min-w-[320px]">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            <i className="pi pi-search mr-1 text-cyan-500"></i>
            Buscar
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchValue || ''}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Buscar productos por nombre..."
              className="w-full text-base py-2.5 px-4 pr-10 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all placeholder:text-gray-400"
            />
            <i className="pi pi-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="lg:w-[220px]">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            <i className="pi pi-tag mr-1 text-cyan-500"></i>
            Categoría
          </label>
          <select
            value={categoryValue || ''}
            onChange={(e) => onCategoryFilter(e.target.value ? Number(e.target.value) : '')}
            className="w-full text-base py-2.5 px-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all bg-white cursor-pointer"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="lg:w-[340px]">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            <i className="pi pi-dollar mr-1 text-cyan-500"></i>
            Precio
          </label>
          <PriceRangeFilter onFilter={onPriceFilter} />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
