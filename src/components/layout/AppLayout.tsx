import React from 'react';
import MobileNavbar from './MobileNavbar';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Desktop sidebar - hidden on mobile */}
      {!isMobile && <Sidebar />}

      {/* Main content */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto min-h-screen pb-16 md:pb-0 md:pl-0 animate-fade-in">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation - visible only on mobile */}
      {isMobile && <MobileNavbar />}
    </div>
  );
};

export default AppLayout;