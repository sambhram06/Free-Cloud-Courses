import { useEffect, useState } from "react";
import { FaClock, FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const CourseCard = ({ course }) => {
  const { user } = useAuth();
  const [fccEmail, setFccEmail] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [completion, setCompletion] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const skillLevel = course.category?.find((cat) => cat.title === "Skill Level")?.tags.map((tag) => tag.title) || ["N/A"];

  const formatDuration = (durationStr) => {
    if (!durationStr) return "N/A";
    const [hours, minutes] = durationStr.split(":").map(Number);
    if (hours && minutes) return `${hours} Hours ${minutes} Minutes`;
    if (hours) return `${hours} Hour${hours > 1 ? "s" : ""}`;
    if (minutes) return `${minutes} Minute${minutes > 1 ? "s" : ""}`;
    return "N/A";
  };

  useEffect(() => {
    if (!user?.email) return;

    {/*Fetch user's FCC email and progress from API */}
    const fetchUserAndProgress = async () => {
      try {
        const res = await fetch(
          `https://xdtnopwad0.execute-api.ap-south-1.amazonaws.com/dev/sync-progress?email=${encodeURIComponent(
            user.email
          )}`,
          {
            method: "GET",
            headers: {
              "x-api-key": apiKey,
            },
          }
        );
        const data = await res.json();
        if (data?.fcc_email) setFccEmail(data.fcc_email);
        if (data?.progress) setProgressList(data.progress);
      } catch (err) {
        console.error("GET /sync-progress failed:", err);
      }
    };

    fetchUserAndProgress();
  }, [user?.email]);

  useEffect(() => {
    if (!fccEmail) return;

    {/* Sync user's FCC progress to database via POST */}
    const syncProgressToDb = async () => {
      try {
        await fetch("https://xdtnopwad0.execute-api.ap-south-1.amazonaws.com/dev/sync-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({ fcc_email: fccEmail }),
        });
      } catch (err) {
        console.error("POST /sync-progress failed:", err);
      }
    };

    syncProgressToDb();
  }, [fccEmail]);

  useEffect(() => {

    {/* Match progress data to current course by ID */}
    const courseId = course.learningobject_id || course.id;
    const courseProgress = progressList.find(
      (item) => String(item.learningobject_id) === String(courseId)
    );
    setCompletion(courseProgress?.completion_percentage ?? null);
  }, [progressList, course]);

  const InfoRow = ({ icon: Icon, label, children, colorClass }) => (
    <p className="text-sm text-[#777] flex items-center gap-1 mb-1">
      <Icon className={colorClass} />
      <span className="font-semibold">{label}:</span>
      {children}
    </p>
  );

  return (
    <div className="relative bg-white border-2 border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-gray-500/50 hover:shadow-lg hover:scale-[1.01] border-b-3 border-b-[#f15645]">
      <div className="p-4 flex flex-col justify-between h-full">
        <a
          href={user? course.launch_url : "/loginaws"}
          target="_blank"
          rel="noopener noreferrer"
          title={course.display_name}
          className="text-md font-bold text-[#555] hover:text-black hover:underline mb-2 line-clamp-2 transition-colors"
        >
          {course.display_name}
        </a>

        <InfoRow icon={FaGraduationCap} label="Skill Level" colorClass="text-orange-500">
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">
            {skillLevel.join(", ")}
          </span>
        </InfoRow>

        <InfoRow icon={FaClock} label="Duration" colorClass="text-orange-500">
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">
            {formatDuration(course.duration)}
          </span>
        </InfoRow>

        <InfoRow
          icon={FaCheckCircle}
          label="Completion"
          colorClass={completion !== null ? "text-green-600" : "text-gray-400"}
        >
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              completion !== null
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {completion !== null ? `${completion}%` : "Not yet started"}
          </span>
        </InfoRow>

        <p className="text-sm text-gray-600 mt-4 line-clamp-3">
          {course.short_description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;