import React from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FilterOption {
  id: string;
  name: string;
}

interface FilterProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const Filter: React.FC<FilterProps> = ({
  label,
  options,
  value,
  onChange,
  onClear
}) => {
  const selectedOption = options.find(opt => opt.id === value);

  return (
    <div className="relative">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg bg-gray-50 border border-gray-200 text-gray-900 pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
        >
          <option value="">{label}</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
      </div>
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute -top-3 -right-3 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
        >
          <X className="h-3 w-3 text-gray-500" />
        </button>
      )}
    </div>
  );
};
