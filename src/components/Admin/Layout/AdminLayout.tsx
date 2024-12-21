import React from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminNav } from './AdminNav';
import { styles } from '../../../styles/theme';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminNav />
      
      <main className="pl-64 pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {title && <h2 className={`${styles.heading.h2} mb-6`}>{title}</h2>}
          {children}
        </div>
      </main>
    </div>
  );
};
