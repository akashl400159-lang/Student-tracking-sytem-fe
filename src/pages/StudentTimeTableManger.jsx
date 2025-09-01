import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Clock, Edit, Trash2, Plus, Save, Users, BookOpen, MapPin, Calendar } from "lucide-react"
import { toast } from "sonner@2.0.3"

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
}

interface TimetableManagerProps {
  userRole: 'admin' | 'principal'
}

export function TimetableManager({ userRole }: TimetableManagerProps) {
  const [timetable, setTimetable] = useState<Record<string, TimeSlot[]>>({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
        {
          id: '1',
          startTime: '09:00',
          endTime: '10:00',
          course: 'CS 201 - Data Structures',
          instructor: 'Dr. Smith',
          room: 'Room 204',
          students: 32,
          day: 'Monday',
          color: 'bg-blue-100 border-blue-300'
        }
      ],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: []
    }
    setTimetable(mockTimetable)
  }, [])

  const handleDragEnd = (result: any) => {
    if (!result.destination || !isEditMode) return
    const { source, destination } = result
    if (source.droppableId === destination.droppableId) {
      const day = source.droppableId
      const items = Array.from(timetable[day] || [])
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)
      setTimetable(prev => ({ ...prev, [day]: items }))
    } else {
      const sourceDay = source.droppableId
      const destDay = destination.droppableId
      const sourceItems = Array.from(timetable[sourceDay] || [])
      const destItems = Array.from(timetable[destDay] || [])
      const [movedItem] = sourceItems.splice(source.index, 1)
      movedItem.day = destDay
      destItems.splice(destination.index, 0, movedItem)
      setTimetable(prev => ({ ...prev, [sourceDay]: sourceItems, [destDay]: destItems }))
    }
    toast.success("Schedule updated successfully!")
  }

  const addNewSlot = (day: string) => {
    setSelectedSlot({
      id: Date.now().toString(),
      startTime: '',
      endTime: '',
      course: '',
      instructor: '',
      room: '',
      students: 0,
      day,
      color: 'bg-gray-100 border-gray-300'
    })
    setIsDialogOpen(true)
  }

  const editSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setIsDialogOpen(true)
  }

  const deleteSlot = (day: string, slotId: string) => {
    setTimetable(prev => ({
      ...prev,
      [day]: prev[day]?.filter(slot => slot.id !== slotId) || []
    }))
    toast.success("Class removed from schedule")
  }

  const saveSlot = (slotData: any) => {
    if (!selectedSlot) return
    const newSlot: TimeSlot = { ...selectedSlot, ...slotData, color: getRandomColor() }
    if (timetable[newSlot.day]?.some(slot => slot.id === newSlot.id)) {
      setTimetable(prev => ({ ...prev, [newSlot.day]: prev[newSlot.day].map(slot => slot.id === newSlot.id ? newSlot : slot) }))
    } else {
      setTimetable(prev => ({ ...prev, [newSlot.day]: [...(prev[newSlot.day] || []), newSlot] }))
    }
    setIsDialogOpen(false)
    setSelectedSlot(null)
    toast.success("Schedule updated successfully!")
  }

  const getRandomColor = () => {
    const colors = [
      'bg-blue-100 border-blue-300','bg-green-100 border-green-300','bg-purple-100 border-purple-300','bg-yellow-100 border-yellow-300','bg-red-100 border-red-300'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <motion.div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">Timetable Management</h1>
          <p className="text-gray-500">Manage and organize class schedules for all departments</p>
        </div>
        <div className="flex gap-2">
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="border rounded p-2">
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button onClick={() => setIsEditMode(!isEditMode)} className="px-3 py-2 border rounded flex gap-1 items-center">
            <Edit className="h-4 w-4" /> {isEditMode ? "Save Changes" : "Edit Mode"}
          </button>
        </div>
      </div>

      {isEditMode && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <p className="text-blue-800 font-medium flex items-center gap-1"><Edit className="h-4 w-4"/> Edit Mode Active</p>
          <p className="text-sm text-blue-600">You can drag/drop or add/edit/delete classes</p>
        </div>
      )}

      <div className="border rounded-lg p-4 bg-white shadow">
        <div className="flex items-center gap-2 mb-4 font-semibold">
          <Calendar className="h-5 w-5"/> Weekly Schedule
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-4 min-w-[1200px]">
              <div>
                <div className="p-2 font-medium text-center bg-gray-100 rounded">Time</div>
                {timeSlots.map(t => <div key={t} className="p-2 border text-sm text-gray-500 text-center">{t}</div>)}
              </div>
              {days.map(day => (
                <div key={day}>
                  <div className="p-2 font-medium text-center bg-gradient-to-r from-blue-50 to-purple-50 border rounded flex items-center justify-between">
                    {day}
                    {isEditMode && <button onClick={() => addNewSlot(day)} className="p-1"><Plus className="h-3 w-3"/></button>}
                  </div>
                  <Droppable droppableId={day} isDropDisabled={!isEditMode}>
                    {(provided,snapshot)=>(
                      <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-[600px] p-2 rounded ${snapshot.isDraggingOver?'bg-blue-50 border border-blue-300':'bg-gray-50'}`}>
                        {(timetable[day]||[]).map((slot,i)=>(
                          <Draggable key={slot.id} draggableId={slot.id} index={i} isDragDisabled={!isEditMode}>
                            {(provided,snapshot)=>(
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`p-3 mb-2 rounded border ${slot.color} ${snapshot.isDragging?'shadow-lg':'shadow-sm'}`}>
                                <div className="flex justify-between items-center">
                                  <p className="font-medium text-sm truncate">{slot.course}</p>
                                  {isEditMode && (
                                    <div className="flex gap-1">
                                      <button onClick={()=>editSlot(slot)} className="p-1"><Edit className="h-3 w-3"/></button>
                                      <button onClick={()=>deleteSlot(day,slot.id)} className="p-1 text-red-500"><Trash2 className="h-3 w-3"/></button>
                                    </div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  <div className="flex items-center gap-1"><Clock className="h-3 w-3"/> {slot.startTime}-{slot.endTime}</div>
                                  <div className="flex items-center gap-1"><MapPin className="h-3 w-3"/> {slot.room}</div>
                                  <div className="flex items-center gap-1"><BookOpen className="h-3 w-3"/> {slot.instructor}</div>
                                  <div className="flex items-center gap-1"><Users className="h-3 w-3"/> {slot.students} students</div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>

      {isDialogOpen && selectedSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="font-bold mb-2">{selectedSlot.course?"Edit Class":"Add Class"}</h2>
            <div className="space-y-2">
              <input id="course" defaultValue={selectedSlot.course} placeholder="Course" className="w-full border rounded p-2"/>
              <input id="instructor" defaultValue={selectedSlot.instructor} placeholder="Instructor" className="w-full border rounded p-2"/>
              <div className="grid grid-cols-2 gap-2">
                <input id="startTime" type="time" defaultValue={selectedSlot.startTime} className="border rounded p-2"/>
                <input id="endTime" type="time" defaultValue={selectedSlot.endTime} className="border rounded p-2"/>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input id="room" defaultValue={selectedSlot.room} placeholder="Room" className="border rounded p-2"/>
                <input id="students" type="number" defaultValue={selectedSlot.students} placeholder="Students" className="border rounded p-2"/>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={()=>setIsDialogOpen(false)} className="px-3 py-2 border rounded">Cancel</button>
              <button onClick={()=>{
                const course=(document.getElementById('course') as HTMLInputElement).value
                const instructor=(document.getElementById('instructor') as HTMLInputElement).value
                const startTime=(document.getElementById('startTime') as HTMLInputElement).value
                const endTime=(document.getElementById('endTime') as HTMLInputElement).value
                const room=(document.getElementById('room') as HTMLInputElement).value
                const students=parseInt((document.getElementById('students') as HTMLInputElement).value||'0')
                saveSlot({course,instructor,startTime,endTime,room,students})
              }} className="px-3 py-2 bg-indigo-600 text-white rounded flex items-center gap-1">
                <Save className="h-4 w-4"/> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
