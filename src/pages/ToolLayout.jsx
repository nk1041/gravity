import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, User, LogOut } from 'lucide-react';
import { supabase } from '../supabase';

const ToolLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div className="min-h-screen bg-altBackground font-body flex flex-col">
      <header className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 font-medium">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <div className="hidden md:block w-px h-6 bg-gray-200"></div>
          <Link to="/" className="hidden md:block text-xl font-heading font-bold text-primary">
            SimplyAbled
          </Link>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <User size={16} className="text-primary" />
              {user.email.split('@')[0]}
            </div>
            <button 
              onClick={handleSignOut}
              className="text-gray-500 hover:text-red-500 font-medium text-sm transition-colors flex items-center gap-1.5"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        )}
      </header>
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ToolLayout;
