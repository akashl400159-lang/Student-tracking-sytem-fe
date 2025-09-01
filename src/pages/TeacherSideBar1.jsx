import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

export default function TeacherSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
    { name: "Courses", icon: <FaBook />, link: "/teacher/courses" },
    { name: "Students", icon: <FaUsers />, link: "/teacher/students" },
    { name: "Analytics", icon: <FaChartBar />, link: "/teacher/analytics" },
    { name: "Settings", icon: <FaCog />, link: "/teacher/settings" },
  ];

  return (
    <div
      className={`${isOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-900 border-r h-screen sticky top-0 left-0 duration-300 shadow-md flex flex-col justify-between`}
    >
      {/* Top Section */}
      <div>
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-4 bg-gray-600 text-white rounded-full p-2 shadow-md hover:bg-gray-900"
        >
          <FaBars size={16} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          {isOpen && (
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Teacher Panel
            </h2>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-6 flex-1">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className={`flex items-center ${isOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                } text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white transition rounded-md mx-2 no-underline`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Footer (Logout) */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">

      </div>
    </div>
  );
}
