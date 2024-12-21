import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../../ui/Card';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  trend
}) => {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Icon className="w-5 h-5 text-primary-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`text-sm font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </Card>
  );
};