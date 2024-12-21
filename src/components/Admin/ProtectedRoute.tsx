import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = localStorage.getItem('adminLoggedIn') === 'true';

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin" replace />;
  }

  // Render child routes
  return <Outlet />;
};
