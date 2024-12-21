import React from 'react';
import { useStore } from '../../store/useStore';
import { apiProviders } from '../../data/apiProviders';

export const GlobalUsageControl: React.FC = () => {
  const { globalUsage, setGlobalUsage, selectedCategory } = useStore();

  const getDefaultMetric = () => {
    if (!selectedCategory) return null;
    const categoryApis = apiProviders.filter(api => api.category === selectedCategory);
    if (categoryApis.length === 0) return null;
    return categoryApis[0].inputMetric;
  };

  const metric = getDefaultMetric();

  if (!metric) return null;

  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-gray-700">
        Global {metric.label}:
      </label>
      <input
        type="range"
        min={metric.min}
        max={metric.max}
        step={metric.step}
        value={globalUsage ?? metric.defaultValue}
        onChange={(e) => setGlobalUsage(Number(e.target.value))}
        className="w-48"
      />
      <span className="text-sm text-gray-600 w-24">
        {(globalUsage ?? metric.defaultValue).toLocaleString()}
      </span>
      {globalUsage !== null && (
        <button
          onClick={() => setGlobalUsage(null)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset
        </button>
      )}
    </div>
  );
};