import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { AdminApiProvider } from '../../types/admin';

interface ApiProviderListProps {
  providers: AdminApiProvider[];
  onEdit: (provider: AdminApiProvider) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export const ApiProviderList: React.FC<ApiProviderListProps> = ({
  providers,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">API Providers</h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Provider</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-surface-800/50 backdrop-blur-sm rounded-lg border border-surface-700/50 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-white">{provider.name}</h3>
                  <p className="text-sm text-gray-400">{provider.provider}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(provider)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(provider.id)}
                  className="p-1 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-400">
                <span className="inline-block px-2 py-1 rounded-full bg-surface-700/50 text-xs">
                  {provider.category}
                </span>
                <span className="mx-2">•</span>
                <span className="inline-block px-2 py-1 rounded-full bg-surface-700/50 text-xs">
                  {provider.pricing}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <h4 className="text-sm font-medium text-gray-300">Sliders</h4>
                <p className="text-sm text-gray-400">{provider.sliders.length} configured</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">Outputs</h4>
                <p className="text-sm text-gray-400">{provider.outputs.length} configured</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};