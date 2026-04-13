import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const CategoryFilter = ({ value, categories, onFilter }) => {
  const options = [
    { label: 'Todas las categorías', value: '' },
    ...categories.map(cat => ({
      label: cat.title,
      value: cat.id
    }))
  ];

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={(e) => onFilter(e.value)}
      placeholder="Seleccionar categoría"
      className="w-full"
      showClear
      panelClassName="text-base"
    />
  );
};

export default CategoryFilter;
