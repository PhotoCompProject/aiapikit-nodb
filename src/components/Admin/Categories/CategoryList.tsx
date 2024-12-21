import React, { useState } from 'react';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';
import { Category, ApiProvider } from '../../../types/admin';
import { Button } from '../../ui/Button';
import { TableHeader } from '../Common/TableHeader';
import { TablePagination } from '../Common/TablePagination';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  providers: ApiProvider[];
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
  onAddNew,
  providers,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredCategories = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-4">
      {/* Search and Add Button */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
        </div>
        <Button onClick={onAddNew}>
          <Plus className="h-5 w-5 mr-2" />
          Add Category
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
                onClick={toggleSort}
                active={sortDirection === 'desc'}
              />
              <TableHeader label="No. of APIs" />
              <TableHeader label="Input Fields" />
              <TableHeader label="Output Fields" />
              <TableHeader label="Price Fields" />
              <TableHeader label="Actions" align="right" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCategories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {providers.filter(p => p.category === category.id).length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{category.sliderDefinitions.length}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{category.outputDefinitions.length}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{category.priceDetailFields.length}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEdit(category)}
                      className="inline-flex items-center"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onDelete(category.id)}
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
        {filteredCategories.length > itemsPerPage && (
          <TablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCategories.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
