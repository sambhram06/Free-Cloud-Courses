import React, { useEffect, useState } from "react";
import { FaClock, FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
 
const CourseCard = ({ course }) => {
  const { user } = useAuth();
  const [fccEmail, setFccEmail] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [completion, setCompletion] = useState(null);
 
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
 
  useEffect(() => {
    const fetchUserAndProgress = async () => {
      if (!user?.email) return;
 
      try {
        const res = await fetch(
          `https://xdtnopwad0.execute-api.ap-south-1.amazonaws.com/dev/sync-progress?email=${encodeURIComponent(user.email)}`,
          {
            method: "GET",
            headers: {
              "x-api-key": "Zju2Y4of4C5BOSafLEf428cIp1bxg6oE3dp2qeK2",
            },
          }
        );
 
        const data = await res.json();
 
        if (data?.fcc_email) {
          console.log("Fetched fcc_email:", data.fcc_email);
          setFccEmail(data.fcc_email);
        }
 
        if (data?.progress) {
          setProgressList(data.progress);
        }
      } catch (err) {
        console.error("GET /sync-progress failed:", err);
      }
    };
 
    fetchUserAndProgress();
  }, [user?.email]);
 
  useEffect(() => {
    const syncProgressToDb = async () => {
      if (!fccEmail) return;
 
      try {
        await fetch("https://xdtnopwad0.execute-api.ap-south-1.amazonaws.com/dev/sync-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "Zju2Y4of4C5BOSafLEf428cIp1bxg6oE3dp2qeK2",
          },
          body: JSON.stringify({ fcc_email: fccEmail }),
        });
 
        console.log("Progress synced via POST");
      } catch (err) {
        console.error("POST /sync-progress failed:", err);
      }
    };
 
    syncProgressToDb();
  }, [fccEmail]);
 
  useEffect(() => {
    console.log("Full course object:", course);
    const courseId = course.learningobject_id || course.id;
 
    console.log("Course ID:", courseId);
    console.log("Progress list:", progressList);
 
    const courseProgress = progressList.find(
      (item) => String(item.learningobject_id) === String(courseId)
    );
 
    console.log("Matched progress:", courseProgress);
 
    if (courseProgress) {
      setCompletion(courseProgress.completion_percentage);
    } else {
      setCompletion(null);
    }
  }, [progressList, course]);
 
  return (
    <div className="relative bg-white border-2 border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-gray-500/50 hover:shadow-lg hover:scale-[1.01] border-b-3 border-b-[#f15645]">
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
 
        <p className="text-sm text-[#777] flex items-center gap-1 mb-1">
          <FaClock className="text-orange-500" />
          <span className="font-semibold">Duration:</span>
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">
            {formatDuration(course.duration)}
          </span>
        </p>
 
        <p className="text-sm text-[#777] flex items-center gap-1 mb-1">
        <FaCheckCircle className={completion !== null ? "text-green-600" : "text-gray-400"} />
        <span className="font-semibold">Completion:</span>
          {completion !== null ? (
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
              {completion}%
        </span>
          ) : (
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
              Not yet started
        </span>
          )}
        </p>
 
 
        <p className="text-sm text-gray-600 mt-4 line-clamp-3">
          {course.short_description || "No description available."}
        </p>
      </div>
    </div>
  );
};
 
export default CourseCard;
 