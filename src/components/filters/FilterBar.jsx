import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';

const FilterBar = ({ 
  categories, 
  onSearch, 
  onCategoryFilter, 
  onPriceFilter, 
  searchValue, 
  categoryValue,
  isIntegrated = false
}) => {
  return (
    <div className={`transition-all duration-500 ${
      isIntegrated 
        ? 'bg-transparent border-none p-0 mb-0 shadow-none' 
        : 'bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-100 dark:border-slate-800 mb-10'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-12 lg:col-span-5">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="md:col-span-6 lg:col-span-3">
          <CategoryFilter 
            categories={categories} 
            onFilter={onCategoryFilter} 
            selectedValue={categoryValue}
          />
        </div>
        <div className="md:col-span-6 lg:col-span-4">
          <PriceRangeFilter onFilter={onPriceFilter} />
        </div>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  onSearch: PropTypes.func.isRequired,
  onCategoryFilter: PropTypes.func.isRequired,
  onPriceFilter: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  categoryValue: PropTypes.string,
  isIntegrated: PropTypes.bool
};

export default FilterBar;
