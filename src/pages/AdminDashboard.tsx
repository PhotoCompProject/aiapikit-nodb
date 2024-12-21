import React from 'react';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { StatsCard } from '../components/Admin/Dashboard/StatsCard';
import { RecentActivity } from '../components/Admin/Dashboard/RecentActivity';
import { Database, BarChart } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export const AdminDashboard: React.FC = () => {
  const { categories, providers } = useAdminStore();

  const stats = [
    {
      label: 'Total APIs',
      value: providers.length,
      icon: Database,
      trend: { value: 12, isPositive: true }
    },
    {
      label: 'Active Categories',
      value: categories.length,
      icon: BarChart,
      trend: { value: 8, isPositive: true }
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'provider_added',
      description: 'New API Provider Added: Claude 3',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'category_updated',
      description: 'Category Updated: Text Generation',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'provider_updated',
      description: 'Provider Updated: GPT-4',
      timestamp: '1 day ago'
    }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatsCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
            />
          ))}
        </div>

        <RecentActivity activities={recentActivities} />
      </div>
    </AdminLayout>
  );
};