import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Ticket, DollarSign, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, selectedEvent, selectedSeats, createBooking } = useBookingStore();

  if (!user) {
    toast.error("Please log in to book tickets.");
    navigate('/login');
    return null;
  }

  if (!selectedEvent || selectedSeats.length === 0) {
    toast.error("No event or seats selected.");
    navigate('/events');
    return null;
  }

  const totalPrice = selectedEvent.pricePerSeat * selectedSeats.length;

  const handleConfirmBooking = () => {
    const newBooking = createBooking();
    if (newBooking) {
      toast.success('Booking successful!');
      navigate(`/ticket/${newBooking.id}`);
    } else {
      toast.error('Failed to create booking.');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button onClick={() => navigate(`/events/${selectedEvent.id}`)} className="flex items-center gap-2 text-primary-dark dark:text-primary mb-6 font-semibold">
          <ArrowLeft size={20} />
          Back to Seat Selection
        </button>

        <h1 className="text-4xl font-extrabold mb-8">Booking Confirmation</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-300">Event:</span>
                <span className="font-bold">{selectedEvent.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-300">Date:</span>
                <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-300">Location:</span>
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-300">Selected Seats:</span>
                <span>{selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-300">Tickets:</span>
                <span>{selectedSeats.length}</span>
              </div>
              <hr className="dark:border-gray-700" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total Price:</span>
                <span>IDR {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* User Info & Confirmation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Information</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium text-gray-500 dark:text-gray-400">Name</p>
                  <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium text-gray-500 dark:text-gray-400">Username</p>
                  <p className="text-lg font-semibold">{user.username}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleConfirmBooking}
              className="w-full btn btn-primary btn-lg mt-8 flex items-center justify-center gap-2"
            >
              <CheckCircle size={24} />
              Confirm & Book Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
