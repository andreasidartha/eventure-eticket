import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { Ticket, Calendar, MapPin, DollarSign } from 'lucide-react';

const MyTicketsPage = () => {
  const { user, bookings } = useBookingStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const userBookings = bookings.filter(b => b.userId === user.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-8 text-gray-800 dark:text-white"
      >
        My Tickets
      </motion.h1>
      {userBookings.length === 0 ? (
        <div className="text-center py-16">
          <Ticket className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No tickets found</h3>
          <p className="mt-1 text-gray-500">You haven't booked any events yet.</p>
          <button onClick={() => navigate('/events')} className="mt-6 btn btn-primary">Browse Events</button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {userBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
            >
              <div className="p-6 bg-gray-50 dark:bg-gray-700 flex items-center justify-center md:w-1/3">
                <div className="bg-white p-3 rounded-lg">
                  <QRCode value={booking.id} size={128} />
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{booking.event.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Booking ID: {booking.id}</p>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(booking.event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{booking.event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket size={16} />
                    <span>Seats: {booking.seats.join(', ')} ({booking.seats.length} tickets)</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <DollarSign size={16} />
                    <span>Total: IDR {booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;
