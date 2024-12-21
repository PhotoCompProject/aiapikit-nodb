import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Tags, Box, Users, LogOut, ActivitySquare } from 'lucide-react';

const navItems = [
  { 
    path: '/admin/dashboard', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    description: 'Overview and statistics'
  },
  { 
    path: '/admin/categories', 
    icon: Tags, 
    label: 'Categories',
    description: 'Manage API categories'
  },
  { 
    path: '/admin/apis', 
    icon: Box, 
    label: 'APIs',
    description: 'Manage APIs'
  },
  { 
    path: '/admin/activities', 
    icon: ActivitySquare, 
    label: 'Activities',
    description: 'View audit logs'
  },
  { 
    path: '/admin/admins', 
    icon: Users, 
    label: 'Admins',
    description: 'Manage admin users'
  },
];

export const AdminNav: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/admin';
  };

  return (
    <nav className="bg-white border-r h-full w-64 fixed left-0 top-16 flex flex-col justify-between">
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
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
      
      <div className="border-t py-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </nav>
  );
};
