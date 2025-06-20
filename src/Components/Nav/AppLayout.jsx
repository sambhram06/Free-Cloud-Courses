import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

 
const AppLayout = ({ children }) => {
  // const { pathname } = useLocation();
  // const showNavbar = pathname.startsWith('/aws') || pathname.startsWith('/explore-courses') || pathname.startsWith('/azurecourses');
 
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
 
export default AppLayout; 