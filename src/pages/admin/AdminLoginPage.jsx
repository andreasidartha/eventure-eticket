import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from '../../components/ui/Toaster';
import { Lock, User } from 'lucide-react';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // In-memory authentication
    if (credentials.username === 'admin' && credentials.password === 'password') {
      toast('Login successful!', 'success');
      // In a real app, you'd set a token in localStorage/sessionStorage
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      toast('Invalid credentials.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome to the Eventure control panel.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username (admin)"
              value={credentials.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password (password)"
              value={credentials.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full text-lg">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
