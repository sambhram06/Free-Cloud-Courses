import React from 'react';
import HeroAzure from './HeroAzure';
import NavbarAzu from '../Nav/NavbarAzu';
import Footer from '../Nav/Footer';
import CareerPaths from '../Azure/CareerPaths'
 
 
const AzureCourses = () => {
  return (
        <div>
          <NavbarAzu />
          <HeroAzure />
          <CareerPaths />
          <Footer />
        </div>
  );
};
 
export default AzureCourses;