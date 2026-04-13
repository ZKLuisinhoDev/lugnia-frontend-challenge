import React from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';

const FilterBar = ({ categories = [], onSearch, onCategoryFilter, onPriceFilter }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-6 items-end">
      <div className="w-full lg:flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
        <SearchBar onSearch={onSearch} />
      </div>
      
      <div className="w-full lg:w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
        <CategoryFilter categories={categories} onFilter={onCategoryFilter} />
      </div>

      <div className="w-full lg:w-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rango de Precio</label>
        <PriceRangeFilter onFilter={onPriceFilter} />
      </div>
    </div>
  );
};

export default FilterBar;
