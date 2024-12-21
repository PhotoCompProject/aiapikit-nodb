import React from 'react';
import { useStore } from '../../store/useStore';
import { SortOption } from '../../types/filters';

export const SortControls: React.FC = () => {
  const { filters, setSortOption, hasActiveSliders } = useStore();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ];

  return (
    <div className="relative">
      <select
        value={filters.sortBy}
        onChange={(e) => setSortOption(e.target.value as SortOption)}
        disabled={hasActiveSliders}
        className={`w-full bg-white border border-gray-200 rounded-lg text-sm py-2 px-3 
          focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          ${hasActiveSliders ? 'opacity-50' : ''}`}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasActiveSliders && (
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
          Reset sliders to enable sorting
        </div>
      )}
    </div>
  );
};
