import React, { useState } from 'react';

const PriceRangeFilter = ({ onFilter }) => {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    const minVal = parseFloat(min);
    const maxVal = parseFloat(max);

    if (min && max && minVal > maxVal) {
      setError('Mínimo no puede ser mayor que Máximo');
      return;
    }

    setError('');
    onFilter(minVal || 0, maxVal || Infinity);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <span className="text-gray-400">-</span>
        <input
          type="number"
          placeholder="Max"
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
        <button
          onClick={handleApply}
          className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm whitespace-nowrap"
        >
          Aplicar
        </button>
      </div>
      {error && <p className="text-xs text-red-500 px-1">{error}</p>}
    </div>
  );
};

export default PriceRangeFilter;
