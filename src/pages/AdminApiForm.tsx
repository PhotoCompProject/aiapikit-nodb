import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { ApiForm } from '../components/Admin/APIs/ApiForm';
import { FormHeader } from '../components/Admin/Common/FormHeader';
import { useAdminStore } from '../store/adminStore';
import { ApiProvider } from '../types/api';
import { FeaturedToggle } from '../components/Admin/Common/FeaturedToggle';

export const AdminApiForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { providers, categories, addProvider, updateProvider } = useAdminStore();

  const api = id ? providers.find(p => p.id === id) : undefined;
  const [featured, setFeatured] = useState(api?.featured || false);

  const handleSubmit = (data: ApiProvider) => {
    if (id) {
      updateProvider(id, data);
    } else {
      addProvider({ ...data, id: Date.now().toString() });
    }
    navigate('/admin/apis');
  };

  const handleBack = () => {
    navigate('/admin/apis');
  };

  return (
    <AdminLayout title="">
      <div className="space-y-6">
        <FormHeader
          title={id ? 'Edit API' : 'Add API'}
          backText="APIs"
          onBack={handleBack}
          rightElement={
            <FeaturedToggle
              checked={featured}
              onChange={setFeatured}
            />
          }
        />
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <ApiForm
              onSubmit={handleSubmit}
              initialData={api}
              categories={categories}
              featured={featured}
              onFeaturedChange={setFeatured}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
