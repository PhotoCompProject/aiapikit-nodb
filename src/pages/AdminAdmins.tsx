import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { useAdminStore } from '../store/adminStore';
import { AdminList } from '../components/Admin/Admins/AdminList';

export const AdminAdmins: React.FC = () => {
  const navigate = useNavigate();
  const { admins, deleteAdmin } = useAdminStore();

  const handleDelete = (id: string) => {
    // Don't allow deleting the last super admin
    const admin = admins.find(a => a.id === id);
    if (admin?.role === 'super_admin') {
      const superAdminCount = admins.filter(a => a.role === 'super_admin').length;
      if (superAdminCount <= 1) {
        alert('Cannot delete the last super admin');
        return;
      }
    }

    if (window.confirm('Are you sure you want to delete this admin?')) {
      deleteAdmin(id);
    }
  };

  return (
    <AdminLayout title="Admins">
      <div className="space-y-6">
        <AdminList
          admins={admins}
          onEdit={(admin) => navigate(`/admin/admins/edit/${admin.id}`)}
          onDelete={handleDelete}
          onAddNew={() => navigate('/admin/admins/add')}
        />
      </div>
    </AdminLayout>
  );
};
