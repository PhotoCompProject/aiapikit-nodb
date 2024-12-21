import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy validation - accept any non-empty values
    if (credentials.username && credentials.password) {
      // Store login state
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors duration-200"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
