import React from 'react';
import { Star } from 'lucide-react';

interface FeaturedToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const FeaturedToggle: React.FC<FeaturedToggleProps> = ({
  checked,
  onChange,
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500">
        <Star className={`absolute left-1.5 top-1 h-4 w-4 text-gray-400 transition-all ${checked ? 'text-white fill-current' : ''}`} />
      </div>
    </label>
  );
};
