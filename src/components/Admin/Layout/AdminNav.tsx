import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, Users } from 'lucide-react';
import { styles } from '../../../styles/theme';

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/categories', icon: Database, label: 'Categories' },
  { path: '/admin/providers', icon: Database, label: 'API Providers' },
  { path: '/admin/admins', icon: Users, label: 'Admins' },
];

export const AdminNav: React.FC = () => {
  return (
    <nav className="bg-white border-r h-full w-64 fixed left-0 top-16">
      <div className="py-4">
        <div className="flex flex-col space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-orange-600 bg-orange-50 border-r-2 border-orange-500'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`
              }
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
