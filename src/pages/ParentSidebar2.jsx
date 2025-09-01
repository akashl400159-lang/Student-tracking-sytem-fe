import { Home, BookOpen, Calendar, User } from "lucide-react"

export function ParentSidebar({ onNavigate }) {
  const menuItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/parent/dashboard" },
    { label: "Lesson Plans", icon: <BookOpen className="w-5 h-5" />, path: "/parent/lesson-plans" },
    { label: "Calendar", icon: <Calendar className="w-5 h-5" />, path: "/parent/calendar" },
    { label: "Profile", icon: <User className="w-5 h-5" />, path: "/parent/profile" },
  ]

  return (
    <aside className="w-64 bg-white shadow-md border-r border-gray-200 h-screen flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Parent Panel</h2>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigate?.(item.path)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
