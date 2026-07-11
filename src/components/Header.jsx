import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import AuthModal from './AuthModal';
import UserDropdown from './UserDropdown';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

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
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-gray-100/50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.02)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group cursor-pointer">
            <Link to="/" className="text-2xl font-heading font-bold text-primary transition-all duration-300 ease-linear-curve group-hover:opacity-80">
              SimplyAbled
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-textColor/70 hover:text-primary transition-all duration-300 ease-linear-curve text-sm font-medium hover:-translate-y-0.5"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-5">
            <DarkModeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <UserDropdown user={user} onSignOut={handleSignOut} />
              </div>
            ) : (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsAuthModalOpen(true); }} className="text-textColor/80 hover:text-primary font-medium text-sm transition-all duration-300 ease-linear-curve hover:-translate-y-0.5">
                  Login
                </a>
                <a
                  onClick={(e) => { e.preventDefault(); setIsAuthModalOpen(true); }}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-linear-curve shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                >
                  Get Started Free
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button & User Profile */}
          <div className="flex items-center gap-3 md:hidden">
            <DarkModeToggle />
            {user && (
              <UserDropdown user={user} onSignOut={handleSignOut} />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-textColor hover:text-primary focus:outline-none ml-2"
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
              <Link
                key={link.name}
                to={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-textColor hover:text-primary hover:bg-altBackground"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 px-3 space-y-3 flex flex-col">
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary text-white hover:bg-primary/90 px-4 py-3 rounded-xl font-bold text-base transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <a
                    href="#"
                    className="block text-center text-base font-medium text-textColor hover:text-primary"
                    onClick={(e) => { e.preventDefault(); setIsAuthModalOpen(true); setIsOpen(false); }}
                  >
                    Login
                  </a>
                  <a
                    href="#"
                    className="block text-center bg-primary text-white px-4 py-3 rounded-xl font-medium text-base shadow-sm cursor-pointer"
                    onClick={(e) => { e.preventDefault(); setIsAuthModalOpen(true); setIsOpen(false); }}
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
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {
          setIsAuthModalOpen(false);
          navigate('/dashboard');
        }}
      />
    </>
  );
};

export default Header;
