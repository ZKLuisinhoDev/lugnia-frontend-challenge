import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown';

const EMPTY_OPTIONS = [];

const CategoryFilter = ({ categories = EMPTY_OPTIONS, onFilter, selectedValue }) => {
  const dropdownId = useId();
  
  const options = [
    { label: 'Todas las categorías', value: '' },
    ...(categories || []).map(cat => ({
      label: cat.title,
      value: cat.id
    }))
  ];

  return (
    <div className="w-full">
      <label htmlFor={dropdownId} className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
        Categoría
      </label>
      <Dropdown 
        id={dropdownId}
        value={selectedValue}
        options={options} 
        onChange={(e) => onFilter(e.value)} 
        placeholder="Seleccionar categoría" 
        className="w-full border-gray-100 rounded-2xl focus:shadow-none border h-[58px] items-center bg-gray-50/50"
        showClear
      />
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  onFilter: PropTypes.func.isRequired,
  selectedValue: PropTypes.string
};

export default CategoryFilter;
