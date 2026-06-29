import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-2xl font-heading font-bold text-primary">
              SimplyAbled
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (['About', 'Contact'].includes(link.name)) {
                    e.preventDefault();
                    alert(`${link.name} page coming soon!`);
                  }
                }}
                className="text-textColor hover:text-primary transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
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
            ) : (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Login coming soon!'); }} className="text-textColor hover:text-primary font-medium text-sm transition-colors">
                  Login
                </a>
                <a
                  href="#documentation"
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm cursor-pointer"
                >
                  Get Started Free
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-textColor hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-textColor hover:text-primary hover:bg-altBackground"
                onClick={(e) => {
                  if (['About', 'Contact'].includes(link.name)) {
                    e.preventDefault();
                    alert(`${link.name} page coming soon!`);
                  } else {
                    setIsOpen(false);
                  }
                }}
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 px-3 space-y-3 flex flex-col">
              {user ? (
                <>
                  <div className="text-sm font-medium text-gray-500 px-3 pb-2 text-center">
                    Logged in as {user.email}
                  </div>
                  <button
                    onClick={() => { handleSignOut(); setIsOpen(false); }}
                    className="block w-full text-center bg-red-50 text-red-600 hover:bg-red-100 px-4 py-3 rounded-xl font-bold text-base transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="#"
                    className="block text-center text-base font-medium text-textColor hover:text-primary"
                    onClick={(e) => { e.preventDefault(); alert('Login coming soon!'); setIsOpen(false); }}
                  >
                    Login
                  </a>
                  <a
                    href="#documentation"
                    className="block text-center bg-primary text-white px-4 py-3 rounded-xl font-medium text-base shadow-sm cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started Free
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
