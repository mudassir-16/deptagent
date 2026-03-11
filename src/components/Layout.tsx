import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen transform-gpu will-change-auto">
      <Header />
      <NavBar />
      <main className="flex-grow bg-gray-50 transform-gpu will-change-auto px-2 sm:px-4 md:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
