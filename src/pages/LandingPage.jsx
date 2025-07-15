import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Music, Trophy, Mic, Palette } from 'lucide-react';
import { categories } from '../data/events';

const LandingPage = () => {
  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Concert" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 text-center p-4">
          <div className="text-bg-overlay-strong">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 text-shadow-xl"
            >
              Don't Just Attend. <span className="text-primary-light text-shadow-glow">Experience.</span>
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl max-w-3xl mx-auto mb-8 text-shadow-xl"
            >
              Discover and book tickets for the most exciting events happening near you.
            </motion.p>
          </div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <Link to="/events" className="btn btn-primary text-xl">
              Explore Events
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Search Bar Section */}
      <section className="container mx-auto px-4 -mt-32 md:-mt-40 relative z-20">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for an event..."
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:outline-none focus:border-primary"
              />
            </div>
            <select className="w-full md:w-auto px-4 py-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:outline-none focus:border-primary">
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <button className="btn btn-primary w-full md:w-auto">Search</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/events?category=${category}`} className="group block text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:bg-gradient-primary hover:text-white transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {React.createElement([Music, Trophy, Mic, Palette][index % 4], { size: 48, className: "text-primary-dark group-hover:text-white transition-colors" })}
                </div>
                <h3 className="text-xl font-semibold">{category}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
