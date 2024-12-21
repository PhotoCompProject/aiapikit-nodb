import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { styles } from '../../../styles/theme';
import { Button } from '../../ui/Button';

export const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b fixed top-0 left-0 right-0 z-10">
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center ml-4">
            <img src="/logo.svg" alt="AiApiKit Logo" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <Button variant="secondary" size="sm">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
