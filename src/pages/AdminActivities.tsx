import React from 'react';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { ActivityList } from '../components/Admin/Activities/ActivityList';

export const AdminActivities: React.FC = () => {
  return (
    <AdminLayout title="Activities">
      <div className="space-y-6">
        <ActivityList />
      </div>
    </AdminLayout>
  );
};
