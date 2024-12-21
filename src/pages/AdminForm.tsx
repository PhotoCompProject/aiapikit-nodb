import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { Admin } from '../types/admin';
import { useAdminStore } from '../store/adminStore';
import { FormHeader } from '../components/Admin/Common/FormHeader';
import { AdminForm as AdminFormComponent } from '../components/Admin/Admins/AdminForm';

export const AdminForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admins, addAdmin, updateAdmin } = useAdminStore();

  const admin = id ? admins.find(a => a.id === id) : undefined;

  const handleSubmit = (data: Admin) => {
    if (id) {
      updateAdmin(id, data);
    } else {
      addAdmin(data);
    }
    navigate('/admin/admins');
  };

  return (
    <AdminLayout title="">
      <div>
        <FormHeader
          title={id ? 'Edit Admin' : 'Add Admin'}
          backText="Admins"
          onBack={() => navigate('/admin/admins')}
        />
        <div className="bg-white rounded-lg shadow mt-4">
          <div className="p-6">
            <AdminFormComponent
              onSubmit={handleSubmit}
              initialData={admin}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
