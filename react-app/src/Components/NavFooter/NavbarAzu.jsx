import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo_azu.png'

const NavbarAzu = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center transition-all duration-500 ease-in-out">
      {/* Logo */}
      <div className="flex items-center pl-5">
      <img src={logo} alt="Logo" className="h-20 w-auto mr-2" />
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex font-AmazonEmber font-bold space-x-18 pr-230   text-blue-600">
        <span className="text-blue-600 hover:bg-indigo-900 hover:text-white px-2 py-2">Cloud Home</span>
        <span className="text-blue-600 hover:bg-indigo-900 hover:text-white px-2 py-2">Learning Paths</span>
      </div>

      {/* Login/Signup Button */}
      <div>
        <span
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </span>
      </div>
    </nav>
  );
};

export default NavbarAzu;

