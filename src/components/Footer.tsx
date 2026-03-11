import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4 text-sm sm:text-base">
      <div className="container mx-auto px-2 sm:px-4 text-center">
        <p>© All rights reserved to Department of IT, VITS, Deshmukhi</p>
      </div>
    </footer>
  );
};

export default Footer;
