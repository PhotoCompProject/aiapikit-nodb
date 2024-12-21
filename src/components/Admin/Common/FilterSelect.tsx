import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, XCircle } from 'lucide-react';

interface FilterOption {
  id: string;
  name: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
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
      <div
        className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-4 py-2.5">
          {selectedValues.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedValues.map(value => {
                const option = options.find(o => o.id === value);
                return option ? (
                  <div
                    key={value}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-800 rounded-md text-sm"
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
            <span className="text-xs text-gray-400">{label}</span>
          )}
        </div>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder={placeholder}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className={`px-4 py-2 cursor-pointer text-xs ${
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
              <div className="px-4 py-2 text-xs text-gray-400">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
