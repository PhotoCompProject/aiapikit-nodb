import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ComparePanel: React.FC = () => {
  const { compareList, removeFromCompare } = useStore();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Compare APIs ({compareList.length}/3)
          </h3>
          <div className="flex space-x-4">
            {compareList.map((api) => (
              <div
                key={api.id}
                className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md"
              >
                <span>{api.name}</span>
                <button
                  onClick={() => removeFromCompare(api.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};