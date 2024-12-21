import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};