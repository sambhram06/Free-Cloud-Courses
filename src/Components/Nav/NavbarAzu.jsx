import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_aws.png';
import { useAuth } from '../../contexts/AuthContext';

const NavbarAzu = ({loggedInUser}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-black shadow-md px-6 py-6 flex justify-between items-center transition-all duration-500 ease-in-out">
      <div className="flex items-center">
        <a href="https://www.cloudthat.com/">
          <img src={logo} alt="Logo" className="h-9 w-auto" />
        </a>
      </div>

      <div className="flex items-center text-white gap-6 font-AmazonEmber font-bold">
        <Link to="/" className="hover:text-[#D3D3D3]">
          Cloud Home
        </Link>

        {user ? (
          <>
            <span className="font-semibold text-white">{user.email}</span>
            <a
              onClick={handleLogout}
              className="hover:text-[#D3D3D3] focus:outline-none"
            >
              Logout
            </a>
          </>
        ) : (
          <Link to="/loginazure" className="hover:text-[#D3D3D3]">
            Login/SignUp
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarAzu;
