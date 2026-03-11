import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex items-center mb-2 md:mb-0">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src="vg.jpeg" 
                  alt="" 
                  className="h-16 w-auto sm:h-20 mr-3 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="text-left hidden md:block">
                {/* Removed the text logo since the new logo includes both the emblem and text */}
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <img
                src="vait-logo.png"
                alt=""
                className="h-14 w-auto md:h-20 transition-transform duration-300 hover:scale-105"
              />
            </div>
            <img 
              src="/logo-department.png" 
              alt="" 
              className="h-14 w-auto md:h-20 transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
