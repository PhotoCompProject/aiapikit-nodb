import React from 'react';
import { Admin, AdminRole, AdminStatus } from '../../../types/admin';
import { Button } from '../../ui/Button';

interface AdminFormProps {
  onSubmit: (data: Admin) => void;
  initialData?: Admin;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    confirmPassword: '',
    role: initialData?.role || 'admin' as AdminRole,
    status: initialData?.status || 'active' as AdminStatus
  });

  const [error, setError] = React.useState('');

  const validateForm = () => {
    if (!formData.name.trim()) {
      throw new Error('Name is required');
    }
    if (!formData.email.trim()) {
      throw new Error('Email is required');
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Please enter a valid email address');
    }
    if (formData.name.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    if (formData.name.length > 50) {
      throw new Error('Name must be less than 50 characters');
    }

    // Password validation for new admin
    if (!initialData && !formData.password) {
      throw new Error('Password is required for new admin');
    }

    if (formData.password) {
      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      validateForm();

      const now = new Date().toISOString();
      const adminData: Admin = {
        id: initialData?.id || Date.now().toString(),
        ...formData,
        lastLogin: initialData?.lastLogin || now,
        createdAt: initialData?.createdAt || now,
        updatedAt: now,
        permissions: initialData?.permissions || []
      };

      onSubmit(adminData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            maxLength={50}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password {!initialData && <span className="text-red-500">*</span>}
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            placeholder={initialData ? "Leave blank to keep current password" : "Enter password"}
            minLength={8}
            {...(!initialData && { required: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password {!initialData && <span className="text-red-500">*</span>}
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            placeholder={initialData ? "Leave blank to keep current password" : "Confirm password"}
            minLength={8}
            {...(!initialData && { required: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              role: e.target.value as AdminRole
            }))}
            className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          >
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              status: e.target.value as AdminStatus
            }))}
            className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="submit">
          {initialData ? 'Update Admin' : 'Add Admin'}
        </Button>
      </div>
    </form>
  );
};
