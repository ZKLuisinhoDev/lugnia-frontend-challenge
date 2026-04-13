import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const SearchBar = ({ value, onSearch }) => {
  const [query, setQuery] = useState(value || '');

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <IconField iconPosition="left">
      <InputIcon className="pi pi-search text-gray-400"> </InputIcon>
      <InputText
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos por nombre..."
        className="w-full text-base py-2.5 px-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all placeholder:text-gray-400"
      />
    </IconField>
  );
};

export default SearchBar;
