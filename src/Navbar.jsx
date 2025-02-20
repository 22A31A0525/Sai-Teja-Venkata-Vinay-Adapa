import React, { useState } from 'react';

const Navbar = () => {
  // State to toggle the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar flex justify-between items-center sticky top-0 left-0 z-50 h-20 bg-gray-800">
      <div className="nav-item font-bold text-white text-xl ml-[5%] max-sm:text-[15px]">SAI TEJA VENKATA VINAY ADAPA</div>

      {/* Mobile menu button */}
      <div className="sm:hidden">
        <button className="text-white p-2" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Desktop Navigation Links (visible on large screens) */}
      <div className="flex w-72 justify-around items-center text-white space-x-6 hidden sm:flex mr-[5%]">
        <div className="nav-items hover:text-violet-500 hover:border-b-2 hover:border-violet-500">
          <a href="#home">Home</a>
        </div>
        <div className="nav-items hover:text-violet-500 hover:border-b-2 hover:border-violet-500">
          <a href="#about">About</a>
        </div>
        <div className="nav-items hover:text-violet-500 hover:border-b-2 hover:border-violet-500">
          <a href="#portfolio">Portfolio</a>
        </div>
        <div className="nav-items hover:text-violet-500 hover:border-b-2 hover:border-violet-500">
          <a href="#contact">Contact</a>
        </div>
      </div>

      {/* Mobile menu (visible on small screens) */}
      {isMenuOpen && (
        <div className="sm:hidden fixed top-0 left-0 w-full h-full bg-gray-800 text-white">
          <div className="flex flex-col items-center space-y-4 py-4">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={toggleMenu}
            >
              &times;
            </button>
            
            <a href="#home" className="hover:text-violet-500" onClick={toggleMenu}>Home</a>
            <a href="#about" className="hover:text-violet-500" onClick={toggleMenu}>About</a>
            <a href="#portfolio" className="hover:text-violet-500" onClick={toggleMenu}>Portfolio</a>
            <a href="#contact" className="hover:text-violet-500" onClick={toggleMenu}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
