import { useState, useEffect } from "react"
import { Calendar, Clock, Users, MapPin, BookOpen, Filter } from "lucide-react"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  course: string
  instructor: string
  room: string
  students: number
  day: string
  color: string
  department: string
}

interface TimetableViewerProps {
  userRole: 'student' | 'teacher' | 'parent' | 'principal' | 'administration'
  userName?: string
}

export function TimetableViewer({ userRole, userName }: TimetableViewerProps) {
  const [timetable, setTimetable] = useState<Record<string, TimeSlot[]>>({})
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const timeSlots = [
    '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'
  ]

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'cs', name: 'Computer Science' },
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'english', name: 'English' }
  ]

  useEffect(() => {
    const mockTimetable: Record<string, TimeSlot[]> = {
      Monday: [
        { id: '1', startTime: '09:00', endTime: '10:00', course: 'CS 201 - Data Structures', instructor: 'Dr. Smith', room: 'Room 204', students: 32, day: 'Monday', color: 'bg-blue-100 border-blue-300 text-blue-800', department: 'cs' },
        { id: '2', startTime: '11:00', endTime: '12:00', course: 'MATH 301 - Calculus', instructor: 'Prof. Johnson', room: 'Room 105', students: 28, day: 'Monday', color: 'bg-green-100 border-green-300 text-green-800', department: 'math' },
        { id: '3', startTime: '14:00', endTime: '15:00', course: 'PHYS 201 - Mechanics', instructor: 'Dr. Brown', room: 'Lab 301', students: 25, day: 'Monday', color: 'bg-purple-100 border-purple-300 text-purple-800', department: 'physics' }
      ],
      Tuesday: [
        { id: '4', startTime: '10:00', endTime: '11:00', course: 'CS 101 - Programming', instructor: 'Prof. Davis', room: 'Room 150', students: 45, day: 'Tuesday', color: 'bg-blue-100 border-blue-300 text-blue-800', department: 'cs' },
        { id: '5', startTime: '13:00', endTime: '14:00', course: 'ENG 102 - Literature', instructor: 'Dr. Wilson', room: 'Room 210', students: 35, day: 'Tuesday', color: 'bg-yellow-100 border-yellow-300 text-yellow-800', department: 'english' }
      ],
      Wednesday: [
        { id: '6', startTime: '09:00', endTime: '10:00', course: 'CS 201 - Data Structures', instructor: 'Dr. Smith', room: 'Room 204', students: 32, day: 'Wednesday', color: 'bg-blue-100 border-blue-300 text-blue-800', department: 'cs' },
        { id: '7', startTime: '15:00', endTime: '16:00', course: 'CHEM 201 - Organic Chemistry', instructor: 'Prof. Taylor', room: 'Lab 205', students: 22, day: 'Wednesday', color: 'bg-red-100 border-red-300 text-red-800', department: 'chemistry' }
      ],
      Thursday: [
        { id: '8', startTime: '10:00', endTime: '11:00', course: 'CS 101 - Programming', instructor: 'Prof. Davis', room: 'Room 150', students: 45, day: 'Thursday', color: 'bg-blue-100 border-blue-300 text-blue-800', department: 'cs' }
      ],
      Friday: [
        { id: '9', startTime: '09:00', endTime: '10:00', course: 'CS 201 - Data Structures', instructor: 'Dr. Smith', room: 'Room 204', students: 32, day: 'Friday', color: 'bg-blue-100 border-blue-300 text-blue-800', department: 'cs' },
        { id: '10', startTime: '11:00', endTime: '12:00', course: 'MATH 301 - Calculus', instructor: 'Prof. Johnson', room: 'Room 105', students: 28, day: 'Friday', color: 'bg-green-100 border-green-300 text-green-800', department: 'math' }
      ],
      Saturday: []
    }
    setTimetable(mockTimetable)
  }, [])

  const filteredTimetable = () => {
    if (selectedDepartment === 'all') return timetable
    const filtered: Record<string, TimeSlot[]> = {}
    Object.keys(timetable).forEach(day => {
      filtered[day] = timetable[day].filter(slot => slot.department === selectedDepartment)
    })
    return filtered
  }

  const getRoleSpecificTitle = () => {
    switch (userRole) {
      case 'student': return 'Class Schedule'
      case 'teacher': return 'Teaching Schedule'
      case 'parent': return 'Children\'s Class Schedule'
      case 'principal': return 'School Timetable Overview'
      case 'administration': return 'Administrative Schedule View'
      default: return 'Timetable'
    }
  }

  const getRoleSpecificDescription = () => {
    switch (userRole) {
      case 'student': return 'View your class schedule and course timings'
      case 'teacher': return 'View your teaching schedule and class assignments'
      case 'parent': return 'Track your children\'s class schedules'
      case 'principal': return 'Monitor all school schedules and class arrangements'
      case 'administration': return 'Administrative view of all schedules'
      default: return 'View timetable information'
    }
  }

  const displayedTimetable = filteredTimetable()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{getRoleSpecificTitle()}</h1>
          <p className="text-gray-500">{getRoleSpecificDescription()}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="pl-8 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white shadow rounded-lg border p-4">
        <div className="mb-4">
          <h2 className="flex items-center gap-2 font-semibold">
            <Calendar className="h-5 w-5" /> Weekly Schedule
          </h2>
          <p className="text-gray-500 text-sm">Current week class schedule</p>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-4 min-w-[1200px]">
            {/* Time column header */}
            <div className="space-y-2">
              <div className="p-2 font-medium text-center bg-gray-100 rounded-lg">Time</div>
              {timeSlots.map(time => (
                <div key={time} className="p-3 text-sm text-center text-gray-500 border rounded">{time}</div>
              ))}
            </div>

            {/* Day columns */}
            {days.map((day) => (
              <div key={day} className="space-y-2">
                <div className="p-2 font-medium text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">{day}</div>
                <div className="min-h-[600px] space-y-2 p-2 rounded-lg bg-gray-50">
                  {(displayedTimetable[day] || []).map((slot) => (
                    <div key={slot.id} className={`p-3 rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow ${slot.color}`}>
                      <div className="space-y-1">
                        <p className="font-medium text-sm truncate">{slot.course}</p>
                        <div className="space-y-0.5 text-xs">
                          <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {slot.startTime} - {slot.endTime}</div>
                          <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {slot.room}</div>
                          <div className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {slot.instructor}</div>
                          <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {slot.students} students</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      {(userRole === 'principal' || userRole === 'administration') && (
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { title: "Total Classes", value: Object.values(displayedTimetable).flat().length, sub: "This week" },
            { title: "Total Students", value: Object.values(displayedTimetable).flat().reduce((sum, slot) => sum + slot.students, 0), sub: "Enrolled" },
            { title: "Active Instructors", value: new Set(Object.values(displayedTimetable).flat().map(slot => slot.instructor)).size, sub: "Teaching" },
            { title: "Departments", value: new Set(Object.values(displayedTimetable).flat().map(slot => slot.department)).size, sub: "Active" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 border rounded-lg shadow">
              <h3 className="text-sm font-medium">{stat.title}</h3>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Access for Students/Teachers */}
      {(userRole === 'student' || userRole === 'teacher') && (
        <div className="bg-white shadow rounded-lg border p-4">
          <h2 className="font-semibold">Today's Schedule</h2>
          <p className="text-gray-500 text-sm mb-3">Your classes for today</p>
          <div className="space-y-3">
            {displayedTimetable[new Date().toLocaleDateString('en-US', { weekday: 'long' })]?.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div>
                  <p className="font-medium">{slot.course}</p>
                  <p className="text-sm text-gray-500">{slot.room} • {slot.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{slot.startTime} - {slot.endTime}</p>
                  <span className="inline-block mt-1 text-xs bg-gray-200 px-2 py-0.5 rounded">{slot.students} students</span>
                </div>
              </div>
            )) || (
              <p className="text-center text-gray-500 py-8">No classes scheduled for today</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
