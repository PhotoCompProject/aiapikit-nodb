import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { ProviderList } from '../components/Admin/Providers/ProviderList';
import { ProviderForm } from '../components/Admin/Providers/ProviderForm';
import { Button } from '../components/ui/Button';
import { useAdminStore } from '../store/adminStore';
import { ApiProvider } from '../types/admin';

export const AdminProviders: React.FC = () => {
  const { providers, categories, addProvider, updateProvider, deleteProvider } = useAdminStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProvider, setEditingProvider] = useState<ApiProvider | undefined>(undefined);

  const handleSubmit = (data: ApiProvider) => {
    if (editingProvider) {
      updateProvider(editingProvider.id, data);
      setEditingProvider(undefined);
    } else {
      addProvider({ ...data, id: Date.now().toString() });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      deleteProvider(id);
    }
  };

  return (
    <AdminLayout title="API Providers">
      <div className="space-y-6">
        <div className="flex justify-end">
          {!isAdding && !editingProvider && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
          )}
        </div>

        {(isAdding || editingProvider) ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProvider ? 'Edit Provider' : 'Add New Provider'}
              </h3>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsAdding(false);
                  setEditingProvider(undefined);
                }}
              >
                Cancel
              </Button>
            </div>
            <ProviderForm
              onSubmit={handleSubmit}
              initialData={editingProvider}
              categories={categories}
            />
          </div>
        ) : (
          <ProviderList
            providers={providers}
            categories={categories}
            onEdit={setEditingProvider}
            onDelete={handleDelete}
          />
        )}
      </div>
    </AdminLayout>
  );
};
