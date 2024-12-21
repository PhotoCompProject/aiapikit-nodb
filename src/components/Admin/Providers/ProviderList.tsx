import React from 'react';
import { Edit2, Trash2, Info, ExternalLink } from 'lucide-react';
import { ApiProvider, Category } from '../../../types/admin';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

interface ProviderListProps {
  providers: ApiProvider[];
  categories: Category[];
  onEdit: (provider: ApiProvider) => void;
  onDelete: (id: string) => void;
}

export const ProviderList: React.FC<ProviderListProps> = ({
  providers,
  categories,
  onEdit,
  onDelete,
}) => {
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown Category';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <Card key={provider.id} className="bg-white border-gray-100 hover:border-orange-500/20">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={provider.logo.value} 
                alt={provider.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {provider.name}
                </h3>
                <p className="text-sm text-gray-500">{provider.provider}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(provider)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDelete(provider.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Category</h4>
              <p className="text-sm text-gray-600">{getCategoryName(provider.category)}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
              <p className="text-sm text-gray-600">{provider.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sliders</h4>
              <div className="space-y-2">
                {provider.sliders.map((slider, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{slider.name}</span>
                    <span className="text-xs text-gray-500">
                      {slider.minValue} - {slider.maxValue} (Step: {slider.step})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Outputs</h4>
              <div className="space-y-2">
                {provider.outputs.map((output, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{output.name}</span>
                      <span className="text-sm text-gray-600">
                        ${output.costPerUnit.toFixed(4)} per unit
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <div>Monthly: {output.monthlyCalculation}</div>
                      <div>Yearly: {output.yearlyCalculation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Price Details</h4>
              <div className="space-y-2">
                {provider.priceDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{detail.name}</span>
                    <span className="text-sm text-gray-600">
                      {typeof detail.value === 'boolean'
                        ? detail.value ? 'Yes' : 'No'
                        : detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {provider.customFields && provider.customFields.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Fields</h4>
                <div className="space-y-2">
                  {provider.customFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{field.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{field.value}</span>
                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                          {field.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {provider.documentationUrl && (
              <a
                href={provider.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-orange-500 hover:text-orange-600"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Documentation
              </a>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
