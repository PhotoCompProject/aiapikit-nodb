import React from 'react';
import { useStore } from '../../store/useStore';
import { apiProviders } from '../../data/apiProviders';

export const ProviderSelect: React.FC = () => {
  const { filters, setFilters } = useStore();
  const providers = Array.from(new Set(apiProviders.map(api => api.provider)));

  return (
    <select
      value={filters.provider || ''}
      onChange={(e) => setFilters({ provider: e.target.value || undefined })}
      className="block w-full rounded-lg border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors p-2"
    >
      <option value="">All Providers</option>
      {providers.map((provider) => (
        <option key={provider} value={provider}>
          {provider}
        </option>
      ))}
    </select>
  );
};
