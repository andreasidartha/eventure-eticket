import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Tag } from 'lucide-react';
import { events, categories } from '../data/events';

const EventCard = ({ event, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="card"
  >
    <div className="relative">
      <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
      <div className="absolute top-2 right-2 bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-semibold">{event.category}</div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
      <div className="space-y-2 text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} />
          <span>Starts from IDR {event.pricePerSeat.toLocaleString()}</span>
        </div>
      </div>
      <Link to={`/events/${event.id}`} className="w-full">
        <button className="btn btn-primary w-full">Book Now</button>
      </Link>
    </div>
  </motion.div>
);

const EventListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    date: '',
    location: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredEvents = events.filter(event => {
    return (
      (filters.category === 'All' || event.category === filters.category) &&
      (filters.location === '' || event.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.date === '' || event.date >= filters.date)
    );
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-4">Upcoming Events</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-10">Find your next experience from our curated list of events.</p>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:outline-none focus:border-primary">
          <option value="All">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="date" name="date" value={filters.date} onChange={handleFilterChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:outline-none focus:border-primary" />
        <input type="text" name="location" placeholder="Search by location..." value={filters.location} onChange={handleFilterChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:outline-none focus:border-primary" />
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))
        ) : (
          <p className="col-span-full text-center text-xl text-gray-500">No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default EventListPage;
