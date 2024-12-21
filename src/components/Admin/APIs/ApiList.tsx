import React, { useState } from 'react';
import { Edit2, Trash2, Search, Plus, ExternalLink, XCircle } from 'lucide-react';
import { Category } from '../../../types/admin';
import { ApiProvider } from '../../../types/api';
import { Button } from '../../ui/Button';
import { FilterSelect } from '../Common/FilterSelect';
import { TableHeader } from '../Common/TableHeader';
import { TablePagination } from '../Common/TablePagination';
import { FeaturedToggle } from '../Common/FeaturedToggle';

interface ApiListProps {
  apis: ApiProvider[];
  categories: Category[];
  onEdit: (api: ApiProvider) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  onFeaturedChange: (id: string, featured: boolean) => void;
}

type SortField = 'name' | 'provider' | 'category';
type SortDirection = 'asc' | 'desc';

export const ApiList: React.FC<ApiListProps> = ({
  apis,
  categories,
  onEdit,
  onDelete,
  onAddNew,
  onFeaturedChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get unique providers
  const uniqueProviders = Array.from(new Set(apis.map(api => api.provider))).sort();

  const filteredApis = apis
    .filter(api => 
      (selectedProviders.length === 0 || selectedProviders.includes(api.provider)) &&
      (selectedCategories.length === 0 || selectedCategories.includes(api.category)) &&
      (searchTerm ? (
        api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.provider.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true)
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return a.name.localeCompare(b.name) * direction;
      }
      if (sortField === 'provider') {
        return a.provider.localeCompare(b.provider) * direction;
      }
      return a.category.localeCompare(b.category) * direction;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedProviders, selectedCategories]);

  const paginatedApis = filteredApis.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Search, Filters and Add Button */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-48">
              <FilterSelect
                label="Select Category"
                options={categories.map(c => ({ id: c.id, name: c.name }))}
                selectedValues={selectedCategories}
                onChange={setSelectedCategories}
                placeholder="Search categories..."
              />
            </div>
            <div className="w-48">
              <FilterSelect
                label="Select Provider"
                options={uniqueProviders.map(p => ({ id: p, name: p }))}
                selectedValues={selectedProviders}
                onChange={setSelectedProviders}
                placeholder="Search providers..."
              />
            </div>
            {(selectedCategories.length > 0 || selectedProviders.length > 0) && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedProviders([]);
                }}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-4 w-4" />
                Clear all filters
              </button>
            )}
          </div>
        </div>
        <Button onClick={onAddNew}>
          <Plus className="h-5 w-5 mr-2" />
          Add API
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
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
                  label="Provider"
                  sortable
                  onClick={() => handleSort('provider')}
                  active={sortField === 'provider'}
                />
                <TableHeader
                  label="Category"
                  sortable
                  onClick={() => handleSort('category')}
                  active={sortField === 'category'}
                />
                <TableHeader label="Featured" />
                <TableHeader label="Documentation" />
                <TableHeader label="Actions" align="right" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedApis.map((api, index) => (
                <tr key={api.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        src={api.logo.value}
                        alt={`${api.name} logo`}
                        className="h-8 w-8 rounded object-contain bg-gray-50 p-1"
                      />
                      <div className="text-sm font-medium text-gray-900">{api.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{api.provider}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                      {categories.find(c => c.id === api.category)?.name || api.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <FeaturedToggle
                      checked={api.featured}
                      onChange={(checked) => onFeaturedChange(api.id, checked)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={api.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-orange-500 hover:text-orange-600"
                    >
                      <span className="text-sm">View Docs</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(api)}
                        className="inline-flex items-center"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onDelete(api.id)}
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
        </div>
        {filteredApis.length > itemsPerPage && (
          <TablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredApis.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
