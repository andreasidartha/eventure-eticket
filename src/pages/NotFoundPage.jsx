import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-extrabold text-primary-dark tracking-widest">404</h1>
        <div className="bg-primary text-white px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Oops! The page you are looking for does not exist.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <button className="btn btn-primary">
            Go Back Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
