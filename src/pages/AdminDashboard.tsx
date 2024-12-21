import React from 'react';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { StatsCard } from '../components/Admin/Dashboard/StatsCard';
import { AuditLogList } from '../components/Admin/Dashboard/AuditLogList';
import { Database, BarChart, Users, Activity } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export const AdminDashboard: React.FC = () => {
  const { categories, providers, admins, auditLogs } = useAdminStore();

  const stats = [
    {
      label: 'Total APIs',
      value: providers.length,
      icon: Database,
      color: 'blue' as const
    },
    {
      label: 'Active Categories',
      value: categories.length,
      icon: BarChart,
      color: 'green' as const
    },
    {
      label: 'Admin Users',
      value: admins.length,
      icon: Users,
      color: 'purple' as const
    },
    {
      label: 'Recent Activities',
      value: auditLogs.length,
      icon: Activity,
      color: 'orange' as const
    }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatsCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>

        {/* Activity Log */}
        <AuditLogList />
      </div>
    </AdminLayout>
  );
};
