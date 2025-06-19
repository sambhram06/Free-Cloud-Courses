import React, { useState, useMemo, useEffect } from "react";
import { FaEraser, FaGlobe, FaBook, FaBullseye, FaUser, FaRoute } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCourseContext } from "./Context/AppContext";

const learningPaths = [
  "Architect Learning Plan",
  "Data Analytics Learning Plan",
  "Cloud Essentials Learning Plan",
  "Developer Learning Plan",
  "Machine Learning Learning Plan",
];
 
const Filter = ({setFilteredCourses }) => {
const { awsData, loading, updateFilter } = useCourseContext();
 
 
  const [languages, setLanguages] = useState([]);
  const [domains, setDomains] = useState([]);
  const [roles, setRoles] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState(null);
  const [domain, setDomain] = useState(null);
  const [skillLevel, setSkillLevel] = useState(null);
  const [role, setRole] = useState(null);
  const [learningPath, setLearningPath] = useState(null);
 
 
  const clearFilters = () => {
    setSearchTerm("");
    setLanguage(null);
    setDomain(null);
    setSkillLevel(null);
    setRole(null);
    setLearningPath(null);
    updateFilter("language", null);
    updateFilter("domain", null);
    updateFilter("skillLevel", null);
    updateFilter("role", null);
  };
 
  useEffect(() => {
    if (loading || !Array.isArray(awsData.data) || awsData.data.length === 0) return;
 
    const extractUniqueTags = (data, categoryTitle) => {
      const tagsSet = new Set();
      data.forEach((course) => {
        course.category?.forEach((cat) => {
          if (cat.title.toLowerCase() === categoryTitle.toLowerCase()) {
            cat.tags?.forEach((tag) => tagsSet.add(tag.title));
          }
        });
      });
      return Array.from(tagsSet).sort();
    };
 
    setLanguages(extractUniqueTags(awsData.data, "Language"));
    setDomains(extractUniqueTags(awsData.data, "Domain"));
    setRoles(extractUniqueTags(awsData.data, "Roles"));
    setSkillLevels(extractUniqueTags(awsData.data, "Skill Level"));
  }, [awsData, loading]);
 

  {/* Compute filtered list of courses based on selected filters */} 
  const filteredCourses = useMemo(() => {
    return awsData?.data?.filter((course) => {
      const matchesSearch =
        course.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.short_description?.toLowerCase().includes(searchTerm.toLowerCase());
 
     
      const matchesLanguage = language
        ? course.category?.some(
            (category) =>
              category.title === "Language" &&
              category.tags?.some(
                (tag) => tag.title.toLowerCase() === language.toLowerCase()
              )
          )
        : true;
 
     
      const matchesDomain = domain
        ? course.category?.some(
            (category) =>
              category.title === "Domain" &&
              category.tags?.some(
                (tag) => tag.title.toLowerCase() === domain.toLowerCase()
              )
          )
        : true;
 
     
      const matchesRole = role
        ? course.category?.some(
            (category) =>
              category.title === "Roles" &&
              category.tags?.some(
                (tag) => tag.title.toLowerCase() === role.toLowerCase()
              )
          )
        : true;
 
     
      const matchesSkillLevel = skillLevel
  ? course.category?.some(
      (category) =>
        category.title === "Skill Level" &&
        category.tags?.some(
          (tag) => tag.title.toLowerCase() === skillLevel.toLowerCase()
        )
    )
  : true;
  
      const matchesLearningPath = learningPath
  ? course.category?.some(
      (category) =>
        category.title.toLowerCase().includes("learning plan") &&
        category.tags?.some(
          (tag) => tag.title.toLowerCase() === learningPath.toLowerCase()
        )
    )
  : true;
 
       
      return (
        matchesSearch &&
        matchesLanguage &&
        matchesDomain &&
        matchesRole &&
        matchesSkillLevel &&
        matchesLearningPath
      );
    });
  }, [awsData, searchTerm, language, domain, skillLevel, role, learningPath]);
 
 
  {/* Applies filtered results to parent component when filter state changes */}
  useEffect(() => {
    if (setFilteredCourses) {
      setFilteredCourses(filteredCourses);
    }
  }, [filteredCourses, setFilteredCourses]);
 
  if (loading) {
    return <div className="text-center py-8 text-lg">Loading filters...</div>;
  }
 
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
    {/* Search input */}
      <div className="mb-4 relative w-full">
        <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search AWS courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 text-sm text-gray-800 border border-[#20629b] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#20629b] hover:border-[#20629b] transition-all"
        />
      </div>
 
    {/* Filter dropdowns */}
    <div className="grid md:grid-cols-3 gap-8">
            
      {/* Language Filter */}
      <div className="relative">
        <h3 className="text-lg font-semibold text-[#20629b] mb-2 flex items-center gap-2">
          <FaGlobe className="text-[#FF9900]" /> Language
        </h3>
          <select
            value={language || ""}
            onChange={(e) => setLanguage(e.target.value || null)}
          className="w-full px-3 py-2 text-sm text-gray-800 border border-[#20629b] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#20629b] hover:border-[#20629b] transition-all"
          >
          <option value="" className="text-gray-500">Select Language</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang} className="text-gray-900">
              {lang}
            </option>
          ))}
        </select>
      </div>

        {/* Domain Filter */}     
        <div className="relative">
          <h3 className="text-lg font-semibold text-[#20629b] mb-2 flex items-center gap-2">
            <FaBook className="text-[#FF9900]" /> Domain
          </h3>
          <select
            value={domain || ""}
            onChange={(e) => setDomain(e.target.value || null)}
            className="w-full px-3 py-2 text-sm text-gray-800 border border-[#20629b] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#20629b] hover:border-[#20629b] transition-all"
          >
            <option value="" className="text-gray-500">Select Domain</option>
            {domains.map((dom, index) => (
              <option key={index} value={dom} className="text-gray-900">
                {dom}
              </option>
            ))}
          </select>
        </div>
  
        {/* Skill Level Filter */}     
        <div className="relative">
          <h3 className="text-lg font-semibold text-[#20629b] mb-2 flex items-center gap-2">
            <FaBullseye className="text-[#FF9900]" /> Skill Level
          </h3>
          <select
            value={skillLevel || ""}
            onChange={(e) => setSkillLevel(e.target.value || null)}
            className="w-full px-3 py-2 text-sm text-gray-800 border border-[#20629b] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#20629b] hover:border-[#20629b] transition-all"
          >
            <option value="" className="text-gray-500">Select Skill Level</option>
            {skillLevels.map((level, index) => (
              <option key={index} value={level} className="text-gray-900">
                {level}
              </option>
            ))}
          </select>
        </div>
  
        {/* Role Filter */}      
        <div className="relative">
          <h3 className="text-lg font-semibold text-[#20629b] mb-2 flex items-center gap-2">
            <FaUser className="text-[#FF9900]" /> Role
          </h3>
          <select
            value={role || ""}
            onChange={(e) => setRole(e.target.value || null)}
            className="w-full px-3 py-2 text-sm text-gray-800 border border-[#20629b] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#20629b] hover:border-[#20629b] transition-all"
          >
            <option value="" className="text-gray-500">Select Role</option>
            {roles.map((r, index) => (
              <option key={index} value={r} className="text-gray-900">
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Learning Path Filter */} 
        <div className="relative">
          <h3 className="text-lg font-semibold text-[#20629b] mb-2 flex items-center gap-2">
            <FaRoute className="text-[#FF9900]" /> Learning Path
          </h3>
          <select
            value={learningPath || ""}
            onChange={(e) => setLearningPath(e.target.value || null)}
            className="w-full px-3 py-2 text-sm text-gray-800 border border-[#20629b] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#20629b] hover:border-[#20629b] transition-all"
          >
            <option value="" className="text-gray-500">Select Learning Path</option>
            {learningPaths.map((lp, index) => (
              <option key={index} value={lp} className="text-gray-900">
                {lp}
              </option>
            ))}
          </select>
        
          {/* Clear Filters Button */}
          {(language || domain || skillLevel || role || learningPath) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="absolute top-3 right-0 translate-x-[120%] mt-6 inline-flex items-center gap-2 bg-[#20629b] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaEraser className="w-10 h-6" />
              Clear All Filters
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Filter;