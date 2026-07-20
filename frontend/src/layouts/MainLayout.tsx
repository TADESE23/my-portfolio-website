import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import BackToTop from '../components/BackToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-800 dark:text-slatefg-dark transition-colors duration-300">
      {/* Premium Cursor effects */}
      <CustomCursor />
      
      {/* Navigation Headers */}
      <Navbar />
      
      {/* Primary Page Space */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer Branding */}
      <Footer />
      
      {/* Float to Top Control */}
      <BackToTop />
    </div>
  );
};

export default MainLayout;
