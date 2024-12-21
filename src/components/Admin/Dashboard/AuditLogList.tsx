import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ActivityList } from '../Activities/ActivityList';

export const AuditLogList: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Link 
          to="/admin/activities"
          className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 font-medium"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <ActivityList showFilters={false} limit={5} />
    </div>
  );
};
