import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileControls } from './MobileControls';
import { Footer } from './Footer';
import { CategoryFilter } from '../Filters/CategoryFilter';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <MobileControls isOpen={isMobileControlsOpen} onClose={() => setIsMobileControlsOpen(false)} />
        <main className="flex-1 lg:ml-80">
          {/* Add padding to account for fixed header (73px) */}
          <div className="pt-[73px]">
            <CategoryFilter />
            <div className="p-4 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer className="lg:ml-80" />
    </div>
  );
};
