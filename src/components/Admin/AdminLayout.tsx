import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Users, 
  LogOut,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: 'dashboard' | 'categories' | 'providers' | 'admins';
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'categories', label: 'Categories', icon: Database, path: '/admin/categories' },
    { id: 'providers', label: 'API Providers', icon: Database, path: '/admin/providers' },
    { id: 'admins', label: 'Admins', icon: Users, path: '/admin/admins' },
  ];

  return (
    <div className="min-h-screen bg-surface-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-surface-800 border-r border-surface-700">
          <div className="h-full flex flex-col">
            <div className="p-4">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                      currentPage === item.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-surface-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-surface-700 space-y-2">
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-surface-700 rounded-lg"
              >
                <Home className="h-5 w-5 mr-3" />
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-surface-700 rounded-lg"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};