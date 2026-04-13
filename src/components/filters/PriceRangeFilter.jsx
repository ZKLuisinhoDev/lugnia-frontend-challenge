import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

const PriceRangeFilter = ({ onFilter }) => {
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const handleApply = () => {
    onFilter(min || 0, max || Infinity);
  };

  const handleClear = () => {
    setMin(null);
    setMax(null);
    onFilter(0, Infinity);
  };

  return (
    <div className="flex items-center gap-2">
      <InputNumber
        value={min}
        onValueChange={(e) => setMin(e.value)}
        placeholder="$0"
        mode="currency"
        currency="USD"
        locale="en-US"
        className="w-full"
        inputClassName="w-full text-sm py-1.5 px-2 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-all"
        useGrouping={false}
        maxFractionDigits={2}
      />
      <InputNumber
        value={max}
        onValueChange={(e) => setMax(e.value)}
        placeholder="$0"
        mode="currency"
        currency="USD"
        locale="en-US"
        className="w-full"
        inputClassName="w-full text-sm py-1.5 px-2 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-all"
        useGrouping={false}
        maxFractionDigits={2}
      />
      <Button
        icon="pi pi-check"
        tooltip="Aplicar"
        tooltipOptions={{ position: 'top' }}
        size="small"
        onClick={handleApply}
        className="bg-cyan-600 hover:bg-cyan-700 border-none rounded-lg h-[38px] w-[38px] flex-shrink-0 transition-colors"
      />
      {(min !== null || max !== null) && (
        <Button
          icon="pi pi-times"
          tooltip="Limpiar"
          tooltipOptions={{ position: 'top' }}
          size="small"
          outlined
          severity="secondary"
          onClick={handleClear}
          className="h-[38px] w-[38px] flex-shrink-0 rounded-lg transition-colors"
        />
      )}
    </div>
  );
};

export default PriceRangeFilter;
