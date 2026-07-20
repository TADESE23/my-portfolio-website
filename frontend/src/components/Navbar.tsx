import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FaSun, FaMoon, FaBars, FaTimes, FaUserShield } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollProgressBar from './ScrollProgressBar';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Resume', path: '/resume' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <ScrollProgressBar />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-wide"
          >
            Tadese Mesfin.
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-slatefg-muted dark:text-slatefg-dark/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Theme Toggle, Auth dashboard, Hamburger) */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-slate-200 dark:hover:bg-slatebg-card transition-colors duration-200 text-slatefg-muted dark:text-slatefg-dark"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FaSun className="w-4 h-4 text-amber-400" /> : <FaMoon className="w-4 h-4" />}
            </button>

            {/* Admin Dashboard Entry */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-1.5 px-3 rounded-full transition-all duration-200"
                >
                  <FaUserShield /> Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-xs bg-rose-500 hover:bg-rose-600 text-white font-semibold py-1.5 px-3 rounded-full transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1 text-xs bg-slate-200 dark:bg-slatebg-card hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white py-1.5 px-3 rounded-full transition-all duration-200 text-slatefg-muted dark:text-slatefg-dark font-medium"
              >
                <FaUserShield /> Admin
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slatebg-card transition-colors duration-200 text-slatefg-muted dark:text-slatefg-dark"
              aria-label="Open Menu"
            >
              {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass-nav border-t border-slate-200/50 dark:border-slatebg-border/30 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`block py-2.5 px-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-primary/10 text-primary border-l-4 border-primary'
                          : 'text-slatefg-muted dark:text-slatefg-dark/80 hover:bg-slate-100 dark:hover:bg-slatebg-card'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                {/* Mobile Admin links */}
                <div className="pt-4 border-t border-slate-200 dark:border-slatebg-border flex flex-col gap-2 px-4">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/admin"
                        className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold"
                      >
                        <FaUserShield /> Admin Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/admin"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-slate-200 dark:bg-slatebg-card text-slatefg-muted dark:text-slatefg-dark rounded-xl font-semibold"
                    >
                      <FaUserShield /> Admin Portal
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
