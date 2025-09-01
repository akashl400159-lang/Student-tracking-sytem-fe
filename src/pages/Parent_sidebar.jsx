import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaMoneyBillWave,
  FaChartLine,
  FaBell,
  FaComments,
  FaCalendarAlt,
  FaBars,
} from "react-icons/fa";

export default function ParentSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
    { name: "Child Profile", icon: <FaUserGraduate />, link: "/parent/child-profile" },
    { name: "Courses", icon: <FaBook />, link: "/parent/courses" },
    { name: "Attendance", icon: <FaClipboardList />, link: "/parent/attendance" },
    { name: "Fees & Payments", icon: <FaMoneyBillWave />, link: "/parent/fees" },
    { name: "Performance Reports", icon: <FaChartLine />, link: "/parent/performance" },
    { name: "Notifications", icon: <FaBell />, link: "/parent/notifications" },
    { name: "Messages", icon: <FaComments />, link: "/parent/messages" },
    { name: "Calendar & Events", icon: <FaCalendarAlt />, link: "/parent/calendar" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r h-screen sticky top-0 left-0 duration-300 shadow-md flex flex-col justify-between`}
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

        {/* Navigation */}
        <nav className="flex flex-col mt-6 flex-1">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              onClick={() => navigate(item.link)}
              className={`flex items-center ${
                isOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
              } text-gray-700 hover:bg-gray-800 hover:text-white text-decoration-none transition rounded-md mx-2 cursor-pointer`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
