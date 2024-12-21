import React from 'react';
import { Search } from 'lucide-react';
import { AdminApiProvider } from '../../../types/admin';
import { Card } from '../../ui/Card';

interface ProviderSidebarProps {
  providers: AdminApiProvider[];
  selectedProvider: AdminApiProvider | null;
  onSelect: (provider: AdminApiProvider) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProviderSidebar: React.FC<ProviderSidebarProps> = ({
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
    <div className="w-64 border-r border-gray-200 h-full overflow-hidden flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search providers..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredProviders.map(provider => (
          <Card
            key={provider.id}
            interactive
            selected={selectedProvider?.id === provider.id}
            onClick={() => onSelect(provider)}
            className="p-3"
          >
            <div className="flex items-center space-x-3">
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{provider.name}</h3>
                <p className="text-xs text-gray-500">{provider.provider}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}