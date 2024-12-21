import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { styles } from '../../../styles/theme';
import { Button } from '../../ui/Button';

export const AdminHeader: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/admin';
  };

  return (
    <header className="bg-white border-b fixed top-0 left-0 right-0 z-10">
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className={`${styles.heading.h1} ml-4`}>Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="secondary" size="sm">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
