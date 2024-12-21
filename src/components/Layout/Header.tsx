import React from 'react';
import { Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center -ml-1">
              <Link to="/" className="flex items-center">
                <img src="/logo.svg" alt="AiApiKit Logo" className="h-10 w-auto" />
              </Link>
            </div>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search APIs and tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-9 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>

            <Link
              to="/admin"
              className="flex items-center space-x-2 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:text-gray-900 transition-all duration-200"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
