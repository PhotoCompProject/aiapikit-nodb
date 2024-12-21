import React from 'react';
import { Card } from '../../ui/Card';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card className="mt-6">
      <h3 className={`text-lg font-semibold text-gray-900 mb-4`}>
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="w-2 h-2 mt-2 rounded-full bg-primary-500" />
            <div>
              <p className="text-sm text-gray-900">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};