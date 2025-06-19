import HeroAzure from './HeroAzure';
import Footer from '../Nav/Footer';
import CareerPaths from '../Azure/CareerPaths'
import Navbar from '../Nav/Navbar';
 
const AzureCourses = () => {
  return (
        <div>
          <Navbar />
          <HeroAzure />
          <CareerPaths />
          <Footer />
        </div>
  );
};
 
export default AzureCourses;