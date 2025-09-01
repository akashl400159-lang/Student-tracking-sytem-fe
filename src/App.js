import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Toaster } from "sonner";
// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import LoadingSpinner from './components/LoadingSpinner';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import ParentDashboard from './pages/ParentDashboard'
import AdminDashboard from './pages/AdminDashboard';
// Services
import authService from './services/authService';
import RecommendationPage from './components/AIRecommondation';
import StudentProfile from './pages/StudentProfile';
import Sidebar from './components/Student_Sidebar';
import ClassScheduleApp from './pages/StudentTimeTable';
import ChatRoom from './pages/StudentChat';
import { AssignmentSystem } from './pages/StudentAssigmentSystem';
import { CoursesManager } from './pages/Studentcourse';
import { NotificationSystem } from './pages/StudentNotiicationSystem';
import AdminUserManagement from './pages/AdminUserManage';
import Landing from './components/Landing';
import StudentDemo from './pages/StudentDemo';
import InstitutionOnboarding from './pages/Institution_Onboard';
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  const handleLogin = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={handleLogout} />}

        <Routes>
          
          <Route
            path="/"
            
            element={<Landing/>}
          />
          <Route
            path="/onBoard"
            element={<InstitutionOnboarding/>}
          />
          
          <Route
            path="/login"
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={user ? <DashboardRouter user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/ai-recommendation"
            element={user ? <RecommendationPage user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/timetable"
            element={user ? <ClassScheduleApp user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/student_Profile"
            element={user ? <StudentProfile user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/student_Chat"
            element={user ? <ChatRoom user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/stud_assignment"
            element={user ? <AssignmentSystem user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/users"
            element={user ? <AdminUserManagement user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/student_course"
            element={user ? <CoursesManager user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/student_notification"
            element={user ? <NotificationSystem user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={3000} // how long toast stays (ms)
          toastOptions={{
            style: { borderRadius: "10px", padding: "12px 16px" },
            classNames: {
              toast: "animate-in slide-in-from-top fade-in duration-500",
              description: "text-sm opacity-90",
              actionButton: "bg-blue-600 text-white px-3 py-1 rounded-md",
            },
          }}
        />
      </div>
    </Router>

  );
}
const DashboardRouter = ({ user }) => {
  switch (user.user_type) {
    case 'student':
      return <StudentDashboard user={user} />;
    case 'staff':
      return <StaffDashboard user={user} />;
    case 'principal':
      return <PrincipalDashboard user={user} />;
    case 'parent':
      return <ParentDashboard user={user} />;
    case 'admin':
      return <AdminDashboard user={user} />;
    default:
      return <Navigate to="/login" />;
  }
};
export default App;