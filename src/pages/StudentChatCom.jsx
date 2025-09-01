import { useState, useEffect, useRef } from "react"
import { MessageSquare, Send, Users, Search, Filter, Phone, Video, MoreVertical, File, Image, Smile } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: 'student' | 'teacher' | 'parent' | 'principal' | 'admin' | 'administration'
  content: string
  timestamp: string
  chatRoomId: string
  type: 'text' | 'file' | 'image'
  fileUrl?: string
  fileName?: string
}

interface ChatRoom {
  id: string
  name: string
  description: string
  type: 'general' | 'academic' | 'announcement' | 'support'
  participants: string[]
  lastMessage?: Message
  unreadCount: number
}

interface ChatRoomProps {
  userRole: 'student' | 'teacher' | 'parent' | 'principal' | 'admin' | 'administration'
  userName: string
  userId: string
}

export function ChatRoom({ userRole, userName, userId }: ChatRoomProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedChatRoom, setSelectedChatRoom] = useState<string>('')
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mockChatRooms: ChatRoom[] = [
      { id: '1', name: 'CS 201 - Data Structures', description: 'Questions and discussions about data structures course', type: 'academic', participants: ['STU001', 'STU002', 'PROF001'], unreadCount: 3 },
      { id: '2', name: 'General Announcements', description: 'School-wide announcements and updates', type: 'announcement', participants: ['STU001', 'STU002', 'PROF001', 'PRIN001'], unreadCount: 1 },
      { id: '3', name: 'Parent-Teacher Communication', description: 'Direct communication between parents and teachers', type: 'general', participants: ['PAR001', 'PROF001', 'PRIN001'], unreadCount: 0 },
      { id: '4', name: 'Student Support', description: 'Academic support and counseling', type: 'support', participants: ['STU001', 'STU002', 'ADM001'], unreadCount: 2 },
      { id: '5', name: 'Mathematics Help', description: 'Math tutoring and problem solving', type: 'academic', participants: ['STU001', 'STU003', 'PROF002'], unreadCount: 0 }
    ]

    const mockMessages: Message[] = [
      { id: '1', senderId: 'PROF001', senderName: 'Dr. Robert Smith', senderRole: 'teacher', content: "Good morning everyone! Today we'll be covering binary trees. Please make sure you've read chapter 6.", timestamp: '2024-08-19T09:00:00Z', chatRoomId: '1', type: 'text' },
      { id: '2', senderId: 'STU001', senderName: 'John Smith', senderRole: 'student', content: 'Dr. Smith, I have a question about the tree traversal algorithms. Could you explain the difference between pre-order and post-order?', timestamp: '2024-08-19T09:15:00Z', chatRoomId: '1', type: 'text' },
      { id: '3', senderId: 'PROF001', senderName: 'Dr. Robert Smith', senderRole: 'teacher', content: "Great question, John! Pre-order traversal visits the root first, then left subtree, then right subtree. Post-order does left, right, then root. I'll demonstrate this in tomorrow's class.", timestamp: '2024-08-19T09:20:00Z', chatRoomId: '1', type: 'text' },
      { id: '4', senderId: 'STU002', senderName: 'Sarah Johnson', senderRole: 'student', content: 'Thank you for the explanation! I found this helpful diagram online. Should I share it with the class?', timestamp: '2024-08-19T09:25:00Z', chatRoomId: '1', type: 'text' },
      { id: '5', senderId: 'PRIN001', senderName: 'Dr. Margaret Wilson', senderRole: 'principal', content: 'Reminder: The annual science fair is scheduled for August 27th. All students and parents are welcome to attend.', timestamp: '2024-08-19T08:00:00Z', chatRoomId: '2', type: 'text' },
      { id: '6', senderId: 'PAR001', senderName: 'Robert Smith Sr.', senderRole: 'parent', content: "Dr. Smith, I wanted to discuss John's progress in your class. When would be a good time to schedule a meeting?", timestamp: '2024-08-19T14:30:00Z', chatRoomId: '3', type: 'text' }
    ]

    setChatRooms(mockChatRooms)
    setMessages(mockMessages)
    if (mockChatRooms.length > 0) setSelectedChatRoom(mockChatRooms[0].id)
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, selectedChatRoom])

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChatRoom) return

    const message: Message = { id: Date.now().toString(), senderId: userId, senderName: userName, senderRole: userRole, content: newMessage.trim(), timestamp: new Date().toISOString(), chatRoomId: selectedChatRoom, type: 'text' }
    setMessages(prev => [...prev, message])
    setNewMessage('')
    toast.success('Message sent!')
  }

  const filteredChatRooms = chatRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || room.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || room.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const currentRoomMessages = messages.filter(msg => msg.chatRoomId === selectedChatRoom)
  const currentRoom = chatRooms.find(room => room.id === selectedChatRoom)

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'teacher': return 'bg-blue-100 text-blue-800'
      case 'student': return 'bg-green-100 text-green-800'
      case 'parent': return 'bg-purple-100 text-purple-800'
      case 'principal': return 'bg-red-100 text-red-800'
      case 'admin': return 'bg-orange-100 text-orange-800'
      case 'administration': return 'bg-teal-100 text-teal-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (timestamp: string) => new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Communication Hub</h1>
        <p className="text-gray-500">Connect with teachers, students, and parents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat Rooms */}
        <div className="border rounded-lg bg-white shadow p-4 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
            <MessageSquare className="h-5 w-5" /> Chat Rooms
          </div>
          <div className="space-y-2 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search rooms..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Rooms</option>
              <option value="academic">Academic</option>
              <option value="general">General</option>
              <option value="announcement">Announcements</option>
              <option value="support">Support</option>
            </select>
          </div>
          <div className="space-y-1 max-h-[500px] overflow-y-auto">
            {filteredChatRooms.map((room) => (
              <div key={room.id} className={`p-3 cursor-pointer border-l-4 hover:bg-gray-100 rounded transition-colors ${selectedChatRoom === room.id ? 'bg-gray-100 border-l-blue-500' : 'border-l-transparent'}`} onClick={() => setSelectedChatRoom(room.id)}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm truncate">{room.name}</h4>
                  {room.unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{room.unreadCount}</span>}
                </div>
                <p className="text-xs text-gray-500 truncate">{room.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="border px-2 py-0.5 rounded text-xs">{room.type}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="h-3 w-3" /> {room.participants.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="border rounded-lg bg-white shadow flex flex-col lg:col-span-2">
          {currentRoom ? (
            <>
              <div className="border-b p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{currentRoom.name}</h2>
                  <p className="text-sm text-gray-500">{currentRoom.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 border rounded hover:bg-gray-100"><Phone className="h-4 w-4" /></button>
                  <button className="p-2 border rounded hover:bg-gray-100"><Video className="h-4 w-4" /></button>
                  <button className="p-2 border rounded hover:bg-gray-100"><MoreVertical className="h-4 w-4" /></button>
                </div>
              </div>

              <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[400px]">
                {currentRoomMessages.map((message, index) => {
                  const showDate = index === 0 || formatDate(message.timestamp) !== formatDate(currentRoomMessages[index - 1].timestamp)
                  return (
                    <div key={message.id}>
                      {showDate && <div className="text-center my-4"><span className="px-3 py-1 border rounded text-xs text-gray-600">{formatDate(message.timestamp)}</span></div>}
                      <div className={`flex gap-3 ${message.senderId === userId ? 'flex-row-reverse' : ''}`}>
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-xs font-medium">{message.senderName.split(' ').map(n => n[0]).join('')}</div>
                        <div className={`flex-1 max-w-[70%] ${message.senderId === userId ? 'text-right' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{message.senderName}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${getRoleColor(message.senderRole)}`}>{message.senderRole}</span>
                            <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                          </div>
                          <div className={`rounded-lg px-3 py-2 ${message.senderId === userId ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100 text-gray-900'}`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4 flex items-center gap-2">
                <button className="p-2 border rounded hover:bg-gray-100"><File className="h-4 w-4" /></button>
                <button className="p-2 border rounded hover:bg-gray-100"><Image className="h-4 w-4" /></button>
                <button className="p-2 border rounded hover:bg-gray-100"><Smile className="h-4 w-4" /></button>
                <input type="text" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={sendMessage} disabled={!newMessage.trim()} className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"><Send className="h-4 w-4" /></button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-4">
              <div>
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a chat room to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="border rounded-lg bg-white shadow p-4">
          <h3 className="text-sm font-medium mb-1">Active Rooms</h3>
          <div className="text-2xl font-bold">{chatRooms.length}</div>
          <p className="text-xs text-gray-500">Available</p>
        </div>
        <div className="border rounded-lg bg-white shadow p-4">
          <h3 className="text-sm font-medium mb-1">Unread Messages</h3>
          <div className="text-2xl font-bold">{chatRooms.reduce((sum, room) => sum + room.unreadCount, 0)}</div>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="border rounded-lg bg-white shadow p-4">
          <h3 className="text-sm font-medium mb-1">Messages Today</h3>
          <div className="text-2xl font-bold">{messages.filter(msg => new Date(msg.timestamp).toDateString() === new Date().toDateString()).length}</div>
          <p className="text-xs text-gray-500">Sent</p>
        </div>
        <div className="border rounded-lg bg-white shadow p-4">
          <h3 className="text-sm font-medium mb-1">Online Users</h3>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-gray-500">Active now</p>
        </div>
