import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import { motion } from 'framer-motion';
import { LogIn, User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useBookingStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = login(username, password);
    if (role) {
      toast.success('Login successful!');
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/events');
      }
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to Eventure
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Access your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-dark hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-primary-light group-hover:text-white" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        
        {/* Demo Credentials Section */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
            Demo Credentials
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400 w-12">User:</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">user123</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400 w-12">Admin:</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">admin123</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
