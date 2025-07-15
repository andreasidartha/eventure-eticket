import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useBookingStore from '../../store/bookingStore';
import { PlusCircle, Edit, Trash2, BarChart, Ticket, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateEventModal = ({ isOpen, onClose, onAddEvent }) => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: '',
    pricePerSeat: '',
    category: 'Music',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent(eventData);
    onClose();
    setEventData({ name: '', date: '', location: '', pricePerSeat: '', category: 'Music', description: '' });
    toast.success('Event created successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} className="w-full input" required />
          <input type="date" name="date" value={eventData.date} onChange={handleChange} className="w-full input" required />
          <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} className="w-full input" required />
          <input type="number" name="pricePerSeat" placeholder="Price Per Seat" value={eventData.pricePerSeat} onChange={handleChange} className="w-full input" required />
          <select name="category" value={eventData.category} onChange={handleChange} className="w-full input">
            <option>Music</option>
            <option>Sport</option>
            <option>Conference</option>
            <option>Art</option>
          </select>
          <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} className="w-full input" required />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};


const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, events, bookings, addEvent } = useBookingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error("Access denied. Admins only.");
      navigate('/login');
    }
  }, [user, navigate]);

  const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const totalTicketsSold = bookings.reduce((acc, booking) => acc + booking.seats.length, 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddEvent={addEvent} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold">Admin Dashboard</h1>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary flex items-center gap-2">
            <PlusCircle size={20} />
            Create Event
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full"><BarChart className="text-blue-500" /></div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold">IDR {totalRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full"><Ticket className="text-green-500" /></div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Tickets Sold</p>
              <p className="text-2xl font-bold">{totalTicketsSold}</p>
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full"><Users className="text-purple-500" /></div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Bookings</p>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="p-4 font-semibold">Event Name</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id} className={`border-t dark:border-gray-700 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                    <td className="p-4 font-medium">{event.name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{event.location}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">IDR {event.pricePerSeat.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex gap-4">
                        <button className="text-blue-500 hover:text-blue-700"><Edit size={20} /></button>
                        <button className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bookings Table */}
        <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="p-4 font-semibold">Booking ID</th>
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Event</th>
                  <th className="p-4 font-semibold">Seats</th>
                  <th className="p-4 font-semibold">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking, index) => (
                  <tr key={booking.id} className={`border-t dark:border-gray-700 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                    <td className="p-4 font-mono text-sm">{booking.id}</td>
                    <td className="p-4">{booking.userName}</td>
                    <td className="p-4">{booking.event.name}</td>
                    <td className="p-4">{booking.seats.join(', ')}</td>
                    <td className="p-4">IDR {booking.totalPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default AdminDashboardPage;
