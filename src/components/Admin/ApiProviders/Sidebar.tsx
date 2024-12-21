import React from 'react';
import { Search } from 'lucide-react';
import { ApiProvider } from '../../../types/admin';

interface SidebarProps {
  providers: ApiProvider[];
  selectedProvider: ApiProvider | null;
  onSelect: (provider: ApiProvider) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  providers,
  selectedProvider,
  onSelect,
  searchQuery,
  onSearchChange,
}) => {
  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-surface-800 border-r border-surface-700 p-4">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search providers..."
            className="w-full pl-8 pr-4 py-2 bg-surface-700/50 border border-surface-600 rounded-lg text-white placeholder-gray-400"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        {filteredProviders.map(provider => (
          <button
            key={provider.id}
            onClick={() => onSelect(provider)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedProvider?.id === provider.id
                ? 'bg-primary-600/20 text-white'
                : 'text-gray-300 hover:bg-surface-700/50'
            }`}
          >
            <div className="font-medium">{provider.name}</div>
            <div className="text-sm text-gray-400">{provider.provider}</div>
          </button>
        ))}
      </div>
    </div>
  );
};