import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import { motion } from 'framer-motion';
import { User, Mail, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout } = useBookingStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out.');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-primary-light mb-4">
            <User className="h-12 w-12 text-primary-dark" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
          <p className="text-primary-dark dark:text-primary font-medium">{user.role}</p>
        </div>
        <div className="mt-8 text-left space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Mail className="text-gray-500 dark:text-gray-400" />
            <span className="text-gray-800 dark:text-gray-200">{user.username}@eventure.com</span>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full btn btn-danger flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
