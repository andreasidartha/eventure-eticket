import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Ticket, Menu, X, User } from 'lucide-react';
import { motion } from 'framer-motion';
import useBookingStore from '../../store/bookingStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useBookingStore();

  const navLinks = [
    { name: 'Home', path: '/', public: true },
    { name: 'Events', path: '/events', public: true },
    { name: 'My Tickets', path: '/my-tickets', public: false, role: 'user' },
    { name: 'Dashboard', path: '/admin/dashboard', public: false, role: 'admin' },
  ];

  const visibleLinks = navLinks.filter(link => {
    if (!link.public) {
      return user && user.role === link.role;
    }
    return true;
  });

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-primary-dark" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">Eventure</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-primary-dark dark:text-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              {user ? (
                <Link to="/profile">
                  <button className="btn btn-secondary flex items-center gap-2">
                    <User size={20} />
                    {user.name}
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900"
        >
          {visibleLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-primary-light text-primary-dark'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
             {user ? (
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block w-full">
                  <button className="btn btn-secondary w-full">Profile</button>
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full">
                  <button className="btn btn-primary w-full">Login</button>
                </Link>
              )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
