import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo_aws.png';
import { useAuth } from '../../contexts/AuthContext';
 
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
 
  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/');
  };
 
  const email = user?.email || JSON.parse(localStorage.getItem('useremail'));
  const name = localStorage.getItem('username') || email;
 
  // route based on platform choosed
  const isAWS = location.pathname.startsWith('/aws') || location.pathname.startsWith('/explore-courses');
  const isAzure =location.pathname.startsWith('/azurecourses') || location.pathname.startsWith('/role') ;
 
  return (
    <nav className="bg-black shadow-md px-6 py-4 flex justify-between items-center transition-all duration-500 ease-in-out">
      <div className="flex items-center py-2">
        <a href='https://www.cloudthat.com/'>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </a>
      </div>
 
      <div className="flex items-center">
        <ul className="hidden md:flex font-bold space-x-8 text-white">
          <li><Link to='/' className="hover:text-[#D3D3D3]">Cloud Home</Link></li>
          {isAWS && (
            <>
              <li><Link to='/aws' className="hover:text-[#D3D3D3]">AWS Home</Link></li>
              <li><Link to='/explore-courses' className="hover:text-[#D3D3D3]">AWS Courses</Link></li>
            </>
          )}
          {isAzure && (
            <>
              <li><Link to='/azurecourses' className="hover:text-[#D3D3D3]">Azure Home</Link></li>
            </>
          )}
        </ul>
 
        <div className="text-white flex items-center gap-6 ml-8">
          {user ? (
            <>
              <span className="font-semibold">{name}</span>
              <button
                onClick={handleLogout}
                className="text-white font-bold hover:text-[#D3D3D3] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {isAWS && (
                <Link
                  to="/loginaws"
                  className="text-white font-bold hover:text-[#D3D3D3] transition"
                >
                  Login/SignUp
                </Link>
              )}
              {isAzure && (
                <Link
                  to="/loginazure"
                  className="text-white font-bold hover:text-[#D3D3D3] transition"
                >
                  Login/SignUp
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
 
export default Navbar;