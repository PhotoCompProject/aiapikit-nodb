import React from 'react';
import { X } from 'lucide-react';
import { GlobalUsageControl } from '../Controls/GlobalUsageControl';
import { FilterControls } from '../Filters/FilterControls';
import { SortControls } from '../Filters/SortControls';

interface MobileControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-gray-900 shadow-xl">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Controls</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-8">
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-400">Usage Controls</h3>
              <GlobalUsageControl />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-400">Filters</h3>
              <FilterControls />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-400">Sort</h3>
              <SortControls />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};