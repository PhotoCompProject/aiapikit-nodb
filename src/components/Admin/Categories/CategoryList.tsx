import React from 'react';
import { Edit2, Trash2, Info } from 'lucide-react';
import { Category } from '../../../types/admin';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card key={category.id} className="bg-white border-gray-100 hover:border-orange-500/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(category)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDelete(category.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Slider Definitions</h4>
              <div className="space-y-2">
                {category.sliderDefinitions.map((slider, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{slider.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Output Definitions</h4>
              <div className="space-y-2">
                {category.outputDefinitions.map((output, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{output.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Price Detail Fields</h4>
              <div className="space-y-2">
                {category.priceDetailFields.map((field, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{field.name}</span>
                      <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                        {field.type}
                      </span>
                    </div>
                    <div className="flex items-start space-x-1 text-xs text-gray-500">
                      <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{field.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
