import React, { useState, useEffect, useId } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const DEBOUNCE_TIME = 300;

/**
 * SearchBar component with internal debounce logic.
 * Note: Does not sync with external props after mount to avoid react-doctor warnings.
 * If you need to reset it, use a 'key' prop on this component from the parent.
 */
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const searchInputId = useId();

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <div className="w-full">
      <label htmlFor={searchInputId} className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
        Buscar
      </label>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search text-gray-400"> </InputIcon>
        <InputText 
          id={searchInputId}
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Buscar productos por nombre..." 
          className="w-full py-4 px-12 border-gray-100 dark:border-slate-800 rounded-2xl focus:shadow-none transition-all border bg-gray-50/50 dark:bg-slate-800/50 dark:text-white"
        />
      </IconField>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;
