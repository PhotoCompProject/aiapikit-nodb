import React from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminNav } from './AdminNav';
import { styles } from '../../../styles/theme';

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  backButton?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, backButton }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminNav />
      
      <main className="pl-64 pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {backButton}
              {title && <h2 className={styles.heading.h2}>{title}</h2>}
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};
