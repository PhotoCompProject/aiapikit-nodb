import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdminStore } from '../../../store/adminStore';
import { AdminLayout } from '../Layout/AdminLayout';
import { ArrowLeft, User, Clock, Activity } from 'lucide-react';

export const ActivityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { auditLogs, admins } = useAdminStore();
  
  const log = auditLogs.find(l => l.id === id);
  
  if (!log) {
    return (
      <AdminLayout title="">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          Activity not found
        </div>
      </AdminLayout>
    );
  }

  const getAdminName = (adminId: string) => {
    const admin = admins.find(a => a.id === adminId);
    return admin?.name || 'Unknown';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getActionColor = (action: string) => {
    if (action === 'create') return 'text-green-600';
    if (action === 'update') return 'text-blue-600';
    if (action === 'delete') return 'text-red-600';
    return 'text-gray-600';
  };

  const renderChanges = () => {
    if (!log.changes?.length) return null;

    // For update operations, only show fields that actually changed
    const changedFields = log.action === 'update'
      ? log.changes.filter(change => 
          JSON.stringify(change.before) !== JSON.stringify(change.after)
        )
      : log.changes;

    if (changedFields.length === 0) return null;

    return (
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Changes</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          {changedFields.map((change, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="font-medium text-sm text-gray-700">{change.field}</div>
              {change.before !== undefined && (
                <div className="text-sm text-red-600 line-through ml-4">
                  {typeof change.before === 'object' 
                    ? JSON.stringify(change.before, null, 2)
                    : String(change.before)
                  }
                </div>
              )}
              {change.after !== undefined && (
                <div className="text-sm text-green-600 ml-4">
                  {typeof change.after === 'object'
                    ? JSON.stringify(change.after, null, 2)
                    : String(change.after)
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMetadata = () => {
    if (!log.metadata) return null;

    return (
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Additional Information</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(log.metadata, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout title="">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/admin/activities"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Activities
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Activity className={`w-5 h-5 ${getActionColor(log.action)}`} />
              <h2 className="text-lg font-semibold text-gray-900">{log.details}</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-500 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>Performed by:</span>
                </div>
                <div className="mt-1 text-sm font-medium text-gray-900">
                  {getAdminName(log.adminId)}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Time:</span>
                </div>
                <div className="mt-1 text-sm font-medium text-gray-900">
                  {formatTimestamp(log.timestamp)}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Entity Type:</div>
                <div className="mt-1 text-sm font-medium text-gray-900 capitalize">
                  {log.entityType}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Operation:</div>
                <div className="mt-1 text-sm font-medium text-gray-900 capitalize">
                  {log.action}
                </div>
              </div>

              {log.ipAddress && (
                <div>
                  <div className="text-sm text-gray-500">IP Address:</div>
                  <div className="mt-1 text-sm font-medium text-gray-900">
                    {log.ipAddress}
                  </div>
                </div>
              )}
            </div>

            {renderChanges()}
            {renderMetadata()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
