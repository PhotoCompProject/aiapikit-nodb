import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader } from 'lucide-react';
import { styles } from '../styles/theme';
import { useAdminStore } from '../store/adminStore';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { admins } = useAdminStore();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Please enter both email and password');
      }

      // Check if admin exists
      const admin = admins.find(a => a.email === credentials.email);
      if (!admin) {
        throw new Error('Invalid email or password');
      }

      // In a real app, you would verify the password here
      // For demo purposes, we'll accept any password

      // Update last login
      const now = new Date().toISOString();
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminId', admin.id);
      localStorage.setItem('adminLastLogin', now);

      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className={`${styles.card.base} p-8`}>
          <div className="text-center mb-8">
            <h2 className={styles.heading.h2}>Admin Login</h2>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  required
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
                  className="mt-1 block w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center space-x-2 px-4 py-2.5 ${styles.button.primary} ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <LogIn className="h-5 w-5" />
              )}
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
