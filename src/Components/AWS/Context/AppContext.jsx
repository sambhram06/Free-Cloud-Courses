import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
 
const CourseContext = createContext();
 
export const CourseProvider = ({ children }) => {
  const location = useLocation();
 
  const [awsData, setAwsData] = useState({
    data: [],
    view: "grid",
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    language: null,
    domain: null,
    version: null,
    skillLevel: null,
    role: null,
    learningPath: null,
  });
 
  useEffect(() => {
    const isAwsHomePage =
      location.pathname === "/aws" || location.pathname === "/explore-courses";
 
    if (!isAwsHomePage) {
      setLoading(false);
      return;
    }
 
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://s3.ap-south-1.amazonaws.com/freecloudcourses.cloudthat.com/files/learning_objects.json"
        );
        const result = await response.json();
 
        setAwsData({
          data: result?.data || [],
          view: "grid",
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchCourses();
  }, [location.pathname]);
 
  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
 
  return (
    <CourseContext.Provider
      value={{
        awsData,
        loading,
        filters,
        updateFilter,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
 
export const useCourseContext = () => useContext(CourseContext);