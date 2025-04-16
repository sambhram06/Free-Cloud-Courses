import { Link } from "react-router-dom";
import Awspage from "./AWS/Awspage";
import Azurepage from "./Azure/Azurepage";
import awsLogo from "../Components/assets/awsLogo.svg";
import azureLogo from "../Components/assets/azureLogo.svg";
import LoginAws from "./Login/LoginAws";

export default function Landingpage() {
  return (
    <div className="min-h-screen bg-animated text-white font-sans flex flex-col justify-between">
      <header className="text-center py-12">
        <img
          src="https://www.cloudthat.com/freecloudcourses/assets/images/CT_logo_horizontal_dark.svg"
          alt="CloudThat Logo"
          className="mx-auto w-72 mb-6 animate-fade-in"
        />
        <p className="mt-2 text-lg md:text-xl text-gray-800 font-medium animate-fade-in delay-200">
          Master Cloud Skills with Free AWS & Azure Courses
        </p>
      </header>

      <main className="flex flex-col md:flex-row justify-center items-center gap-12 px-6 pb-20">
        {/* AWS Card */}
        <Link
          to="/SignUp"
          className="group w-96 bg-white/70 backdrop-blur-lg hover:bg-yellow-300 transition duration-300 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 animate-slide-down"
        >
          <div className="flex flex-col items-center p-8">
            <img
              src={awsLogo}
              alt="AWS"
              className="w-28 h-28 object-contain mb-4 group-hover:scale-110 transition-transform"
            />
            <h2 className="text-3xl font-semibold text-yellow-500 group-hover:text-black">
              AWS Courses
            </h2>
            <p className="mt-3 text-base text-gray-700 group-hover:text-black">
              Deep dive into AWS technologies
            </p>
          </div>
        </Link>

        {/* Azure Card */}
        <Link
          to="/SignUp"
          className="group w-96 bg-white/70 backdrop-blur-lg hover:bg-blue-400 transition duration-300 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 animate-slide-down delay-200"
        >
          <div className="flex flex-col items-center p-8">
            <img
              src={azureLogo}
              alt="Azure"
              className="w-28 h-28 object-contain mb-4 group-hover:scale-110 transition-transform"
            />
            <h2 className="text-3xl font-semibold text-blue-500 group-hover:text-white">
              Azure Courses
            </h2>
            <p className="mt-3 text-base text-gray-700 group-hover:text-white">
              Explore Azure Cloud fundamentals
            </p>
          </div>
        </Link>
      </main>

      <footer className="text-center py-6 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} CloudThat 
      </footer>
    </div>
  );
}
