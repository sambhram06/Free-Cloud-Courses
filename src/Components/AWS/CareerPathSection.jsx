import { useEffect, useState } from "react";
import { useCourseContext } from "../AWS/Context/AppContext";
import CourseCard from "../AWS/CourseCard";
 
const CareerPathSection = () => {
    const { awsData, loading } = useCourseContext();
    const { data = [] } = awsData;
    const [introCourses, setIntroCourses] = useState([]);
   
    useEffect(() => {
      if (data.length > 0) {
        const filtered = data.filter((course) => course.display_name && course.duration);
        setIntroCourses(filtered.slice(0, 6));
      }
    }, [data]);
   
    if (loading) {
      return <div className="text-center text-lg py-8">Loading intro courses...</div>;
    }
   
    return (
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {introCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    );
  };
   
  export default CareerPathSection;
 