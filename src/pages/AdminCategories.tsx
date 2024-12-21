import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { Plus } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { Button } from '../components/ui/Button';
import { CategoryList } from '../components/Admin/Categories/CategoryList';

export const AdminCategories: React.FC = () => {
  const navigate = useNavigate();
  const { categories, providers, deleteCategory } = useAdminStore();

  return (
    <AdminLayout title="Categories">
      <div className="space-y-6">
        <CategoryList
          categories={categories}
          providers={providers}
          onEdit={(category) => navigate(`/admin/categories/edit/${category.id}`)}
          onAddNew={() => navigate('/admin/categories/add')}
          onDelete={(id) => {
            if (window.confirm('Are you sure you want to delete this category?')) {
              deleteCategory(id);
            }
          }}
        />
      </div>
    </AdminLayout>
  );
};
