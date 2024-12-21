import React from 'react';
import { useStore } from '../../store/useStore';
import { ApiCategory } from '../../types/api';

const categories: { value: ApiCategory; label: string; count?: number }[] = [
  { value: 'text-generation', label: 'Text Generation' },
  { value: 'image-generation', label: 'Image Generation' },
  { value: 'speech-to-text', label: 'Speech Recognition' },
];

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setCategory } = useStore();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap gap-3 max-w-full">
          <button
            onClick={() => setCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              !selectedCategory
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Categories
          </button>
          {categories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCategory(selectedCategory === value ? null : value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === value
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
