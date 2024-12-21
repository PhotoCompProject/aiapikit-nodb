import React from 'react';
import { CategoryFilter } from './CategoryFilter';
import { ProviderSelect } from './ProviderSelect';
import { SortControls } from './SortControls';

export const FilterToolbar: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CategoryFilter />
        <ProviderSelect />
        <SortControls />
      </div>
    </div>
  );
};
