import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { useAdminStore } from '../store/adminStore';
import { ApiList } from '../components/Admin/APIs/ApiList';

export const AdminApis: React.FC = () => {
  const navigate = useNavigate();
  const { providers, categories, deleteProvider, updateProvider } = useAdminStore();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this API?')) {
      deleteProvider(id);
    }
  };

  return (
    <AdminLayout title="APIs">
      <div className="space-y-6">
        <ApiList
          apis={providers}
          categories={categories}
          onEdit={(api) => navigate(`/admin/apis/edit/${api.id}`)}
          onDelete={handleDelete}
          onAddNew={() => navigate('/admin/apis/add')}
          onFeaturedChange={(id, featured) => {
            const api = providers.find(p => p.id === id);
            if (api) {
              updateProvider(id, { ...api, featured });
            }
          }}
        />
      </div>
    </AdminLayout>
  );
};
