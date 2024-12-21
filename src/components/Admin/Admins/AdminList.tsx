import React, { useState } from 'react';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';
import { Admin } from '../../../types/admin';
import { Button } from '../../ui/Button';
import { TableHeader } from '../Common/TableHeader';
import { TablePagination } from '../Common/TablePagination';

interface AdminListProps {
  admins: Admin[];
  onEdit: (admin: Admin) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

type SortField = 'name' | 'email' | 'role' | 'status' | 'lastLogin';
type SortDirection = 'asc' | 'desc';

export const AdminList: React.FC<AdminListProps> = ({
  admins,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredAdmins = admins
    .filter(admin => 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'name':
          return a.name.localeCompare(b.name) * direction;
        case 'email':
          return a.email.localeCompare(b.email) * direction;
        case 'role':
          return a.role.localeCompare(b.role) * direction;
        case 'status':
          return a.status.localeCompare(b.status) * direction;
        case 'lastLogin':
          return (new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime()) * direction;
        default:
          return 0;
      }
    });

  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: Admin['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Add Button */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
        </div>
        <Button onClick={onAddNew}>
          <Plus className="h-5 w-5 mr-2" />
          Add Admin
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader
                label="S.No"
                className="w-16"
              />
              <TableHeader
                label="Name"
                sortable
                onClick={() => handleSort('name')}
                active={sortField === 'name'}
              />
              <TableHeader
                label="Email"
                sortable
                onClick={() => handleSort('email')}
                active={sortField === 'email'}
              />
              <TableHeader
                label="Role"
                sortable
                onClick={() => handleSort('role')}
                active={sortField === 'role'}
              />
              <TableHeader
                label="Status"
                sortable
                onClick={() => handleSort('status')}
                active={sortField === 'status'}
              />
              <TableHeader
                label="Last Login"
                sortable
                onClick={() => handleSort('lastLogin')}
                active={sortField === 'lastLogin'}
              />
              <TableHeader label="Actions" align="right" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAdmins.map((admin, index) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{admin.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    admin.role === 'super_admin'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {admin.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(admin.status)}`}>
                    {admin.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {new Date(admin.lastLogin).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEdit(admin)}
                      className="inline-flex items-center"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onDelete(admin.id)}
                      className="text-red-600 hover:text-red-700 inline-flex items-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAdmins.length > itemsPerPage && (
          <TablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredAdmins.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
