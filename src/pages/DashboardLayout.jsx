import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Search, Brain, Bookmark } from 'lucide-react';
import { supabase } from '../supabase';
import UserDropdown from '../components/UserDropdown';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/');
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-altBackground overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col h-full z-50 shadow-sm transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-primary/20">
              S
            </div>
            <span className="text-xl font-bold font-heading text-textColor tracking-tight">SimplyAbled</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-500 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4 px-3">Main</div>
          <NavLink to="/dashboard" end onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard size={20} />
            Overview
          </NavLink>
          <NavLink to="/dashboard/students" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users size={20} />
            Students
          </NavLink>
          <NavLink to="/dashboard/documents" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <FileText size={20} />
            Documents
          </NavLink>
          <NavLink to="/dashboard/templates" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Bookmark size={20} />
            Saved Templates
          </NavLink>

          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-8 px-3">AI Tools</div>
          <NavLink to="/dashboard/tools/mchat" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Brain size={20} />
            M-CHAT Screening
          </NavLink>
          <NavLink to="/dashboard/tools/iep" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <FileText size={20} />
            IEP Generator
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-50">
          <Link to="/dashboard/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-sm">
              {user?.email ? user.email.substring(0,2).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 truncate">
              <h4 className="text-sm font-bold text-gray-800 truncate">{user?.email || 'Educator'}</h4>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 z-10 w-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <UserDropdown user={user} onSignOut={() => navigate('/')} />
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
