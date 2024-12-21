import React from 'react';
import { LucideIcon } from 'lucide-react';
import { styles } from '../../../styles/theme';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: 'orange' | 'blue' | 'green' | 'purple';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  color = 'orange'
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-100'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          border: 'border-green-100'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          border: 'border-purple-100'
        };
      default:
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-600',
          border: 'border-orange-100'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`${styles.card.base} p-6 border-l-4 ${colors.border}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl ${colors.bg}`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
