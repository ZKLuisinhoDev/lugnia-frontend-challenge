import React, { useState, useId } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const PriceRangeFilter = ({ onFilter }) => {
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [error, setError] = useState('');
  
  const minId = useId();
  const maxId = useId();

  const handleApply = () => {
    if (min !== null && max !== null && min > max) {
      setError('Mínimo > Máximo');
      return;
    }

    setError('');
    onFilter(min || 0, max || Infinity);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1 ml-1">
        Precio
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <InputNumber 
            inputId={minId}
            value={min} 
            onValueChange={(e) => setMin(e.value)} 
            placeholder="Min" 
            mode="currency" 
            currency="USD" 
            locale="en-US"
            className="w-full"
            inputClassName="w-full border-gray-100 dark:border-slate-800 rounded-2xl p-4 border bg-gray-50/50 dark:bg-slate-800/50 dark:text-white"
            aria-label="Precio mínimo"
          />
        </div>
        <span className="text-gray-300 font-bold">/</span>
        <div className="flex-1">
          <InputNumber 
            inputId={maxId}
            value={max} 
            onValueChange={(e) => setMax(e.value)} 
            placeholder="Max" 
            mode="currency" 
            currency="USD" 
            locale="en-US"
            className="w-full"
            inputClassName="w-full border-gray-100 dark:border-slate-800 rounded-2xl p-4 border bg-gray-50/50 dark:bg-slate-800/50 dark:text-white"
            aria-label="Precio máximo"
          />
        </div>
        <Button 
          icon="pi pi-check" 
          onClick={handleApply}
          className="bg-cyan-600 border-none rounded-2xl px-6 h-[58px] shadow-lg shadow-cyan-100 dark:shadow-none hover:bg-black transition-all"
          aria-label="Aplicar filtro de precio"
        />
      </div>
      {error && (
        <Message 
          severity="error" 
          text={error} 
          className="justify-content-start w-full border-none bg-transparent text-xs p-0 mt-1" 
        />
      )}
    </div>
  );
};

PriceRangeFilter.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default PriceRangeFilter;
