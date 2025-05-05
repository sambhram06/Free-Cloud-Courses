import React from "react";
import { FaClock, FaGraduationCap } from "react-icons/fa";
 
const CourseCard = ({ course }) => {
    const skillLevel = course.category
      ? course.category.find((cat) => cat.title === "Skill Level")?.tags.map((tag) => tag.title) || ["N/A"]
      : ["N/A"];
   
    const skillLevelText = skillLevel.length > 0 ? skillLevel.join(", ") : "N/A";
   
   
    const formatDuration = (durationStr) => {
      if (!durationStr) return "N/A";
      const [hours, minutes] = durationStr.split(":").map(Number);
      if (hours && minutes) return `${hours} Hours ${minutes} Minutes`;
      if (hours) return `${hours} Hour${hours > 1 ? "s" : ""}`;
      if (minutes) return `${minutes} Minute${minutes > 1 ? "s" : ""}`;
      return "N/A";
    };
   
    return (
      <div style={{
    fontFamily:"Roboto, sans-serif"
   
      }}  className="relative bg-white border-2 border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-gray-500/50  hover:shadow-lg hover:scale-[1.01] border-b-3 border-b-[#f15645]" >
        <div className="p-4 flex flex-col justify-between h-full">
         
          <a
            href={course.launch_url}
            target="_blank"
            rel="noopener noreferrer"
            title={course.display_name}
            className="text-md font-bold text-[#555] hover:text-black hover:underline mb-2 line-clamp-2 transition-colors"
          >
            {course.display_name}
          </a>
   
         
          <p className="text-sm text-[#777] mt-3 flex items-center gap-1 mb-1">
            <FaGraduationCap className="text-orange-500" />
            <span className="font-semibold">Skill Level:</span>
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">
              {skillLevelText}
            </span>
          </p>
   
         
          <p className="text-sm text-[#777]  flex items-center gap-1 mb-1">
            <FaClock className="text-orange-500" />
            <span className="font-semibold">Duration:</span>
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">
              {formatDuration(course.duration)}
            </span>
          </p>
   
         
          <p className="text-sm text-gray-600 mt-4 line-clamp-3">
            {course.short_description || "No description available."}
          </p>
        </div>
      </div>
    );
  };
   
  export default CourseCard;
   