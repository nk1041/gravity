import React, { useState, useEffect } from 'react';
import { 
  Home, Users, Calendar, FileText, MessageSquare, Bell, Settings, LogOut, 
  Menu, Search, Moon, Sun, ChevronLeft, ChevronRight, CheckCircle, Clock, 
  X, Upload, Plus, Download, Edit, Star, MapPin, Video, User, Lock, Eye, 
  EyeOff, Shield, Trash2, ArrowRight, Activity, BookOpen, CheckSquare, 
  Filter, MoreVertical, Paperclip, Send, Folder
} from 'lucide-react';

// --- MOCK DATA ---
const indianProfessionals = [
  { name: "Dr. Priya Nair", dept: "Speech-Language Therapy", qual: "M.Sc. SLP", city: "Chennai", rating: 4.9, reviews: 120, mode: "Online & In-Person" },
  { name: "Dr. Arjun Mehta", dept: "Clinical Psychology", qual: "Ph.D. Psychology", city: "Mumbai", rating: 4.8, reviews: 95, mode: "Online" },
  { name: "Ms. Kavitha Ramachandran", dept: "Special Education", qual: "M.Ed. Special Education", city: "Bangalore", rating: 5.0, reviews: 150, mode: "In-Person" },
  { name: "Dr. Sunita Sharma", dept: "Occupational Therapy", qual: "MOT", city: "Delhi", rating: 4.7, reviews: 88, mode: "Online & In-Person" },
  { name: "Ms. Deepa Krishnamurthy", dept: "Occupational Therapy", qual: "BOT", city: "Hyderabad", rating: 4.7, reviews: 76, mode: "In-Person" },
  { name: "Mr. Rohit Verma", dept: "Behavioral Therapy", qual: "M.A. Psychology", city: "Pune", rating: 4.6, reviews: 60, mode: "Online" },
  { name: "Dr. Ananya Bose", dept: "Speech-Language Therapy", qual: "Ph.D. SLP", city: "Kolkata", rating: 4.9, reviews: 110, mode: "Online & In-Person" },
  { name: "Ms. Meena Pillai", dept: "Occupational Therapy", qual: "OT (SI)", city: "Kochi", rating: 4.8, reviews: 130, mode: "In-Person" },
  { name: "Dr. Rajeev Kulkarni", dept: "Special Education", qual: "M.Ed. Special Education", city: "Pune", rating: 5.0, reviews: 200, mode: "Online" },
  { name: "Ms. Shreya Iyer", dept: "Clinical Psychology", qual: "M.Phil Psychology", city: "Bangalore", rating: 4.5, reviews: 45, mode: "Online & In-Person" },
  { name: "Mr. Vikram Nambiar", dept: "Physical Therapy", qual: "MPT", city: "Chennai", rating: 4.8, reviews: 85, mode: "In-Person" },
  { name: "Dr. Pooja Agarwal", dept: "Child Psychiatry", qual: "MD Psychiatry", city: "Delhi", rating: 4.9, reviews: 140, mode: "Online" },
  { name: "Ms. Lakshmi Venkatesh", dept: "Special Education", qual: "B.Ed. Special Education", city: "Hyderabad", rating: 4.6, reviews: 55, mode: "Online & In-Person" },
  { name: "Dr. Suresh Menon", dept: "Behavioral Therapy", qual: "Ph.D. ABA", city: "Mumbai", rating: 4.7, reviews: 90, mode: "In-Person" },
  { name: "Ms. Neha Joshi", dept: "Speech-Language Therapy", qual: "M.Sc. SLP", city: "Jaipur", rating: 4.7, reviews: 65, mode: "Online & In-Person" }
];

const mockDocuments = [
  { id: 1, title: "Aarav's IEP – Q3 2025", type: "IEP", client: "Aarav M.", date: "2025-07-15", author: "Ms. Kavitha R." },
  { id: 2, title: "Autism Assessment Report – June 2025", type: "Assessment", client: "Priya S.", date: "2025-06-20", author: "Dr. Arjun M." },
  { id: 3, title: "Weekly Lesson Plan – July Week 1", type: "Lesson Plan", client: "Rohan I.", date: "2025-07-01", author: "Dr. Rajeev K." },
  { id: 4, title: "ITP – Transition Goals 2025", type: "ITP", client: "Ananya K.", date: "2025-05-10", author: "Ms. Lakshmi V." },
  { id: 5, title: "Speech Progress Report", type: "Progress Report", client: "Kabir V.", date: "2025-04-22", author: "Dr. Priya N." },
  { id: 6, title: "Sensory Diet Plan", type: "Lesson Plan", client: "Aarav M.", date: "2025-03-15", author: "Ms. Deepa K." },
  { id: 7, title: "Aarav's IEP – Q1 2025", type: "IEP", client: "Aarav M.", date: "2025-01-10", author: "Ms. Kavitha R." },
  { id: 8, title: "Behavioral Assessment – April 2025", type: "Assessment", client: "Rohan I.", date: "2025-04-05", author: "Mr. Rohit V." }
];

const mockClients = [
  { id: 1, name: "Aarav Mehta", age: 8, condition: "Autism", parent: "Sneha Mehta", lastSession: "2025-08-01", sessions: 12 },
  { id: 2, name: "Priya Sharma", age: 6, condition: "Speech Delay", parent: "Rahul Sharma", lastSession: "2025-08-03", sessions: 8 },
  { id: 3, name: "Rohan Iyer", age: 10, condition: "ADHD", parent: "Karthik Iyer", lastSession: "2025-07-28", sessions: 15 },
  { id: 4, name: "Ananya Krishnan", age: 7, condition: "Down Syndrome", parent: "Meera Krishnan", lastSession: "2025-08-05", sessions: 20 },
  { id: 5, name: "Kabir Verma", age: 9, condition: "Learning Disability", parent: "Pooja Verma", lastSession: "2025-07-30", sessions: 5 }
];

const mockConversations = [
  { id: 1, name: "Dr. Priya Nair", lastMsg: "See you on Thursday!", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Sneha Mehta", lastMsg: "Thanks for the updated IEP.", time: "Yesterday", unread: 0 },
  { id: 3, name: "Mr. Rohit Verma", lastMsg: "Could we reschedule?", time: "Mon", unread: 1 },
  { id: 4, name: "Pooja Verma", lastMsg: "Kabir had a great day today.", time: "Last Week", unread: 0 }
];

const mockNotifications = [
  { id: 1, type: 'appointment', title: "Appointment Confirmed", desc: "Dr. Priya Nair confirmed your slot for Aug 12.", time: "2h ago", unread: true },
  { id: 2, type: 'document', title: "IEP Generated", desc: "Aarav's Q3 IEP is ready to view.", time: "5h ago", unread: true },
  { id: 3, type: 'message', title: "New Message", desc: "Sneha Mehta sent you a message.", time: "1d ago", unread: false },
  { id: 4, type: 'system', title: "Profile Verified", desc: "Your professional credentials have been approved.", time: "2d ago", unread: false }
];

// --- UTILS ---
const AnimatedNumber = ({ end, duration = 1000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return <span>{count}</span>;
};

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const EmptyState = ({ icon: Icon, title, message, action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-[#1E1244] rounded-2xl border border-gray-100 dark:border-[#3D2A7A]">
    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">{message}</p>
    {action && action}
  </div>
);

// --- VIEWS ---

const Overview = ({ role, profile, changeView }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-purple-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <Activity size={300} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Good morning, {profile?.full_name?.split(' ')[0] || 'User'} 👋</h1>
        <p className="text-purple-100 text-lg">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {role === 'Parent' ? (
        <>
          {/* PARENT STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Upcoming Appointments', count: 2, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { label: 'Documents Generated', count: 8, icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10' },
              { label: 'Active Professionals', count: 3, icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { label: 'Unread Messages', count: 5, icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex items-center gap-4">
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={28} /></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white"><AnimatedNumber end={stat.count} /></div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => changeView('find_professionals')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left group">
                  <Calendar className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-gray-900 dark:text-white">Book Appointment</div>
                </button>
                <button onClick={() => changeView('find_professionals')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left group">
                  <Search className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-gray-900 dark:text-white">Find Professional</div>
                </button>
                <button onClick={() => changeView('documents')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left group">
                  <FileText className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-gray-900 dark:text-white">View Documents</div>
                </button>
                <button onClick={() => changeView('messages')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left group">
                  <MessageSquare className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-gray-900 dark:text-white">Send Message</div>
                </button>
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Appointments</h2>
                <button onClick={() => changeView('appointments')} className="text-primary text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1A1033] rounded-xl border border-gray-100 dark:border-[#3D2A7A]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">DP</div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Dr. Priya Nair</div>
                        <div className="text-sm text-gray-500">Speech-Language Therapy</div>
                        <div className="text-sm text-primary font-medium mt-1">Tomorrow, 10:30 AM • Online</div>
                      </div>
                    </div>
                    <button className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md">Join</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* EDUCATOR STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Clients', count: 12, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { label: 'Appointments Today', count: 3, icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { label: 'Documents Generated', count: 24, icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10' },
              { label: 'Pending Onboarding', count: 1, icon: CheckSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex items-center gap-4">
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={28} /></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white"><AnimatedNumber end={stat.count} /></div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Schedule */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Schedule</h2>
                <button onClick={() => changeView('appointments')} className="text-primary text-sm font-bold hover:underline">View Calendar</button>
              </div>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-[#3D2A7A] before:to-transparent">
                {[
                  { time: '09:00 AM', name: 'Aarav Mehta', type: 'Assessment', mode: 'In-Person' },
                  { time: '11:30 AM', name: 'Priya Sharma', type: 'Therapy', mode: 'Online' },
                  { time: '02:00 PM', name: 'Rohan Iyer', type: 'Consultation', mode: 'Online' }
                ].map((apt, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#1E1244] bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Clock size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] bg-gray-50 dark:bg-[#1A1033] shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-gray-900 dark:text-white">{apt.name}</div>
                        <div className="text-sm font-bold text-primary">{apt.time}</div>
                      </div>
                      <div className="text-sm text-gray-500 flex justify-between items-center">
                        <span>{apt.type} • {apt.mode}</span>
                        <button className="text-xs bg-primary text-white px-3 py-1 rounded-full font-medium hover:bg-purple-700">Start</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4">
                <button onClick={() => changeView('tools')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] bg-gray-50 dark:bg-[#1A1033] hover:border-primary transition-all text-left flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Activity size={20} /></div>
                  <div className="font-bold text-gray-900 dark:text-white">New Assessment</div>
                </button>
                <button onClick={() => changeView('tools')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] bg-gray-50 dark:bg-[#1A1033] hover:border-primary transition-all text-left flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><FileCheck size={20} /></div>
                  <div className="font-bold text-gray-900 dark:text-white">Generate IEP</div>
                </button>
                <button onClick={() => changeView('clients')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] bg-gray-50 dark:bg-[#1A1033] hover:border-primary transition-all text-left flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg"><User size={20} /></div>
                  <div className="font-bold text-gray-900 dark:text-white">Add Client</div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FindProfessionals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  
  const filteredPros = indianProfessionals.filter(p => {
    return (
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (deptFilter === '' || p.dept === deptFilter) &&
      (cityFilter === '' || p.city === cityFilter)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find the Right Expert</h1>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1E1244] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" placeholder="Search by name..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary text-gray-900 dark:text-white"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary text-gray-900 dark:text-white">
          <option value="">All Departments</option>
          <option value="Special Education">Special Education</option>
          <option value="Speech-Language Therapy">Speech Therapy</option>
          <option value="Occupational Therapy">Occupational Therapy</option>
          <option value="Clinical Psychology">Psychology</option>
        </select>
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary text-gray-900 dark:text-white">
          <option value="">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPros.map((pro, i) => (
          <div key={i} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] hover:shadow-lg transition-all flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                {getInitials(pro.name)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-1">
                  {pro.name} <CheckCircle size={16} className="text-green-500" />
                </h3>
                <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold mt-1 mb-2">{pro.dept}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pro.qual}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1">
              <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> {pro.city}</div>
              <div className="flex items-center gap-2"><Video size={16} className="text-gray-400"/> {pro.mode}</div>
              <div className="flex items-center gap-2 col-span-2 text-yellow-500 font-medium">
                <Star size={16} className="fill-current" /> {pro.rating} ({pro.reviews} reviews)
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <button className="flex-1 py-2.5 border border-primary text-primary hover:bg-primary/5 rounded-xl font-bold transition-colors">Profile</button>
              <button className="flex-1 py-2.5 bg-primary hover:bg-purple-700 text-white rounded-xl font-bold shadow-md transition-colors">Book Now</button>
            </div>
          </div>
        ))}
      </div>
      {filteredPros.length === 0 && <EmptyState icon={Users} title="No Professionals Found" message="Try adjusting your filters to see more results." />}
    </div>
  );
};

const MyAppointments = () => {
  const [tab, setTab] = useState('upcoming');
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
        <button className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2">
          <Plus size={18} /> New Appointment
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-[#3D2A7A]">
        {['upcoming', 'past', 'cancelled'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`pb-3 px-2 font-bold capitalize transition-colors ${tab === t ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'upcoming' ? (
        <div className="grid gap-4">
          <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">PN</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Dr. Priya Nair</h3>
                <p className="text-gray-500 text-sm">Speech-Language Therapy</p>
                <div className="flex items-center gap-4 mt-2 text-sm font-medium">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Confirmed</span>
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300"><Calendar size={14}/> Aug 12, 2025</span>
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300"><Clock size={14}/> 10:30 AM (45m)</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 dark:border-[#3D2A7A] hover:bg-gray-50 dark:hover:bg-[#1A1033] rounded-xl font-bold transition-colors">Reschedule</button>
              <button className="flex-1 md:flex-none px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-sm transition-colors">Join Session</button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState icon={Calendar} title={`No ${tab} appointments`} message={`You don't have any ${tab} appointments to show.`} />
      )}
    </div>
  );
};

const MyDocuments = () => {
  const [view, setView] = useState('list');
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Documents</h1>
        <button className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2">
          <Plus size={18} /> Generate New
        </button>
      </div>

      <div className="bg-white dark:bg-[#1E1244] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
          <input type="text" placeholder="Search documents..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary text-gray-900 dark:text-white" />
        </div>
        <select className="px-4 py-2 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary text-gray-900 dark:text-white hidden md:block">
          <option>All Types</option>
          <option>IEP</option>
          <option>Assessment</option>
          <option>Lesson Plan</option>
        </select>
      </div>

      <div className="bg-white dark:bg-[#1E1244] rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1A1033] border-b border-gray-200 dark:border-[#3D2A7A]">
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Name</th>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Type</th>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Client</th>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Date</th>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-100 dark:border-[#3D2A7A] hover:bg-gray-50 dark:hover:bg-[#1A1033]/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${doc.type === 'IEP' ? 'bg-purple-100 text-purple-600' : doc.type === 'Assessment' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      <FileText size={20} />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{doc.title}</span>
                  </td>
                  <td className="p-4"><span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-medium">{doc.type}</span></td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{doc.client}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{doc.date}</td>
                  <td className="p-4 flex gap-2">
                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"><Eye size={18}/></button>
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Download size={18}/></button>
                    <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const EducatorOnboarding = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Professional Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Please provide your details to get verified and listed on the platform.</p>
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10 -translate-y-1/2"></div>
        {[1,2,3,4,5].map(s => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-gray-50 dark:border-[#0A0514] transition-colors ${step === s ? 'bg-primary text-white scale-110' : step > s ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
            {step > s ? <Check size={18}/> : s}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1E1244] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4">Step 1: Basic Information</h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                <Upload size={24} />
              </div>
              <button className="px-4 py-2 border border-primary text-primary rounded-xl font-bold hover:bg-primary/5">Upload Photo</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="font-semibold text-sm">Full Name</label><input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary" defaultValue="Educator Name" /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">City</label><input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary" placeholder="e.g. Mumbai" /></div>
              <div className="space-y-2 md:col-span-2"><label className="font-semibold text-sm">Short Bio</label><textarea rows="3" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary" placeholder="Tell parents about your approach..." /></div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-100 dark:border-gray-800 pb-4">Step 2: Professional Credentials</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="font-semibold text-sm">Specialization</label><select className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none"><option>Special Education</option></select></div>
              <div className="space-y-2"><label className="font-semibold text-sm">Highest Qualification</label><input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" placeholder="e.g. M.Ed." /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">Registration Number (RCI etc.)</label><input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">Years of Experience</label><input type="number" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" /></div>
            </div>
          </div>
        )}
        {step > 2 && (
          <EmptyState icon={CheckSquare} title="Demo Mode" message="Additional onboarding steps (3-5) are structural in this demo." />
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <button disabled={step === 1} onClick={() => setStep(s => s-1)} className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-bold disabled:opacity-50">Previous</button>
          {step < 5 ? (
            <button onClick={() => setStep(s => s+1)} className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-purple-700">Next Step</button>
          ) : (
            <button className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold shadow-md hover:bg-green-600">Submit for Verification</button>
          )}
        </div>
      </div>
    </div>
  );
};

const MyClients = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Clients</h1>
      <button className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2">
        <Plus size={18} /> Add Client
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockClients.map(client => (
        <div key={client.id} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-col">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl shrink-0">{getInitials(client.name)}</div>
            <div>
              <h3 className="font-bold text-lg">{client.name} ({client.age})</h3>
              <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded text-xs font-medium mt-1">{client.condition}</span>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
            <div className="flex justify-between"><span>Parent:</span> <span className="font-medium text-gray-900 dark:text-white">{client.parent}</span></div>
            <div className="flex justify-between"><span>Total Sessions:</span> <span className="font-medium text-gray-900 dark:text-white">{client.sessions}</span></div>
            <div className="flex justify-between"><span>Last Session:</span> <span className="font-medium text-gray-900 dark:text-white">{client.lastSession}</span></div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 border border-gray-200 dark:border-[#3D2A7A] rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-[#1A1033] transition-colors">Profile</button>
            <button className="flex-1 py-2 border border-primary text-primary rounded-lg font-bold hover:bg-primary/5 transition-colors">Add Note</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EducatorTools = () => {
  const tools = [
    { title: "Child Assessment", desc: "Standardized screening and behavioral observation checklists.", icon: Activity, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "IEP Generator", desc: "AI-assisted Individualized Education Program creation.", icon: FileCheck, color: "text-purple-500", bg: "bg-purple-100" },
    { title: "ITP Generator", desc: "Transition planning tools for students 14+.", icon: ArrowRight, color: "text-orange-500", bg: "bg-orange-100" },
    { title: "Lesson Plan Builder", desc: "Differentiated daily/weekly lesson plans.", icon: BookOpen, color: "text-green-500", bg: "bg-green-100" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Professional Tools</h1>
        <p className="text-gray-500 dark:text-gray-400">Streamline your documentation with our AI-powered templates.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((t, i) => (
          <div key={i} className="bg-white dark:bg-[#1E1244] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] hover:border-primary transition-all group cursor-pointer">
            <div className={`w-16 h-16 rounded-2xl ${t.bg} ${t.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <t.icon size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">{t.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{t.desc}</p>
            <button className="flex items-center gap-2 text-primary font-bold hover:underline">
              Open Tool <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Messages = () => (
  <div className="h-[calc(100vh-8rem)] flex bg-white dark:bg-[#1E1244] rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] overflow-hidden animate-fade-in">
    {/* Sidebar */}
    <div className="w-full md:w-1/3 border-r border-gray-100 dark:border-[#3D2A7A] flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 dark:border-[#3D2A7A]">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-lg outline-none focus:border-primary text-sm text-gray-900 dark:text-white" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {mockConversations.map(c => (
          <div key={c.id} className="p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1A1033] cursor-pointer flex gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">{getInitials(c.name)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-sm truncate dark:text-white">{c.name}</h4>
                <span className="text-xs text-gray-400">{c.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{c.lastMsg}</p>
            </div>
            {c.unread > 0 && <div className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">{c.unread}</div>}
          </div>
        ))}
      </div>
    </div>
    {/* Chat area */}
    <div className="hidden md:flex flex-col flex-1 bg-gray-50 dark:bg-[#0A0514]">
      <div className="p-4 bg-white dark:bg-[#1E1244] border-b border-gray-100 dark:border-[#3D2A7A] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">PN</div>
        <h3 className="font-bold dark:text-white">Dr. Priya Nair</h3>
      </div>
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
        <div className="self-center bg-gray-200 dark:bg-gray-800 text-gray-500 text-xs px-3 py-1 rounded-full">Today</div>
        <div className="self-start max-w-[70%] bg-white dark:bg-[#1E1244] border border-gray-100 dark:border-[#3D2A7A] p-3 rounded-2xl rounded-tl-sm shadow-sm text-gray-900 dark:text-white">
          Hello! Just confirming our session for tomorrow.
          <div className="text-[10px] text-gray-400 mt-1 text-right">10:00 AM</div>
        </div>
        <div className="self-end max-w-[70%] bg-primary text-white p-3 rounded-2xl rounded-tr-sm shadow-sm">
          Yes, we will be there. See you on Thursday!
          <div className="text-[10px] text-purple-200 mt-1 text-right">10:30 AM</div>
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-[#1E1244] border-t border-gray-100 dark:border-[#3D2A7A] flex gap-2">
        <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Paperclip size={20}/></button>
        <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-full px-4 outline-none focus:border-primary dark:text-white" />
        <button className="p-2 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors"><Send size={18}/></button>
      </div>
    </div>
  </div>
);

const NotificationsView = () => (
  <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
      <button className="text-primary font-bold text-sm hover:underline">Mark all as read</button>
    </div>
    <div className="flex gap-4 border-b border-gray-200 dark:border-[#3D2A7A] mb-4 overflow-x-auto pb-2">
      {['All', 'Appointments', 'Documents', 'System'].map((t, i) => (
        <button key={i} className={`pb-2 px-2 font-bold whitespace-nowrap transition-colors ${i === 0 ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
          {t}
        </button>
      ))}
    </div>
    <div className="space-y-3">
      {mockNotifications.map(n => (
        <div key={n.id} className={`p-4 rounded-xl border flex gap-4 transition-colors ${n.unread ? 'bg-primary/5 border-primary/20' : 'bg-white dark:bg-[#1E1244] border-gray-100 dark:border-[#3D2A7A]'}`}>
          <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.type === 'appointment' ? 'bg-blue-100 text-blue-600' : n.type === 'document' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
            {n.type === 'appointment' ? <Calendar size={18}/> : n.type === 'document' ? <FileText size={18}/> : <Bell size={18}/>}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{n.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{n.desc}</p>
            <span className="text-xs text-gray-400 mt-2 block">{n.time}</span>
          </div>
          {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
        </div>
      ))}
    </div>
  </div>
);

const AccountSettings = () => {
  const [tab, setTab] = useState('Profile');
  const [pw, setPw] = useState('');
  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : (/[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw) ? 3 : 2);
  const colors = ['bg-gray-200 dark:bg-gray-700', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h1>
      
      <div className="flex gap-4 border-b border-gray-200 dark:border-[#3D2A7A] mb-8 overflow-x-auto">
        {['Profile', 'Security', 'Notifications', 'Privacy'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`pb-3 px-4 font-bold transition-colors whitespace-nowrap ${tab === t ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1E1244] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
        {tab === 'Profile' && (
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-2xl">U</div>
              <button className="px-4 py-2 border border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-colors">Change Photo</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="font-semibold text-sm">Full Name</label><input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" defaultValue="Current User" /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">Email Address</label><input type="email" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" defaultValue="user@example.com" disabled /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">Phone Number</label><input type="tel" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">City</label><input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" /></div>
            </div>
            <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition-colors">Save Changes</button>
          </div>
        )}

        {tab === 'Security' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Lock size={20}/> Change Password</h3>
              <div className="space-y-4 max-w-md">
                <input type="password" placeholder="Current Password" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" />
                <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="New Password" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" />
                <div className="flex gap-2 h-1.5 mt-2">
                  {[1,2,3].map(i => <div key={i} className={`flex-1 rounded-full transition-colors ${strength >= i ? colors[strength] : colors[0]}`}></div>)}
                </div>
                <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none mt-4" />
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition-colors mt-2">Update Password</button>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Shield size={20}/> Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1A1033] rounded-xl border border-gray-200 dark:border-[#3D2A7A]">
                <div>
                  <div className="font-bold">Authenticator App</div>
                  <div className="text-sm text-gray-500">Not configured</div>
                </div>
                <button className="px-4 py-2 border border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-colors">Enable 2FA</button>
              </div>
            </div>
          </div>
        )}

        {(tab === 'Notifications' || tab === 'Privacy') && (
          <EmptyState icon={Settings} title={`${tab} Settings`} message={`Options for ${tab.toLowerCase()} are structural in this demo.`} />
        )}
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD LAYOUT ---
export default function Dashboard({ session, userProfile, supabase, onClose, onLogout }) {
  const [activeView, setActiveView] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const role = userProfile?.role || 'Parent';

  const toggleDarkMode = () => {
    const isDark = !isDarkMode;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const parentLinks = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'find_professionals', label: 'Find Professionals', icon: Search },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'documents', label: 'My Documents', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  
  const educatorLinks = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'onboarding', label: 'My Profile', icon: User },
    { id: 'clients', label: 'My Clients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'documents', label: 'Generated Documents', icon: FileText },
    { id: 'tools', label: 'Tools', icon: Activity },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const links = role === 'Professional' ? educatorLinks : parentLinks;

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <Overview role={role} profile={userProfile} changeView={setActiveView} />;
      case 'find_professionals': return <FindProfessionals />;
      case 'appointments': return <MyAppointments />;
      case 'documents': return <MyDocuments />;
      case 'onboarding': return <EducatorOnboarding />;
      case 'clients': return <MyClients />;
      case 'tools': return <EducatorTools />;
      case 'messages': return <Messages />;
      case 'notifications': return <NotificationsView />;
      case 'settings': return <AccountSettings />;
      default: return <Overview role={role} profile={userProfile} changeView={setActiveView} />;
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'dark bg-[#0A0514] text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-[#1A1033] border-r border-gray-200 dark:border-[#3D2A7A] transition-all duration-300 z-40 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'} md:relative md:translate-x-0 ${!isSidebarOpen && 'max-md:-translate-x-full'}`}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-[#3D2A7A]">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2 font-bold text-xl truncate">
              <img src="/SIMPLYLOGO-transparent.png" alt="Logo" className="h-8 object-contain shrink-0" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">SimplyAbled</span>
            </div>
          ) : (
            <img src="/SIMPLYLOGO-transparent.png" alt="Logo" className="h-8 object-contain mx-auto" />
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="hidden md:flex p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500">
            {isSidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
          </button>
        </div>

        {/* User Badge */}
        <div className={`p-4 border-b border-gray-200 dark:border-[#3D2A7A] ${!isSidebarOpen && 'hidden'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold shadow-md shrink-0">
              {getInitials(userProfile?.full_name)}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm truncate dark:text-white">{userProfile?.full_name || 'User Name'}</div>
              <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold mt-1 truncate max-w-full">{role}</span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActiveView(link.id); if(window.innerWidth < 768) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all group relative ${activeView === link.id ? 'bg-primary text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary dark:hover:text-purple-300'}`}
              title={!isSidebarOpen ? link.label : ''}
            >
              <link.icon size={20} className={`shrink-0 ${activeView === link.id ? 'text-white' : 'text-gray-500 group-hover:text-primary'}`} />
              <span className={`truncate ${!isSidebarOpen && 'hidden'}`}>{link.label}</span>
              {activeView === link.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full"></div>}
            </button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-gray-200 dark:border-[#3D2A7A] space-y-1">
          <button onClick={onClose} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${!isSidebarOpen && 'justify-center'}`} title={!isSidebarOpen ? "Back to Home" : ''}>
            <ArrowRight size={20} className="shrink-0" />
            <span className={`truncate ${!isSidebarOpen && 'hidden'}`}>Back to Home</span>
          </button>
          <button onClick={onLogout} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all ${!isSidebarOpen && 'justify-center'}`} title={!isSidebarOpen ? "Log Out" : ''}>
            <LogOut size={20} className="shrink-0" />
            <span className={`truncate ${!isSidebarOpen && 'hidden'}`}>Log Out</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE */}
      {!isSidebarOpen && window.innerWidth < 768 && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-gray-50 dark:bg-[#0A0514]">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-[#1E1244] border-b border-gray-200 dark:border-[#3D2A7A] flex items-center justify-between px-4 md:px-6 shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
              Dashboard <ChevronRight size={16} className="mx-1" /> <span className="text-primary capitalize">{activeView.replace('_', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex relative group">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search..." className="w-48 lg:w-64 pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-full outline-none focus:border-primary text-sm transition-all focus:w-64 lg:focus:w-80 dark:text-white" />
            </div>
            
            <button onClick={() => setActiveView('notifications')} className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-[#1E1244] rounded-full"></span>
            </button>
            
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>
            
            <button onClick={() => setActiveView('settings')} className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold ml-2 shadow-sm border border-primary/30">
              {getInitials(userProfile?.full_name)}
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}
