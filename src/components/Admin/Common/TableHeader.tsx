import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface TableHeaderProps {
  label: string;
  sortable?: boolean;
  onClick?: () => void;
  active?: boolean;
  align?: 'left' | 'right';
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  label,
  sortable = false,
  onClick,
  active = false,
  align = 'left',
  className
}) => {
  return (
    <th scope="col" className={`px-6 py-3 text-${align} ${className || ''}`}>
      {sortable ? (
        <button
          onClick={onClick}
          className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
        >
          <span>{label}</span>
          <ArrowUpDown className={`h-4 w-4 ${active ? 'text-orange-500' : ''}`} />
        </button>
      ) : (
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
      )}
    </th>
  );
};
