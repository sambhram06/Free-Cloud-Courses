import { Link } from 'react-router-dom';
import {
  FaUserShield, FaRobot, FaBrain, FaClipboardCheck, FaChartLine,
  FaUserTie, FaUsers, FaDatabase, FaCode, FaServer, FaNetworkWired,
  FaUserSecret, FaBalanceScale, FaUserGraduate, FaLock, FaSearch,
  FaBookReader, FaShieldAlt, FaHandsHelping, FaCogs, FaLightbulb,
  FaChalkboardTeacher, FaLifeRing, FaPenFancy, FaProjectDiagram
} from 'react-icons/fa';
import { MdPrivacyTip } from 'react-icons/md';
import { BsPersonWorkspace, BsRocketTakeoff } from 'react-icons/bs';
import { AiOutlineSolution } from 'react-icons/ai';
import { useEffect, useState } from 'react';
 
const roleIcons = {
  "administrator": <FaUserShield className="text-5xl text-sky-600" />,
  "ai-edge-engineer": <FaRobot className="text-5xl text-sky-600" />,
  "ai-engineer": <FaBrain className="text-5xl text-sky-600" />,
  "auditor": <FaClipboardCheck className="text-5xl text-sky-600" />,
  "business-analyst": <FaChartLine className="text-5xl text-sky-600" />,
  "business-owner": <FaUserTie className="text-5xl text-sky-600" />,
  "business-user": <FaUsers className="text-5xl text-sky-600" />,
  "data-analyst": <FaChartLine className="text-5xl text-sky-600" />,
  "data-engineer": <FaDatabase className="text-5xl text-sky-600" />,
  "data-scientist": <FaBrain className="text-5xl text-sky-600" />,
  "database-administrator": <FaServer className="text-5xl text-sky-600" />,
  "developer": <FaCode className="text-5xl text-sky-600" />,
  "devops-engineer": <FaCogs className="text-5xl text-sky-600" />,
  "functional-consultant": <AiOutlineSolution className="text-5xl text-sky-600" />,
  "k-12-educator": <FaChalkboardTeacher className="text-5xl text-sky-600" />,
  "network-engineer": <FaNetworkWired className="text-5xl text-sky-600" />,
  "privacy-manager": <MdPrivacyTip className="text-5xl text-sky-600" />,
  "risk-practitioner": <FaBalanceScale className="text-5xl text-sky-600" />,
  "school-leader": <FaBookReader className="text-5xl text-sky-600" />,
  "security-engineer": <FaLock className="text-5xl text-sky-600" />,
  "security-operations-analyst": <FaSearch className="text-5xl text-sky-600" />,
  "service-adoption-specialist": <FaHandsHelping className="text-5xl text-sky-600" />,
  "solution-architect": <AiOutlineSolution className="text-5xl text-sky-600" />,
  "startup-founder": <BsRocketTakeoff className="text-5xl text-sky-600" />,
  "student": <FaUserGraduate className="text-5xl text-sky-600" />,
  "support-engineer": <FaLifeRing className="text-5xl text-sky-600" />,
  "technical-writer": <FaPenFancy className="text-5xl text-sky-600" />,
  "technology-manager": <FaProjectDiagram className="text-5xl text-sky-600" />,
  "higher-ed-educator": <FaChalkboardTeacher className="text-5xl text-sky-600" />,
  "identity-access-admin": <FaUserShield className="text-5xl text-sky-600" />,
  "ip-admin":<MdPrivacyTip className="text-5xl text-sky-600" />,
  "maker": <FaClipboardCheck className="text-5xl text-sky-600" />,
  "parent-guardian": <FaBookReader className="text-5xl text-sky-600" />,
};
 
export default function CareerPaths() {
  const [roles, setRoles] = useState([]);
 
  useEffect(() => {
    fetch('https://learn.microsoft.com/api/learn/catalog/')
      .then(res => res.json())
      .then(data => {
        const allRoles = data.learningPaths.flatMap(lp => lp.roles).filter(Boolean);
        const uniqueRoles = Array.from(new Set(allRoles));
        const sortedRoles = uniqueRoles.sort((a, b) => a.localeCompare(b));
        setRoles(sortedRoles);
      })
      .catch(error => {
        console.error('Error fetching role data:', error);
      });
  }, []);
 
  const formatRoleLabel = (role) => {
    return role
      .split('-')
      .map(word => {
        const lower = word.toLowerCase();
        if (lower === 'ai') return 'AI';
        if (lower === 'ip') return 'IP';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };
 
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl mt-4 font-bold font-sans">
        <span className="text-black-400">I</span>{' '}
        <span className="bg-gradient-to-r from-[#0078D4] via-[#005A9E] to-[#20629b] bg-clip-text text-transparent">
          Choose a Role
        </span>
      </h1>
      <p className="mt-2 text-sm md:text-base text-gray-600 mb-10 italic ml-1">
        Browse learning paths based on your role
      </p>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
      {roles.map((role) => {
          const key = role.toLowerCase().replace(/\s+/g, '-');
          return (
            <Link
              key={role}
              to={`/role/${key}`}
              className="flex items-center gap-6 border-2 border-[#20629b] p-10 rounded-2xl bg-white hover:bg-gray-100 transition-all duration-500 shadow-md hover:shadow-gray-500/80 transform hover:scale-105"
            >
              {roleIcons[key] || (
                <div className="text-5xl text-[#20629b]">🎓</div>
              )}
              <span className="text-2xl font-semibold capitalize text-gray-700">
                {formatRoleLabel(role)}
              </span>
            </Link>
          );
        })}
 
      </div>
    </div>
  );
}