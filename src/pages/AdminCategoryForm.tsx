import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { CategoryForm } from '../components/Admin/Categories/CategoryForm';
import { FormHeader } from '../components/Admin/Common/FormHeader';
import { useAdminStore } from '../store/adminStore';
import { Category } from '../types/admin';

export const AdminCategoryForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, addCategory, updateCategory } = useAdminStore();

  const category = id 
    ? categories.find(c => c.id === id)
    : undefined;

  const handleSubmit = (data: Category) => {
    if (id) {
      updateCategory(id, data);
    } else {
      addCategory({ ...data, id: Date.now().toString() });
    }
    navigate('/admin/categories');
  };

  const handleBack = () => {
    navigate('/admin/categories');
  };

  return (
    <AdminLayout title="">
      <div className="space-y-6">
        <FormHeader
          title={id ? 'Edit Category' : 'Add Category'}
          backText="Categories"
          onBack={handleBack}
        />
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <CategoryForm
              onSubmit={handleSubmit}
              initialData={category}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
