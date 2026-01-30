// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">$</span>
            </div>
            <span className="ml-2 text-xl font-bold">ExpenseTrack</span>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take control of your finances with our intelligent expense tracker.
          </p>
          <div className="mt-8">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} ExpenseTrack. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;