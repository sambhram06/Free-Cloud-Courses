import ReactPaginate from "react-paginate";
import CourseCard from "../AWS/CourseCard";
import { useState } from "react";
import { motion } from "framer-motion";

export const Pagination = ({ allCourses, viewType }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 9;

  const offset = currentPage * PER_PAGE;
  const currentPageData = allCourses.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(allCourses.length / PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="px-4">
      <motion.div
        layout
        className={`grid mb-[80px] ${
          viewType === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            : "flex flex-col"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentPageData.map((course, idx) => (
          <CourseCard key={idx} course={course} />
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center mt-8 mb-[50px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex flex-wrap gap-2"}
          pageLinkClassName={
            "px-4 py-2 border rounded text-[#20629b] border-[#20629b] hover:bg-[#20629b] hover:text-white transition-all cursor-pointer"
          }
          previousLinkClassName={
            "px-4 py-2 border rounded text-[#20629b] border-[#20629b] hover:bg-[#20629b] hover:text-white transition-all cursor-pointer"
          }
          nextLinkClassName={
            "px-4 py-2 border rounded text-[#20629b] border-[#20629b] hover:bg-[#20629b] hover:text-white transition-all cursor-pointer"
          }
          activeLinkClassName={"bg-[#20629b] text-white"}
          disabledLinkClassName={"opacity-50 cursor-not-allowed"}
        />
      </motion.div>
    </div>
  );
};