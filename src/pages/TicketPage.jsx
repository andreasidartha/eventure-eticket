import React, { useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { Download, Ticket as TicketIcon, Calendar, MapPin, DollarSign, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const TicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings } = useBookingStore();
  const ticketRef = useRef();

  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    toast.error("Booking not found!");
    navigate('/my-tickets');
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Booking not found.</h1>
        <Link to="/my-tickets" className="text-primary-dark dark:text-primary mt-4 inline-block">Go to My Tickets</Link>
      </div>
    );
  }

  const handleDownload = () => {
    if (ticketRef.current) {
      html2canvas(ticketRef.current, {
        backgroundColor: null, // Use transparent background
        scale: 2, // Increase resolution
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Eventure-Ticket-${booking.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success("Ticket downloaded!");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div ref={ticketRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="border-b-2 border-dashed border-gray-300 dark:border-gray-600 pb-6 mb-6">
            <h1 className="text-3xl font-extrabold text-primary-dark dark:text-primary text-center">{booking.event.name}</h1>
            <p className="text-center text-gray-500 dark:text-gray-400">E-Ticket / Booking Confirmation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary" />
                <div>
                  <p className="font-semibold">Date & Time</p>
                  <p className="text-gray-600 dark:text-gray-300">{new Date(booking.event.date).toDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-primary" />
                <div>
                  <p className="font-semibold">Venue</p>
                  <p className="text-gray-600 dark:text-gray-300">{booking.event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-primary" />
                <div>
                  <p className="font-semibold">Booked By</p>
                  <p className="text-gray-600 dark:text-gray-300">{booking.userName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TicketIcon className="text-primary" />
                <div>
                  <p className="font-semibold">Seats</p>
                  <p className="text-gray-600 dark:text-gray-300 font-mono">{booking.seats.join(', ')}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="bg-white p-3 rounded-lg shadow-md">
                <QRCode value={booking.id} size={128} fgColor="#1e293b" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">ID: {booking.id}</p>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-6 mt-6 text-center">
            <p className="text-lg font-bold">Total Price</p>
            <p className="text-3xl font-extrabold text-primary-dark dark:text-primary">IDR {booking.totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleDownload}
            className="btn btn-primary btn-lg inline-flex items-center gap-2"
          >
            <Download size={20} />
            Download Ticket
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketPage;
