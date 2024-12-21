import React from 'react';
import { Category } from '../../../types/admin';

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  categories: Category[];
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  onChange,
  categories
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
    >
      <option value="">Select a category</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
