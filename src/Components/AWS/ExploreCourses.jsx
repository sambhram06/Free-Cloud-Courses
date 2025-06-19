import { useState, useEffect } from "react";
import { useCourseContext } from "../AWS/Context/AppContext";
import Filter from "../AWS/Filter";
import { Pagination } from "../AWS/Pagination";
import Footer from "../Nav/Footer";
import Navbar from "../Nav/Navbar";

const ExploreCourses = () => {
  const { awsData, loading } = useCourseContext();
  const { data = [] } = awsData || {};
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredCourses(data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[#20629b]">
        <div className="animate-spin rounded-full mb-6 h-14 w-14 border-4 border-[#20629b] border-t-transparent"></div>
        <div className="text-xl font-semibold animate-pulse flex items-center gap-2">
          Loading courses...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen">
        <div className="py-4 px-6 max-w-7xl mx-auto">
          {/* Filter component to manage course filtering logic */}
          <Filter
            allCourses={data}
            loading={loading}
            error={false}
            setFilteredCourses={setFilteredCourses}
          />

          {filteredCourses.length === 0 && (
            <p className="text-center text-gray-500 mt-4" style={{ color: "#20629b" }}>
              No courses found for the selected filters.
            </p>
          )}
          
          {/* Paginated course view */}
          <div className="mb-10py-10">
            <Pagination viewType={awsData.view} allCourses={filteredCourses} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreCourses;