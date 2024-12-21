import React, { useState } from 'react';
import { AdminLayout } from '../components/Admin/AdminLayout';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  lastLogin: string;
}

export const AdminAdmins: React.FC = () => {
  const [admins] = useState<Admin[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'super_admin',
      lastLogin: '2024-03-15 14:30'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
      lastLogin: '2024-03-14 09:15'
    }
  ]);

  return (
    <AdminLayout currentPage="admins">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admins</h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Plus className="h-5 w-5" />
            <span>Add Admin</span>
          </button>
        </div>

        <div className="bg-surface-800/50 border border-surface-700/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-700/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{admin.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      admin.role === 'super_admin'
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{admin.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};