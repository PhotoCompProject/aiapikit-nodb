import React from 'react';
import { useStore } from '../../store/useStore';
import { apiProviders } from '../../data/apiProviders';

export const FilterControls: React.FC = () => {
  const { filters, setFilters } = useStore();
  const providers = Array.from(new Set(apiProviders.map(api => api.provider)));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Provider
        </label>
        <select
          value={filters.provider || ''}
          onChange={(e) => setFilters({ provider: e.target.value || undefined })}
          className="w-full bg-white/5 border border-white/10 rounded-lg text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Providers</option>
          {providers.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Pricing Model
        </label>
        <select
          value={filters.pricing || ''}
          onChange={(e) => setFilters({ pricing: e.target.value as any || undefined })}
          className="w-full bg-white/5 border border-white/10 rounded-lg text-gray-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Models</option>
          <option value="pay-per-use">Pay Per Use</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
    </div>
  );
};