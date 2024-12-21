import React from 'react';
import { Sliders, Filter, SortAsc } from 'lucide-react';
import { GlobalUsageControl } from './GlobalUsageControl';
import { FilterControls } from '../Filters/FilterControls';
import { SortControls } from '../Filters/SortControls';

export const MobileControlBar: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-primary-300">
          <Sliders className="h-4 w-4" />
          <h2 className="text-sm font-medium">Usage Controls</h2>
        </div>
        <GlobalUsageControl />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-primary-300">
            <Filter className="h-4 w-4" />
            <h2 className="text-sm font-medium">Filters</h2>
          </div>
          <FilterControls />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-primary-300">
            <SortAsc className="h-4 w-4" />
            <h2 className="text-sm font-medium">Sort</h2>
          </div>
          <SortControls />
        </div>
      </div>
    </div>
  );
};