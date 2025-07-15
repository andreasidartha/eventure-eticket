import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Tag, Armchair } from 'lucide-react';
import useBookingStore from '../store/bookingStore';
import { toast } from '../components/ui/Toaster';

const Seat = ({ number, status, isSelected, onSelect }) => {
  const getSeatColor = () => {
    if (status === 'booked') return 'bg-red-500 cursor-not-allowed';
    if (isSelected) return 'bg-primary dark:bg-primary-dark';
    return 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-light dark:hover:bg-primary';
  };

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      onClick={onSelect}
      className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold transition-colors ${getSeatColor()} ${status !== 'booked' ? 'cursor-pointer' : ''}`}
    >
      {number}
    </motion.div>
  );
};

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, selectedEvent, selectedSeats, selectEvent, toggleSeat } = useBookingStore();

  useEffect(() => {
    selectEvent(id);
  }, [id, selectEvent]);

  if (!selectedEvent) {
    return <div className="text-center py-20">Event not found.</div>;
  }

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      toast('Please select at least one seat.', 'error');
      return;
    }
    navigate('/checkout');
  };

  const totalPrice = selectedEvent.pricePerSeat * selectedSeats.length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        {/* Event Banner */}
        <div className="relative rounded-xl overflow-hidden h-96 mb-8">
          <img src={selectedEvent.image} alt={selectedEvent.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold">{selectedEvent.name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Details & Seat Picker */}
          <div className="lg:col-span-2 space-y-8">
            {/* Details */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-3"><Calendar size={20} className="text-primary" /> {new Date(selectedEvent.date).toDateString()}</p>
                <p className="flex items-center gap-3"><MapPin size={20} className="text-primary" /> {selectedEvent.location}</p>
                <p className="flex items-center gap-3"><Tag size={20} className="text-primary" /> IDR {selectedEvent.pricePerSeat.toLocaleString()} per seat</p>
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{selectedEvent.description}</p>
            </div>

            {/* Seat Picker */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-4">Choose Your Seats</h2>
              <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <div className="w-full h-8 bg-gray-400 dark:bg-gray-500 text-center text-white font-bold rounded-md mb-6 flex items-center justify-center">STAGE</div>
                <div className="grid grid-cols-10 gap-2 max-w-md mx-auto">
                  {selectedEvent.seats.map(seat => (
                    <Seat
                      key={seat.number}
                      number={seat.number}
                      status={seat.status}
                      isSelected={selectedSeats.includes(seat.number)}
                      onSelect={() => toggleSeat(seat.number)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600"></div>Available</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-primary"></div>Selected</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500"></div>Booked</div>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4">Booking Summary</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-500">Event</h3>
                  <p className="text-lg font-bold">{selectedEvent.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Selected Seats</h3>
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedSeats.sort().map(seat => (
                        <span key={seat} className="bg-primary-light text-primary-dark px-2 py-1 rounded-md text-sm font-semibold">{seat}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No seats selected</p>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Price</span>
                    <span>IDR {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={handleProceedToCheckout} className="btn btn-primary w-full mt-4" disabled={selectedSeats.length === 0}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetailPage;
