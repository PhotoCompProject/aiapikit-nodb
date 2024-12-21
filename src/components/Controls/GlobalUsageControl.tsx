import React from 'react';
import { useStore } from '../../store/useStore';
import { apiProviders } from '../../data/apiProviders';
import { formatCompactNumber, parseCompactNumber } from '../../utils/numberFormat';

export const GlobalUsageControl: React.FC = () => {
  const { 
    globalUsage, 
    setGlobalUsage,
    globalOutputUsage,
    setGlobalOutputUsage,
    selectedCategory 
  } = useStore();

  const getDefaultMetric = () => {
    if (!selectedCategory) return null;
    const categoryApis = apiProviders.filter(api => api.category === selectedCategory);
    if (categoryApis.length === 0) return null;
    return categoryApis[0].inputMetric;
  };

  const metric = getDefaultMetric();
  if (!metric) return null;

  const isTextGeneration = selectedCategory === 'text-generation';

  return (
    <div className="space-y-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input {metric.label}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={metric.min}
            max={metric.max}
            step={metric.step}
            value={globalUsage ?? metric.defaultValue}
            onChange={(e) => setGlobalUsage(Number(e.target.value))}
            className="w-full accent-orange-500 
              [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2.6
              [&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-2.6
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5"
          />
          <div className="relative w-32">
            <input
              type="text"
              value={formatCompactNumber(globalUsage ?? metric.defaultValue)}
              onChange={(e) => {
                const parsedValue = parseCompactNumber(e.target.value);
                if (parsedValue !== null && parsedValue >= metric.min && parsedValue <= metric.max) {
                  setGlobalUsage(parsedValue);
                }
              }}
              className="w-full px-3 py-1 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>
        </div>
      </div>

      {isTextGeneration && (
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Output {metric.label}
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min={metric.min}
              max={metric.max}
              step={metric.step}
              value={globalOutputUsage ?? metric.outputDefaultValue ?? metric.defaultValue}
              onChange={(e) => setGlobalOutputUsage(Number(e.target.value))}
              className="w-full accent-orange-500 
                [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2.6
                [&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-2.6
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5"
            />
            <div className="relative w-32">
              <input
                type="text"
                value={formatCompactNumber(globalOutputUsage ?? metric.outputDefaultValue ?? metric.defaultValue)}
                onChange={(e) => {
                  const parsedValue = parseCompactNumber(e.target.value);
                  if (parsedValue !== null && parsedValue >= metric.min && parsedValue <= metric.max) {
                    setGlobalOutputUsage(parsedValue);
                  }
                }}
                className="w-full px-3 py-1 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
