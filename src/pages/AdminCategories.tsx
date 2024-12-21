import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AdminLayout } from '../components/Admin/Layout/AdminLayout';
import { CategoryList } from '../components/Admin/Categories/CategoryList';
import { CategoryForm } from '../components/Admin/Categories/CategoryForm';
import { Button } from '../components/ui/Button';
import { useAdminStore } from '../store/adminStore';
import { Category } from '../types/admin';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdminStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

  const handleSubmit = (data: Category) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, data);
      setEditingCategory(undefined);
    } else {
      addCategory({ ...data, id: Date.now().toString() });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  return (
    <AdminLayout title="Categories">
      <div className="flex gap-6 h-[calc(100vh-10rem)]">
        {/* Left Column - Category List */}
        <div className="w-1/2 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Category List</h2>
            {!isAdding && !editingCategory && (
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-auto">
            <CategoryList
              categories={categories}
              onEdit={setEditingCategory}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* Right Column - Category Form */}
        <div className="w-1/2 overflow-auto">
          {(isAdding || editingCategory) && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingCategory(undefined);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <CategoryForm
                onSubmit={handleSubmit}
                initialData={editingCategory}
              />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
