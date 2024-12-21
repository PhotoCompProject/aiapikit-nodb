import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';

interface ApiSelectProps {
  value: string;
  onChange: (value: string) => void;
  onAddNew: () => void;
  apis: string[];
}

export const ApiSelect: React.FC<ApiSelectProps> = ({
  value,
  onChange,
  onAddNew,
  apis
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

  const filteredApis = apis.filter(api =>
    api.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (api: string) => {
    onChange(api);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1" ref={dropdownRef}>
        <div
          className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value || 'Select API'}</span>
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
                  placeholder="Search APIs..."
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredApis.map((api) => (
                <div
                  key={api}
                  className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-sm"
                  onClick={() => handleSelect(api)}
                >
                  {api}
                </div>
              ))}
              {filteredApis.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No APIs found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={onAddNew}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
