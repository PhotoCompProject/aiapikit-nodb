import React from 'react';
import { SortAsc, Filter, RotateCcw } from 'lucide-react';
import { GlobalUsageControl } from '../Controls/GlobalUsageControl';
import { SortControls } from '../Filters/SortControls';
import { ProviderSelect } from '../Filters/ProviderSelect';
import { useStore } from '../../store/useStore';

export const Sidebar: React.FC = () => {
  const { 
    hasActiveSliders,
    removeAllUsageOverrides,
    setGlobalUsage,
    setGlobalOutputUsage
  } = useStore();

  return (
    <aside className="hidden lg:block fixed top-[73px] bottom-0 w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Global Usage Controls */}
        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Global Usage Controls</h2>
          </div>
          <GlobalUsageControl />
        </section>

        {/* Provider Filter */}
        <section>
          <div className="mb-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">Provider</h2>
            </div>
          </div>
          <ProviderSelect />
        </section>

        {/* Sort Controls */}
        <section>
          <div className="mb-3">
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">Sort</h2>
            </div>
          </div>
          <div>
            <SortControls />
            {hasActiveSliders && (
              <div className="mt-8">
                <button
                  onClick={() => {
                    removeAllUsageOverrides();
                    setGlobalUsage(null);
                    setGlobalOutputUsage(null);
                  }}
                  className="flex items-center justify-center space-x-2 w-full px-3 py-2 text-sm text-orange-500 hover:text-orange-600 font-medium border border-orange-200 rounded-lg hover:bg-orange-50"
                  title="Reset all sliders"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset All Sliders</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
};
