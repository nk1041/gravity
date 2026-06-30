import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Bookmark, Users, Settings, Key, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { supabase } from '../supabase';

const UserDropdown = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    if (onSignOut) onSignOut();
    else await supabase.auth.signOut();
  };

  const getInitials = (email) => email ? email.substring(0, 2).toUpperCase() : 'U';

  const menuItems = [
    { icon: User, label: 'My Profile', href: '/dashboard/profile' },
    { icon: FileText, label: 'My Documents', href: '/dashboard/documents' },
    { icon: Bookmark, label: 'Saved Templates', href: '/dashboard/templates' },
    { icon: Users, label: 'Student Profiles', href: '/dashboard/students' },
    { divider: true },
    { icon: Settings, label: 'Account Settings', href: '/dashboard/settings' },
    { icon: Key, label: 'Change Password', href: '/dashboard/password' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
    { icon: Shield, label: 'Privacy & Security', href: '/dashboard/security' },
    { icon: HelpCircle, label: 'Help & Support', href: '/dashboard/help' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      >
        {getInitials(user?.email)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden z-50 animate-fade-in origin-top-right">
          <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
            <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
          <div className="py-2">
            {menuItems.map((item, index) => (
              item.divider ? (
                <div key={index} className="h-px bg-gray-100 my-2"></div>
              ) : (
                <Link 
                  key={index}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <item.icon size={16} className="text-gray-400 group-hover:text-primary" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            ))}
            <div className="h-px bg-gray-100 my-2"></div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut size={16} className="text-red-500" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
