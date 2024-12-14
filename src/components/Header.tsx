import React, { useState } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-gray-900">
          <img src="/images/logo.png" alt="Simon Ives" className="h-[30px] w-auto" />
          <span className="text-sm tracking-wide hidden md:inline">Simon Ives · Photographer</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-start gap-8">
          <NavLink to="/new" active={location.pathname === '/new'}>
            <Plus className="w-4 h-4" />
          </NavLink>
          {location.pathname === '/about' ? (
            <NavLink to="/" active={false}>
              Home
            </NavLink>
          ) : (
            <NavLink to="/about" active={location.pathname === '/about'}>
              About
            </NavLink>
          )}
          {location.pathname === '/contact' ? (
            <NavLink to="/" active={false}>
              Home
            </NavLink>
          ) : (
            <NavLink to="/contact" active={location.pathname === '/contact'}>
              Contact
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg md:hidden">
            <nav className="flex flex-col p-4">
              <MobileNavLink to="/new" active={location.pathname === '/new'} onClick={() => setIsMenuOpen(false)}>
                <Plus className="w-4 h-4" />
                <span>New</span>
              </MobileNavLink>
              <MobileNavLink to="/about" active={location.pathname === '/about'} onClick={() => setIsMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink to="/contact" active={location.pathname === '/contact'} onClick={() => setIsMenuOpen(false)}>
                Contact
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`text-sm tracking-wide transition-colors ${
        active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
      } flex items-center gap-1`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, active, children, onClick }: { to: string; active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-lg py-3 transition-colors ${
        active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
      } flex items-center gap-2`}
    >
      {children}
    </Link>
  );
}