import { Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Search, Settings, LogOut, Bell, Brain, ChevronDown } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-altBackground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full z-20 shadow-sm">
        <div className="p-6 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-primary/20">
              S
            </div>
            <span className="text-xl font-bold font-heading text-textColor tracking-tight">SimplyAbled</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4 px-3">Main</div>
          <NavLink to="/dashboard" end className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard size={20} />
            Overview
          </NavLink>
          <NavLink to="/dashboard/students" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users size={20} />
            Students
          </NavLink>
          <NavLink to="/dashboard/documents" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <FileText size={20} />
            Documents
          </NavLink>

          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-8 px-3">AI Tools</div>
          <NavLink to="/dashboard/tools/mchat" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Brain size={20} />
            M-CHAT Screening
          </NavLink>
          <NavLink to="/dashboard/tools/iep" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <FileText size={20} />
            IEP Generator
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-50">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              ED
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-800">Educator</h4>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search students, documents..." 
              className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
