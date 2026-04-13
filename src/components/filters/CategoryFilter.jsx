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
      <label htmlFor={dropdownId} className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
        Categoría
      </label>
      <Dropdown 
        id={dropdownId}
        value={selectedValue}
        options={options} 
        onChange={(e) => onFilter(e.value)} 
        placeholder="Seleccionar categoría" 
        className="w-full border-gray-100 dark:border-slate-800 rounded-2xl focus:shadow-none border h-[58px] items-center bg-gray-50/50 dark:bg-slate-800/50 dark:text-white transition-all hover:border-cyan-500"
        showClear
        pt={{
          root: { className: 'overflow-hidden' },
          panel: { className: 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-2xl mt-2 overflow-hidden' },
          list: { className: 'py-2' },
          item: ({ context }) => ({
            className: `px-6 py-3 text-sm font-bold transition-all ${
              context.selected 
                ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:pl-8'
            }`
          }),
          header: { className: 'p-3 border-b border-gray-50 dark:border-slate-800' },
          filterContainer: { className: 'flex items-center' },
          filterInput: { className: 'py-2 px-3 border-none bg-gray-50 dark:bg-slate-800 rounded-xl text-xs' }
        }}
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
