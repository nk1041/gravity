import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Menu, X, Home, User, Users, Calendar, FileText, Wrench, MessageSquare, Bell, Settings, LogOut,
  Search, CheckCircle, ChevronRight, Download, Eye, Plus, Star, MapPin, Video, UserPlus, Clock, Upload, Filter,
  Trash2, Send, Paperclip, AlertCircle, RefreshCw, XCircle, FilePlus, ChevronLeft, Lock, Save, Shield
} from 'lucide-react';

const mockProfessionals = [
  { id: 1, name: "Dr. Priya Nair", dept: "Speech-Language Therapy", qual: "M.Sc. SLP", city: "Chennai", rating: 4.9, reviews: 120 },
  { id: 2, name: "Dr. Arjun Mehta", dept: "Psychology", qual: "Ph.D.", city: "Mumbai", rating: 4.8, reviews: 95 },
  { id: 3, name: "Ms. Kavitha Ramachandran", dept: "Special Education", qual: "M.Ed. Special Education", city: "Bangalore", rating: 5.0, reviews: 200 },
  { id: 4, name: "Dr. Sunita Sharma", dept: "Occupational Therapy", qual: "MOT", city: "Delhi", rating: 4.7, reviews: 85 },
  { id: 5, name: "Ms. Deepa Krishnamurthy", dept: "Occupational Therapy", qual: "BOT", city: "Hyderabad", rating: 4.7, reviews: 110 },
  { id: 6, name: "Mr. Rohit Verma", dept: "Special Education", qual: "B.Ed. Special Education", city: "Pune", rating: 4.6, reviews: 60 },
  { id: 7, name: "Dr. Ananya Bose", dept: "Psychology", qual: "Psy.D.", city: "Kolkata", rating: 4.9, reviews: 150 },
  { id: 8, name: "Ms. Meena Pillai", dept: "Occupational Therapy", qual: "OT (SI)", city: "Kochi", rating: 4.8, reviews: 130 },
  { id: 9, name: "Dr. Rajeev Kulkarni", dept: "Special Education", qual: "M.Ed. Special Education", city: "Pune", rating: 5.0, reviews: 210 },
  { id: 10, name: "Ms. Shreya Iyer", dept: "Speech-Language Therapy", qual: "B.Sc. SLP", city: "Chennai", rating: 4.5, reviews: 45 },
  { id: 11, name: "Mr. Vikram Nambiar", dept: "Special Education", qual: "M.Ed.", city: "Bangalore", rating: 4.8, reviews: 140 },
  { id: 12, name: "Dr. Pooja Agarwal", dept: "Psychology", qual: "Ph.D.", city: "Delhi", rating: 4.9, reviews: 180 },
  { id: 13, name: "Ms. Lakshmi Venkatesh", dept: "Speech-Language Therapy", qual: "M.Sc. SLP", city: "Hyderabad", rating: 4.7, reviews: 90 },
  { id: 14, name: "Dr. Suresh Menon", dept: "Occupational Therapy", qual: "MOT", city: "Kochi", rating: 4.8, reviews: 115 },
  { id: 15, name: "Ms. Neha Joshi", dept: "Speech-Language Therapy", qual: "M.Sc. SLP", city: "Jaipur", rating: 4.7, reviews: 105 },
];

const mockDocuments = [
  { id: 1, name: "Aarav's IEP – Q3 2025", type: "IEP", child: "Aarav Mehta", date: "2025-07-01", creator: "Ms. Kavitha Ramachandran" },
  { id: 2, name: "Autism Assessment Report", type: "Assessment", child: "Aarav Mehta", date: "2025-06-15", creator: "Dr. Arjun Mehta" },
  { id: 3, name: "Weekly Lesson Plan", type: "Lesson Plan", child: "Class A", date: "2025-07-05", creator: "Mr. Vikram Nambiar" },
  { id: 4, name: "ITP – Transition Goals", type: "ITP", child: "Rohan Iyer", date: "2025-05-20", creator: "Dr. Rajeev Kulkarni" },
  { id: 5, name: "Speech Progress Report", type: "Progress Report", child: "Priya Sharma", date: "2025-07-10", creator: "Dr. Priya Nair" },
  { id: 6, name: "Sensory Diet Plan", type: "Lesson Plan", child: "Ananya Krishnan", date: "2025-04-12", creator: "Dr. Sunita Sharma" },
  { id: 7, name: "Aarav's IEP – Q1 2025", type: "IEP", child: "Aarav Mehta", date: "2025-01-10", creator: "Ms. Kavitha Ramachandran" },
  { id: 8, name: "Behavioral Assessment", type: "Assessment", child: "Kabir Verma", date: "2025-04-05", creator: "Dr. Pooja Agarwal" }
];

const mockClients = [
  { id: 1, name: "Aarav Mehta", age: 8, condition: "Autism", parent: "Ravi Mehta", lastSession: "2025-07-12", sessions: 24 },
  { id: 2, name: "Priya Sharma", age: 6, condition: "Speech Delay", parent: "Anita Sharma", lastSession: "2025-07-10", sessions: 12 },
  { id: 3, name: "Rohan Iyer", age: 10, condition: "ADHD", parent: "Karthik Iyer", lastSession: "2025-07-08", sessions: 36 },
  { id: 4, name: "Ananya Krishnan", age: 7, condition: "Down Syndrome", parent: "Meera Krishnan", lastSession: "2025-07-11", sessions: 40 },
  { id: 5, name: "Kabir Verma", age: 9, condition: "Learning Disability", parent: "Sanjay Verma", lastSession: "2025-07-05", sessions: 15 },
];

const mockAppointments = [
  { id: 1, name: "Aarav Mehta", type: "Special Education", date: "2025-07-15", time: "10:00 AM", duration: "60 min", mode: "Online", status: "Upcoming" },
  { id: 2, name: "Priya Sharma", type: "Speech Therapy", date: "2025-07-16", time: "02:00 PM", duration: "45 min", mode: "In-Person", status: "Pending" },
  { id: 3, name: "Rohan Iyer", type: "Behavioral Therapy", date: "2025-07-10", time: "11:00 AM", duration: "60 min", mode: "Online", status: "Completed" },
  { id: 4, name: "Kabir Verma", type: "Assessment", date: "2025-07-05", time: "04:00 PM", duration: "90 min", mode: "In-Person", status: "Cancelled" },
];

const mockConversations = [
  { id: 1, name: "Ravi Mehta", preview: "Thanks for the updated IEP!", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Anita Sharma", preview: "Will we have our session tomorrow?", time: "Yesterday", unread: 0 },
  { id: 3, name: "Karthik Iyer", preview: "Rohan has been doing much better.", time: "Mon", unread: 0 },
  { id: 4, name: "Meera Krishnan", preview: "Can we reschedule to 4 PM?", time: "Last week", unread: 1 },
];

const mockNotifications = [
  { id: 1, title: "Appointment Confirmed", desc: "Your session with Aarav is confirmed for July 15.", time: "2 hours ago", type: "Appointment", unread: true },
  { id: 2, title: "IEP Generated", desc: "Aarav's Q3 IEP has been successfully generated.", time: "5 hours ago", type: "Document", unread: true },
  { id: 3, title: "New Message", desc: "Ravi Mehta sent you a new message.", time: "1 day ago", type: "Message", unread: false },
  { id: 4, title: "Profile Verified", desc: "Your professional profile has been verified.", time: "2 days ago", type: "System", unread: false },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('Parent');
  const [currentView, setCurrentView] = useState('overview');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewChange = (view) => {
    setLoading(true);
    setCurrentView(view);
    setTimeout(() => setLoading(false), 1000);
  };

  if (!isAuthenticated) {
    return <AuthGate onLogin={(role) => { setUserRole(role); setIsAuthenticated(true); }} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  const parentLinks = [
    { id: 'overview', icon: Home, label: 'Dashboard' },
    { id: 'find_professionals', icon: Search, label: 'Find Professionals' },
    { id: 'appointments', icon: Calendar, label: 'My Appointments' },
    { id: 'documents', icon: FileText, label: 'My Documents' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const educatorLinks = [
    { id: 'overview', icon: Home, label: 'Dashboard' },
    { id: 'onboarding', icon: FileText, label: 'My Profile' },
    { id: 'clients', icon: Users, label: 'My Clients' },
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'documents', icon: FileText, label: 'Generated Documents' },
    { id: 'tools', icon: Wrench, label: 'Tools' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const links = userRole === 'Parent' ? parentLinks : educatorLinks;

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-200 ${darkMode ? 'dark bg-[#0F0A1E] text-[#F5F3FF]' : 'bg-[#F9F7FF] text-[#1F1235]'}`}>
      
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col transition-all duration-300 ${darkMode ? 'bg-[#1A1033] border-r border-[#3D2A7A]' : 'bg-white border-r border-gray-200'} z-20`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-[#3D2A7A]">
          {sidebarOpen && <span className="font-bold text-xl text-[#7C3AED]">SimplyAbled</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E1244] text-[#7C3AED]">
            <Menu size={20} />
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200 dark:border-[#3D2A7A] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
            {userRole === 'Parent' ? 'P' : 'E'}
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <div className="font-bold truncate">{userRole === 'Parent' ? 'John Doe' : 'Dr. Educator'}</div>
              <div className="text-xs text-[#7C3AED] bg-[#EDE9FE] dark:bg-[#1E1244] px-2 py-0.5 rounded-full inline-block mt-1">{userRole}</div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {links.map(link => {
            const isActive = currentView === link.id;
            return (
              <button 
                key={link.id} 
                onClick={() => handleViewChange(link.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-[#7C3AED] text-white' : 'hover:bg-[#EDE9FE] dark:hover:bg-[#1E1244]'}`}
                title={!sidebarOpen ? link.label : ''}
              >
                <link.icon size={20} className={isActive ? 'text-white' : 'text-[#A78BFA]'} />
                {sidebarOpen && <span className="font-medium whitespace-nowrap">{link.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-[#3D2A7A]">
          <button onClick={() => setIsAuthenticated(false)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all`}>
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* TOP NAVBAR */}
        <header className={`h-16 flex items-center justify-between px-6 border-b z-10 transition-colors duration-200 ${darkMode ? 'bg-[#1A1033] border-[#3D2A7A]' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold capitalize">{currentView.replace('_', ' ')}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search..." className={`pl-10 pr-4 py-2 rounded-full text-sm outline-none transition-colors ${darkMode ? 'bg-[#1E1244] border-[#3D2A7A] focus:border-[#7C3AED]' : 'bg-gray-100 border-gray-200 focus:border-[#7C3AED]'} border`} />
            </div>
            
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-[#1E1244]' : 'hover:bg-gray-100'}`}>
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-[#1F1235]" />}
            </button>
            
            <button onClick={() => handleViewChange('notifications')} className={`p-2 rounded-full relative transition-colors ${darkMode ? 'hover:bg-[#1E1244]' : 'hover:bg-gray-100'}`}>
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1A1033]"></span>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#0F0A1E]/50 backdrop-blur-sm z-50">
              <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-[#7C3AED] font-bold">Loading...</div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {currentView === 'overview' && <Overview userRole={userRole} changeView={handleViewChange} />}
              {currentView === 'find_professionals' && <FindProfessionals />}
              {currentView === 'appointments' && <Appointments userRole={userRole} showToast={showToast} />}
              {currentView === 'documents' && <Documents userRole={userRole} />}
              {currentView === 'onboarding' && <Onboarding />}
              {currentView === 'clients' && <Clients />}
              {currentView === 'tools' && <Tools showToast={showToast} />}
              {currentView === 'messages' && <Messages />}
              {currentView === 'notifications' && <Notifications />}
              {currentView === 'settings' && <SettingsView userRole={userRole} showToast={showToast} />}
            </div>
          )}
        </main>
      </div>

      {/* TOAST */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50 text-white font-medium ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'success' ? 'bg-green-500' : 'bg-[#7C3AED]'}`}>
          {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ==========================================
// AUTHENTICATION GATE
// ==========================================
function AuthGate({ onLogin, darkMode, setDarkMode }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('Parent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return;
    }
    onLogin(role);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-200 ${darkMode ? 'bg-[#0F0A1E] text-[#F5F3FF]' : 'bg-[#F9F7FF] text-[#1F1235]'}`}>
      <div className="absolute top-6 right-6">
        <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-full bg-white dark:bg-[#1E1244] shadow-md">
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
        </button>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#7C3AED] mb-2">SimplyAbled</h1>
        <p className="text-[#A78BFA] font-medium text-lg">Empowering Every Child. Connecting Every Family.</p>
      </div>

      <div className={`w-full max-w-md p-8 rounded-3xl shadow-xl transition-colors duration-200 ${darkMode ? 'bg-[#1E1244]' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        <div className="flex bg-gray-100 dark:bg-[#1A1033] rounded-xl p-1 mb-6">
          <button onClick={() => setRole('Parent')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${role === 'Parent' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-gray-500'}`}>I am a Parent</button>
          <button onClick={() => setRole('Educator')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${role === 'Educator' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-gray-500'}`}>I am an Educator</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-bold mb-1 block">Full Name</label>
              <input type="text" className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-[#0F0A1E] border-[#3D2A7A]' : 'bg-gray-50 border-gray-200'} outline-none focus:border-[#7C3AED]`} placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label className="text-sm font-bold mb-1 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full px-4 py-3 rounded-xl border ${error && !email ? 'border-red-500' : darkMode ? 'bg-[#0F0A1E] border-[#3D2A7A]' : 'bg-gray-50 border-gray-200'} outline-none focus:border-[#7C3AED]`} placeholder={role === 'Parent' ? 'parent@simplyabled.com' : 'educator@simplyabled.com'} />
          </div>
          
          <div className="relative">
            <label className="text-sm font-bold mb-1 block">Password</label>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className={`w-full px-4 py-3 rounded-xl border ${error && !password ? 'border-red-500' : darkMode ? 'bg-[#0F0A1E] border-[#3D2A7A]' : 'bg-gray-50 border-gray-200'} outline-none focus:border-[#7C3AED]`} placeholder="pass123" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-gray-400">
              <Eye size={18} />
            </button>
          </div>

          <button type="submit" className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-500/30 mt-4">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-medium">
          {isLogin ? (
            <p>Don't have an account? <button onClick={() => setIsLogin(false)} className="text-[#7C3AED] hover:underline">Sign up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setIsLogin(true)} className="text-[#7C3AED] hover:underline">Login</button></p>
          )}
        </div>
        
        {isLogin && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-[#3D2A7A] text-xs text-center text-gray-500">
            <p className="mb-1 font-bold">Mock Credentials:</p>
            <p>Parent: parent@simplyabled.com / pass123</p>
            <p>Educator: educator@simplyabled.com / pass123</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: OVERVIEW
// ==========================================
function Overview({ userRole, changeView }) {
  const AnimatedNumber = ({ end }) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      let start = 0;
      const duration = 1000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) { setVal(end); clearInterval(timer); }
        else { setVal(Math.floor(start)); }
      }, 16);
      return () => clearInterval(timer);
    }, [end]);
    return <span>{val}</span>;
  };

  if (userRole === 'Parent') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] p-8 rounded-3xl text-white shadow-lg">
          <h2 className="text-3xl font-extrabold mb-2">Good morning, John 👋</h2>
          <p className="opacity-90">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Upcoming Appts', val: 2, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { label: 'Documents', val: 8, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { label: 'Professionals', val: 3, icon: Users, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
            { label: 'Unread Msgs', val: 5, icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-black"><AnimatedNumber end={stat.val} /></div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Upcoming Appointments</h3>
              <button onClick={() => changeView('appointments')} className="text-[#7C3AED] text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {mockAppointments.slice(0, 2).map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0F0A1E] rounded-xl border border-gray-200 dark:border-[#3D2A7A]">
                  <div>
                    <div className="font-bold">{apt.name}</div>
                    <div className="text-sm text-gray-500">{apt.date} at {apt.time}</div>
                  </div>
                  <button className="px-4 py-2 bg-[#7C3AED] text-white text-sm font-bold rounded-lg shadow-sm">Join</button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Recent Documents</h3>
              <button onClick={() => changeView('documents')} className="text-[#7C3AED] text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {mockDocuments.slice(0, 3).map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0F0A1E] rounded-xl border border-gray-200 dark:border-[#3D2A7A]">
                  <div className="flex items-center gap-3">
                    <FileText className="text-[#7C3AED]" />
                    <div>
                      <div className="font-bold text-sm">{doc.name}</div>
                      <div className="text-xs text-gray-500">{doc.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] p-8 rounded-3xl text-white shadow-lg">
          <h2 className="text-3xl font-extrabold mb-2">Good morning, Dr. Educator 👋</h2>
          <p className="opacity-90">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Clients', val: 12, icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { label: 'Appts Today', val: 3, icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
            { label: 'Docs Generated', val: 24, icon: FileText, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
            { label: 'Pending Steps', val: 1, icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-black"><AnimatedNumber end={stat.val} /></div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
            <h3 className="text-xl font-bold mb-6">Today's Schedule</h3>
            <div className="space-y-4">
              {mockAppointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0F0A1E] rounded-xl border border-gray-200 dark:border-[#3D2A7A]">
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-lg w-20">{apt.time}</div>
                    <div className="w-1 h-10 bg-[#7C3AED] rounded-full"></div>
                    <div>
                      <div className="font-bold">{apt.name}</div>
                      <div className="text-xs bg-[#EDE9FE] text-[#7C3AED] px-2 py-1 rounded-md inline-block mt-1">{apt.mode} Session</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#7C3AED] text-white text-sm font-bold rounded-lg shadow-sm">Start</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={() => changeView('tools')} className="w-full flex items-center gap-3 p-4 bg-[#F9F7FF] dark:bg-[#1A1033] rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-[#7C3AED] transition-all font-bold">
                <FilePlus className="text-[#7C3AED]" /> New Assessment
              </button>
              <button onClick={() => changeView('tools')} className="w-full flex items-center gap-3 p-4 bg-[#F9F7FF] dark:bg-[#1A1033] rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-[#7C3AED] transition-all font-bold">
                <Wrench className="text-[#7C3AED]" /> Generate IEP
              </button>
              <button onClick={() => changeView('clients')} className="w-full flex items-center gap-3 p-4 bg-[#F9F7FF] dark:bg-[#1A1033] rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-[#7C3AED] transition-all font-bold">
                <UserPlus className="text-[#7C3AED]" /> Add Client
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ==========================================
// VIEW: FIND PROFESSIONALS
// ==========================================
function FindProfessionals() {
  const [search, setSearch] = useState('');
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1E1244] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none focus:border-[#7C3AED]" />
        </div>
        <select className="px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none">
          <option value="">All Departments</option>
          <option>Special Education</option>
          <option>Speech-Language Therapy</option>
          <option>Psychology</option>
          <option>Occupational Therapy</option>
        </select>
        <select className="px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none">
          <option value="">All Cities</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Bangalore</option>
        </select>
        <button className="bg-[#7C3AED] text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-[#6D28D9] transition-colors">Apply Filters</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProfessionals.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
          <div key={p.id} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] text-white flex items-center justify-center font-bold text-xl">{p.name[0]}</div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-1">{p.name} <CheckCircle size={16} className="text-green-500" /></h3>
                <span className="text-xs bg-[#EDE9FE] text-[#7C3AED] px-2 py-1 rounded-md font-bold">{p.dept}</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
              <div className="flex items-center gap-2"><User size={16} /> {p.qual}</div>
              <div className="flex items-center gap-2"><MapPin size={16} /> {p.city} (Online & In-Person)</div>
              <div className="flex items-center gap-2 text-yellow-500 font-bold"><Star size={16} fill="currentColor" /> {p.rating} ({p.reviews} reviews)</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="border-2 border-[#7C3AED] text-[#7C3AED] font-bold py-2 rounded-xl hover:bg-[#EDE9FE] dark:hover:bg-[#1A1033] transition-colors">View Profile</button>
              <button className="bg-[#7C3AED] text-white font-bold py-2 rounded-xl shadow-md hover:bg-[#6D28D9] transition-colors">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: APPOINTMENTS
// ==========================================
function Appointments({ userRole, showToast }) {
  const [tab, setTab] = useState('Upcoming');
  const filtered = mockAppointments.filter(a => tab === 'Upcoming' ? ['Upcoming', 'Pending'].includes(a.status) : a.status === tab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex bg-white dark:bg-[#1E1244] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
          {['Upcoming', 'Completed', 'Cancelled'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${tab === t ? 'bg-[#7C3AED] text-white shadow-md' : 'text-gray-500'}`}>{t}</button>
          ))}
        </div>
        <button className="bg-[#7C3AED] text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-[#6D28D9] flex items-center gap-2">
          <Plus size={18} /> Book New
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-[#1E1244] rounded-3xl p-12 text-center border border-gray-100 dark:border-[#3D2A7A]">
          <Calendar size={64} className="mx-auto text-gray-300 dark:text-[#3D2A7A] mb-4" />
          <h3 className="text-xl font-bold mb-2">No {tab} Appointments</h3>
          <p className="text-gray-500">You don't have any appointments in this category.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(apt => (
            <div key={apt.id} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#EDE9FE] dark:bg-[#1A1033] text-[#7C3AED] rounded-full flex items-center justify-center font-bold text-lg">{apt.name[0]}</div>
                  <div>
                    <div className="font-bold">{apt.name}</div>
                    <div className="text-xs text-gray-500">{apt.type}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-bold ${apt.status==='Upcoming'?'bg-blue-100 text-blue-600':apt.status==='Completed'?'bg-green-100 text-green-600':apt.status==='Pending'?'bg-yellow-100 text-yellow-600':'bg-red-100 text-red-600'}`}>{apt.status}</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2"><Calendar size={16} /> {apt.date}</div>
                <div className="flex items-center gap-2"><Clock size={16} /> {apt.time} ({apt.duration})</div>
                <div className="flex items-center gap-2"><Video size={16} /> {apt.mode} Session</div>
              </div>
              <div className="mt-auto flex gap-2">
                {['Upcoming', 'Pending'].includes(apt.status) && (
                  <>
                    <button className="flex-1 bg-[#7C3AED] text-white font-bold py-2 rounded-xl text-sm">Join</button>
                    <button className="flex-1 border border-gray-200 dark:border-[#3D2A7A] font-bold py-2 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-[#1A1033]">Reschedule</button>
                  </>
                )}
                {apt.status === 'Completed' && (
                  <button className="w-full border border-gray-200 dark:border-[#3D2A7A] font-bold py-2 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-[#1A1033]">View Notes</button>
                )}
                {apt.status === 'Cancelled' && (
                  <button className="w-full bg-[#7C3AED] text-white font-bold py-2 rounded-xl text-sm">Rebook</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// VIEW: DOCUMENTS
// ==========================================
function Documents() {
  const [view, setView] = useState('grid');
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <input type="text" placeholder="Search documents..." className="px-4 py-2 rounded-xl border bg-white dark:bg-[#1E1244] border-gray-200 dark:border-[#3D2A7A] outline-none min-w-[250px]" />
          <button className="p-2 bg-white dark:bg-[#1E1244] border border-gray-200 dark:border-[#3D2A7A] rounded-xl"><Filter size={20}/></button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white dark:bg-[#1E1244] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
            <button onClick={() => setView('grid')} className={`px-4 py-1.5 rounded-lg font-bold text-sm ${view === 'grid' ? 'bg-[#7C3AED] text-white' : 'text-gray-500'}`}>Grid</button>
            <button onClick={() => setView('list')} className={`px-4 py-1.5 rounded-lg font-bold text-sm ${view === 'list' ? 'bg-[#7C3AED] text-white' : 'text-gray-500'}`}>List</button>
          </div>
          <button className="bg-[#7C3AED] text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-[#6D28D9] flex items-center gap-2">
            <Plus size={18} /> New Doc
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockDocuments.map(doc => (
          <div key={doc.id} className="bg-white dark:bg-[#1E1244] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] group hover:border-[#7C3AED] transition-colors cursor-pointer">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${doc.type==='IEP'?'bg-purple-100 text-purple-600':doc.type==='Assessment'?'bg-blue-100 text-blue-600':'bg-green-100 text-green-600'}`}>
              <FileText size={24} />
            </div>
            <h4 className="font-bold mb-1 truncate" title={doc.name}>{doc.name}</h4>
            <div className="text-xs font-bold text-gray-500 mb-4">{doc.type} • {doc.child}</div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-[#3D2A7A]">
              <span className="text-xs text-gray-400">{doc.date}</span>
              <div className="flex gap-2">
                <button className="p-1.5 text-gray-400 hover:text-[#7C3AED] bg-gray-50 dark:bg-[#1A1033] rounded-lg"><Eye size={16} /></button>
                <button className="p-1.5 text-gray-400 hover:text-[#7C3AED] bg-gray-50 dark:bg-[#1A1033] rounded-lg"><Download size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: ONBOARDING
// ==========================================
function Onboarding() {
  const [step, setStep] = useState(1);
  const steps = ["Basic Info", "Credentials", "Services", "Uploads", "Submit"];
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between relative before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-1 before:bg-gray-200 dark:before:bg-[#3D2A7A] before:-z-10">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2 bg-[#F9F7FF] dark:bg-[#0F0A1E] px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-[#F9F7FF] dark:border-[#0F0A1E] ${step > i+1 ? 'bg-green-500 text-white' : step === i+1 ? 'bg-[#7C3AED] text-white shadow-[0_0_0_4px_rgba(124,58,237,0.2)]' : 'bg-gray-200 dark:bg-[#3D2A7A] text-gray-500'}`}>
              {step > i+1 ? <CheckCircle size={20} /> : i+1}
            </div>
            <span className={`text-xs font-bold ${step === i+1 ? 'text-[#7C3AED]' : 'text-gray-500'}`}>{s}</span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1E1244] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h3 className="text-2xl font-bold border-b border-gray-100 dark:border-[#3D2A7A] pb-4">Basic Information</h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#1A1033] border-2 border-dashed border-gray-300 dark:border-[#3D2A7A] flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                <Upload size={24} className="mb-1" />
                <span className="text-xs font-bold">Photo</span>
              </div>
              <div className="flex-1 space-y-4">
                <div><label className="text-sm font-bold block mb-1">Full Name</label><input type="text" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" defaultValue="Dr. Educator" /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div><label className="text-sm font-bold block mb-1">City</label><input type="text" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" /></div>
              <div><label className="text-sm font-bold block mb-1">Languages</label><input type="text" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" placeholder="English, Hindi..." /></div>
            </div>
            <div><label className="text-sm font-bold block mb-1">Bio</label><textarea rows="4" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none"></textarea></div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h3 className="text-2xl font-bold border-b border-gray-100 dark:border-[#3D2A7A] pb-4">Professional Credentials</h3>
            <div className="grid grid-cols-2 gap-6">
              <div><label className="text-sm font-bold block mb-1">Specialization</label><select className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none"><option>Special Education</option></select></div>
              <div><label className="text-sm font-bold block mb-1">Highest Qualification</label><input type="text" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" /></div>
              <div><label className="text-sm font-bold block mb-1">Registration Number</label><input type="text" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" /></div>
              <div><label className="text-sm font-bold block mb-1">Years of Experience</label><input type="number" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" /></div>
            </div>
          </div>
        )}

        {step > 2 && (
          <div className="text-center py-12 animate-in fade-in">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
            <h3 className="text-2xl font-bold mb-2">Step {step} Simulation</h3>
            <p className="text-gray-500">In a full backend setup, this would save to the profiles table.</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 dark:border-[#3D2A7A]">
          <button onClick={() => setStep(Math.max(1, step-1))} disabled={step === 1} className="px-6 py-3 font-bold text-gray-500 disabled:opacity-30">Back</button>
          <button onClick={() => setStep(Math.min(5, step+1))} className="px-8 py-3 bg-[#7C3AED] text-white font-bold rounded-xl shadow-md hover:bg-[#6D28D9] transition-all">
            {step === 5 ? 'Submit Profile' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW: CLIENTS
// ==========================================
function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input type="text" placeholder="Search clients..." className="flex-1 px-4 py-3 rounded-xl border bg-white dark:bg-[#1E1244] border-gray-200 dark:border-[#3D2A7A] outline-none" />
        <button className="bg-[#7C3AED] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#6D28D9] flex items-center gap-2">
          <UserPlus size={18} /> Add Client
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {mockClients.map(c => (
          <div key={c.id} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">{c.name[0]}</div>
              <div>
                <h3 className="font-bold text-lg">{c.name} ({c.age})</h3>
                <span className="text-xs bg-gray-100 dark:bg-[#1A1033] px-2 py-1 rounded-md font-bold">{c.condition}</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div><strong>Parent:</strong> {c.parent}</div>
              <div><strong>Last Session:</strong> {c.lastSession}</div>
              <div><strong>Total Sessions:</strong> {c.sessions}</div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 border-2 border-[#7C3AED] text-[#7C3AED] font-bold py-2 rounded-xl text-sm">View Profile</button>
              <button className="flex-1 bg-[#7C3AED] text-white font-bold py-2 rounded-xl text-sm">Add Note</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: TOOLS
// ==========================================
function Tools({ showToast }) {
  const tools = [
    { title: "M-CHAT Assessment", desc: "Interactive screening tool for autism risk in toddlers.", icon: FileText, color: "bg-blue-500" },
    { title: "IEP Generator", desc: "Create complete Individualized Education Programs.", icon: FilePlus, color: "bg-purple-500" },
    { title: "ITP Generator", desc: "Build Individual Transition Plans for older students.", icon: Shield, color: "bg-orange-500" },
    { title: "Lesson Plan Builder", desc: "Weekly differentiated lesson plans tailored to conditions.", icon: Calendar, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1A1033] to-[#3D2A7A] p-10 rounded-3xl text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold mb-2">Professional AI Tools</h2>
          <p className="opacity-80 max-w-lg text-lg">Streamline your workflow with AI-powered document generation designed specifically for special educators in India.</p>
        </div>
        <Wrench size={80} className="opacity-20 hidden md:block" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((t, i) => (
          <div key={i} className="bg-white dark:bg-[#1E1244] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] hover:border-[#7C3AED] transition-colors group cursor-pointer" onClick={() => showToast('Opening ' + t.title + ' simulator...', 'success')}>
            <div className={`${t.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <t.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3">{t.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">{t.desc}</p>
            <button className="text-[#7C3AED] font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
              Open Tool <ChevronRight size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: MESSAGES
// ==========================================
function Messages() {
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-[#1E1244] rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] overflow-hidden">
      <div className="w-1/3 border-r border-gray-100 dark:border-[#3D2A7A] flex flex-col">
        <div className="p-4 border-b border-gray-100 dark:border-[#3D2A7A]">
          <input type="text" placeholder="Search chats..." className="w-full bg-gray-50 dark:bg-[#0F0A1E] px-4 py-2.5 rounded-xl outline-none" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map(c => (
            <div key={c.id} onClick={() => setActiveChat(c)} className={`p-4 border-b border-gray-50 dark:border-[#1A1033] cursor-pointer flex gap-4 transition-colors ${activeChat?.id === c.id ? 'bg-[#F9F7FF] dark:bg-[#3D2A7A]/30' : 'hover:bg-gray-50 dark:hover:bg-[#1A1033]'}`}>
              <div className="w-12 h-12 bg-[#EDE9FE] dark:bg-[#3D2A7A] text-[#7C3AED] rounded-full flex items-center justify-center font-bold flex-shrink-0">{c.name[0]}</div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold truncate">{c.name}</span>
                  <span className="text-xs text-gray-400">{c.time}</span>
                </div>
                <div className="text-sm text-gray-500 truncate">{c.preview}</div>
              </div>
              {c.unread > 0 && <div className="w-5 h-5 bg-[#7C3AED] text-white text-xs rounded-full flex items-center justify-center font-bold">{c.unread}</div>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#0F0A1E]">
        <div className="p-4 bg-white dark:bg-[#1E1244] border-b border-gray-100 dark:border-[#3D2A7A] flex items-center gap-4">
          <div className="w-10 h-10 bg-[#EDE9FE] dark:bg-[#3D2A7A] text-[#7C3AED] rounded-full flex items-center justify-center font-bold">{activeChat?.name[0]}</div>
          <h3 className="font-bold">{activeChat?.name}</h3>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#1E1244] p-4 rounded-2xl rounded-tl-none max-w-[70%] shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              Hello! This is a mock chat history.
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#7C3AED] text-white p-4 rounded-2xl rounded-tr-none max-w-[70%] shadow-sm">
              Great, thank you!
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#1E1244] p-4 rounded-2xl rounded-tl-none max-w-[70%] shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              {activeChat?.preview}
            </div>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-[#1E1244] border-t border-gray-100 dark:border-[#3D2A7A] flex gap-2">
          <button className="p-3 text-gray-400 hover:text-[#7C3AED] bg-gray-50 dark:bg-[#0F0A1E] rounded-xl"><Paperclip size={20} /></button>
          <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-50 dark:bg-[#0F0A1E] px-4 py-3 rounded-xl outline-none" />
          <button className="p-3 bg-[#7C3AED] text-white rounded-xl shadow-md hover:bg-[#6D28D9]"><Send size={20} /></button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW: NOTIFICATIONS
// ==========================================
function Notifications() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <button className="text-[#7C3AED] font-bold text-sm hover:underline">Mark all as read</button>
      </div>
      <div className="bg-white dark:bg-[#1E1244] rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] overflow-hidden">
        {mockNotifications.map(n => (
          <div key={n.id} className={`p-6 border-b border-gray-50 dark:border-[#3D2A7A] flex gap-4 ${n.unread ? 'bg-[#F9F7FF] dark:bg-[#3D2A7A]/20' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${n.type==='Appointment'?'bg-blue-100 text-blue-600':n.type==='Document'?'bg-purple-100 text-purple-600':n.type==='Message'?'bg-orange-100 text-orange-600':'bg-gray-100 text-gray-600'}`}>
              <Bell size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <h4 className="font-bold text-lg">{n.title}</h4>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400">{n.desc}</p>
            </div>
            {n.unread && <div className="w-3 h-3 bg-[#7C3AED] rounded-full mt-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: SETTINGS
// ==========================================
function SettingsView({ showToast }) {
  const [tab, setTab] = useState('Profile');
  const [pass, setPass] = useState('');
  
  const getStrength = (p) => {
    if(p.length === 0) return { label: '', color: 'bg-gray-200' };
    if(p.length < 6) return { label: 'Weak', color: 'bg-red-500 w-1/3' };
    if(p.length < 10) return { label: 'Fair', color: 'bg-yellow-500 w-2/3' };
    return { label: 'Strong', color: 'bg-green-500 w-full' };
  };
  const strength = getStrength(pass);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex bg-white dark:bg-[#1E1244] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] mb-8 overflow-x-auto">
        {['Profile', 'Security', 'Notifications', 'Privacy'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${tab === t ? 'bg-[#7C3AED] text-white shadow-md' : 'text-gray-500'}`}>{t}</button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1E1244] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
        {tab === 'Profile' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-gray-100 dark:border-[#3D2A7A] pb-4">Profile Information</h3>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-[#7C3AED] text-white rounded-full flex items-center justify-center text-3xl font-bold">JD</div>
              <button className="border-2 border-[#7C3AED] text-[#7C3AED] font-bold px-4 py-2 rounded-xl">Change Photo</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="text-sm font-bold block mb-1">Full Name</label><input type="text" defaultValue="John Doe" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" /></div>
              <div><label className="text-sm font-bold block mb-1">Email</label><input type="email" defaultValue="john@example.com" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" /></div>
              <div className="md:col-span-2"><label className="text-sm font-bold block mb-1">Bio</label><textarea rows="3" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none"></textarea></div>
            </div>
            <button onClick={() => showToast('Profile saved!', 'success')} className="bg-[#7C3AED] text-white font-bold px-8 py-3 rounded-xl shadow-md mt-4">Save Changes</button>
          </div>
        )}

        {tab === 'Security' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold border-b border-gray-100 dark:border-[#3D2A7A] pb-4 mb-6">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <input type="password" placeholder="Current Password" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" />
                <div>
                  <input type="password" placeholder="New Password" value={pass} onChange={e=>setPass(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" />
                  <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-[#3D2A7A] rounded-full overflow-hidden flex">
                    <div className={`h-full transition-all ${strength.color}`}></div>
                  </div>
                  <div className="text-xs font-bold text-gray-500 mt-1 text-right">{strength.label}</div>
                </div>
                <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#0F0A1E] border-gray-200 dark:border-[#3D2A7A] outline-none" />
                <button onClick={() => { if(pass.length>5) { showToast('Password updated successfully ✅', 'success'); setPass(''); } else showToast('Password too weak', 'error'); }} className="bg-[#7C3AED] text-white font-bold px-8 py-3 rounded-xl shadow-md w-full">Update Password</button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold border-b border-gray-100 dark:border-[#3D2A7A] pb-4 mb-6 text-red-500">Danger Zone</h3>
              <button onClick={() => showToast('Sessions revoked.', 'info')} className="border-2 border-red-500 text-red-500 font-bold px-6 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">Log out of all devices</button>
            </div>
          </div>
        )}

        {(tab === 'Notifications' || tab === 'Privacy') && (
          <div className="text-center py-12 text-gray-500">
            <Settings size={48} className="mx-auto mb-4 opacity-50" />
            <p>Mock toggle settings for {tab} would appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
