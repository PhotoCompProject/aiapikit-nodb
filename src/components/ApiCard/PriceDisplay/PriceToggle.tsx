import React from 'react';
import { formatCompactNumber } from '../../../utils/numberFormat';

interface PriceToggleProps {
  viewMode: 'monthly' | 'yearly';
  onToggle: (mode: 'monthly' | 'yearly') => void;
  monthlyPrice: number;
  yearlyPrice: number;
}

export const PriceToggle: React.FC<PriceToggleProps> = ({
  viewMode,
  onToggle,
  monthlyPrice,
  yearlyPrice,
}) => {
  return (
    <div className="flex border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        onClick={() => onToggle('monthly')}
        className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors rounded-tl-lg ${
          viewMode === 'monthly'
            ? 'bg-white text-gray-900 border-r border-gray-200 shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        Monthly (${formatCompactNumber(monthlyPrice)})
      </button>
      <button
        onClick={() => onToggle('yearly')}
        className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors rounded-tr-lg ${
          viewMode === 'yearly'
            ? 'bg-white text-gray-900 border-l border-gray-200 shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        Yearly (${formatCompactNumber(yearlyPrice)})
      </button>
    </div>
  );
};
