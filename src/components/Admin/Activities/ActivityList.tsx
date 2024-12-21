import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminStore } from '../../../store/adminStore';
import { Clock, User, Activity, XCircle, Search } from 'lucide-react';
import { FilterSelect } from '../Common/FilterSelect';
import { TablePagination } from '../Common/TablePagination';
import { TableHeader } from '../Common/TableHeader';
import { DateRangePicker } from '../Common/DateRangePicker';

type SortField = 'entityType' | 'action' | 'details' | 'adminId' | 'timestamp';
type SortDirection = 'asc' | 'desc';

interface ActivityListProps {
  showFilters?: boolean;
  limit?: number;
}

export const ActivityList: React.FC<ActivityListProps> = ({ 
  showFilters = true,
  limit
}) => {
  const { auditLogs, admins } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<string[]>([]);
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getAdminName = (adminId: string) => {
    const admin = admins.find(a => a.id === adminId);
    return admin?.name || 'Unknown';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getActionColor = (action: string) => {
    if (action.startsWith('create')) return 'text-green-600';
    if (action.startsWith('update')) return 'text-blue-600';
    if (action.startsWith('delete')) return 'text-red-600';
    return 'text-gray-600';
  };

  // Get unique actions
  const uniqueActions = Array.from(new Set(auditLogs.map(log => log.action))).sort();

  let filteredLogs = auditLogs
    .filter(log => 
      (searchTerm === '' || 
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAdminName(log.adminId).toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (selectedEntityTypes.length === 0 || selectedEntityTypes.includes(log.entityType)) &&
      (selectedAdmins.length === 0 || selectedAdmins.includes(log.adminId)) &&
      (selectedActions.length === 0 || selectedActions.includes(log.action)) &&
      (!startDate || new Date(log.timestamp) >= new Date(startDate)) &&
      (!endDate || new Date(log.timestamp) <= new Date(endDate))
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'entityType':
          return a.entityType.localeCompare(b.entityType) * direction;
        case 'action':
          return a.action.localeCompare(b.action) * direction;
        case 'details':
          return a.details.localeCompare(b.details) * direction;
        case 'adminId':
          return getAdminName(a.adminId).localeCompare(getAdminName(b.adminId)) * direction;
        case 'timestamp':
          return (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) * direction;
        default:
          return 0;
      }
    });
  
  if (limit) {
    filteredLogs = filteredLogs.slice(0, limit);
  }

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-[0.5625rem] border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-48">
                <FilterSelect
                  label="Application"
                  options={Array.from(new Set(auditLogs.map(log => log.entityType))).map(type => ({
                    id: type,
                    name: type.charAt(0).toUpperCase() + type.slice(1)
                  }))}
                  selectedValues={selectedEntityTypes}
                  onChange={setSelectedEntityTypes}
                  placeholder="Filter by application..."
                />
              </div>
              <div className="w-48">
                <FilterSelect
                  label="Operation"
                  options={uniqueActions.map(a => ({ 
                    id: a, 
                    name: a.charAt(0).toUpperCase() + a.slice(1)
                  }))}
                  selectedValues={selectedActions}
                  onChange={setSelectedActions}
                  placeholder="Filter by operation..."
                />
              </div>
              <div className="w-48">
                <FilterSelect
                  label="User"
                  options={admins.map(a => ({ id: a.id, name: a.name }))}
                  selectedValues={selectedAdmins}
                  onChange={setSelectedAdmins}
                  placeholder="Filter by user..."
                />
            </div>
              <div className="w-[280px]">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  placeholder="Filter by date range"
                />
              </div>
            </div>
            {(searchTerm || selectedEntityTypes.length > 0 || selectedActions.length > 0 || selectedAdmins.length > 0 || startDate || endDate) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedEntityTypes([]);
                  setSelectedActions([]);
                  setSelectedAdmins([]);
                  setStartDate('');
                  setEndDate('');
                }}
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium mt-7"
              >
                <XCircle className="h-4 w-4" />
                Clear All
              </button>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader
                label="S.No"
                className="w-16"
              />
              <TableHeader
                label="Application"
                sortable
                onClick={() => handleSort('entityType')}
                active={sortField === 'entityType'}
              />
              <TableHeader
                label="Operation"
                sortable
                onClick={() => handleSort('action')}
                active={sortField === 'action'}
              />
              <TableHeader
                label="Description"
                sortable
                onClick={() => handleSort('details')}
                active={sortField === 'details'}
              />
              <TableHeader
                label="User"
                sortable
                onClick={() => handleSort('adminId')}
                active={sortField === 'adminId'}
              />
              <TableHeader
                label="Time"
                sortable
                onClick={() => handleSort('timestamp')}
                active={sortField === 'timestamp'}
              />
              <TableHeader
                label="Actions"
              />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedLogs.map((log, index) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Activity className={`w-5 h-5 mr-2 ${getActionColor(log.action)}`} />
                    <span className="text-sm text-gray-900 capitalize">{log.entityType}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 capitalize">{log.action}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{log.details}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-900">{getAdminName(log.adminId)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-500">{formatTimestamp(log.timestamp)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    to={`/admin/activities/${log.id}`}
                    className="text-orange-600 hover:text-orange-900"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No activity logs found
          </div>
        )}
      </div>

      {filteredLogs.length > itemsPerPage && (
        <TablePagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredLogs.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
