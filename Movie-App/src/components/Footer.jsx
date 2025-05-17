import React from 'react';
import Tos from './Tos'; // Import the Tos component

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © 2025 Mind-Forge All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Tos /> {/* Use the Tos component here */}
          <a href="mailto:ct1783@mind-forge-cthomas.com" className="hover:text-gray-400">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;