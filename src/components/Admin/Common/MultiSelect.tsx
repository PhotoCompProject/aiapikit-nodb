import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: { id: string; name: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Search...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (id: string) => {
    if (selectedValues.includes(id)) {
      onChange(selectedValues.filter(v => v !== id));
    } else {
      onChange([...selectedValues, id]);
    }
  };

  const removeValue = (id: string) => {
    onChange(selectedValues.filter(v => v !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedValues.map(value => {
              const option = options.find(o => o.id === value);
              return option ? (
                <div
                  key={value}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-sm"
                >
                  <span>{option.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValue(value);
                    }}
                    className="hover:text-orange-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <span className="text-gray-500">Select {label}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder={placeholder}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className={`px-4 py-2 cursor-pointer text-sm ${
                  selectedValues.includes(option.id)
                    ? 'bg-orange-50 text-orange-900'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSelect(option.id)}
              >
                {option.name}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
