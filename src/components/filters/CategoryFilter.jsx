import React from 'react';

const CategoryFilter = ({ categories, onFilter }) => {
  return (
    <div className="w-full">
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm appearance-none cursor-pointer"
        defaultValue=""
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
