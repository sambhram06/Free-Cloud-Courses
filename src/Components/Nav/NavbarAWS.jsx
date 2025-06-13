import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_aws.png';
import { useAuth } from '../../contexts/AuthContext';
 
const NavbarAWS = ({loggedInUser}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout();
    navigate('/');
  };
 
  return (
    <nav className="bg-black shadow-md px-6 py-4 flex justify-between items-center transition-all duration-500 ease-in-out">
      <div className="flex items-center py-2">
        <a href='https://www.cloudthat.com/'>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </a>
      </div>
 
      <div className="flex items-center">
        <ul className="hidden md:flex font-AmazonEmber font-bold space-x-15 text-white">
          <li><Link to='/' className="hover:text-[#D3D3D3]">Cloud Home</Link></li>
          <li><Link to='/aws' className="hover:text-[#D3D3D3]">AWS Home</Link></li>
          <li><Link to='/explore-courses' className="hover:text-[#D3D3D3]">AWS Courses</Link></li>
        </ul>
 
        <div className="text-white flex items-center gap-6 ml-8">
          {user ? (
            <>
              <span className="font-semibold">{user.email}</span>
              <a
                onClick={handleLogout}
                className="text-white font-bold hover:text-[#D3D3D3] transition"
              >
                Logout
              </a>
            </>
          ) : (
            <Link
              to="/loginaws"
              className="text-white font-bold hover:text-[#D3D3D3] transition"
            >
              Login/SignUp
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
 
export default NavbarAWS;