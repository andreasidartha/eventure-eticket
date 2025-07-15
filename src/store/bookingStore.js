import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { events } from '../data/events';
import { users } from '../data/users';

const useBookingStore = create(
  persist(
    (set, get) => ({
      events: events,
      user: null,
      bookings: [],
      selectedEvent: null,
      selectedSeats: [],
      
      login: (username, password) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          set({ user: { id: user.id, name: user.name, username: user.username, role: user.role } });
          return user.role;
        }
        return null;
      },

      logout: () => {
        set({ user: null });
      },

      selectEvent: (eventId) => {
        const event = get().events.find(e => e.id === eventId);
        set({ selectedEvent: event, selectedSeats: [] });
      },

      toggleSeat: (seatNumber) => {
        const { selectedEvent, selectedSeats } = get();
        if (!selectedEvent) return;

        const seat = selectedEvent.seats.find(s => s.number === seatNumber);
        if (seat.status === 'booked') return;

        const isSelected = selectedSeats.includes(seatNumber);
        const newSelectedSeats = isSelected
          ? selectedSeats.filter(s => s !== seatNumber)
          : [...selectedSeats, seatNumber];
        
        set({ selectedSeats: newSelectedSeats });
      },

      createBooking: () => {
        const { selectedEvent, selectedSeats, user } = get();
        if (!selectedEvent || selectedSeats.length === 0 || !user) return null;

        const bookingId = `B-${Date.now()}`;
        const newBooking = {
          id: bookingId,
          event: selectedEvent,
          seats: selectedSeats,
          userId: user.id,
          userName: user.name,
          totalPrice: selectedEvent.pricePerSeat * selectedSeats.length,
          bookingDate: new Date().toISOString(),
        };

        const updatedEvents = get().events.map(event => {
          if (event.id === selectedEvent.id) {
            const updatedSeats = event.seats.map(seat => 
              selectedSeats.includes(seat.number) ? { ...seat, status: 'booked' } : seat
            );
            return { ...event, seats: updatedSeats };
          }
          return event;
        });

        set((state) => ({ 
          bookings: [...state.bookings, newBooking],
          events: updatedEvents,
          selectedEvent: null,
          selectedSeats: [] 
        }));
        return newBooking;
      },

      addEvent: (eventData) => {
        const newEvent = {
          ...eventData,
          id: `evt-${Date.now()}`,
          pricePerSeat: parseInt(eventData.pricePerSeat, 10),
          image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          seats: Array.from({ length: 100 }, (_, i) => ({
            number: `${String.fromCharCode(65 + Math.floor(i / 10))}${ (i % 10) + 1 }`,
            status: 'available',
          })),
        };
        set(state => ({ events: [...state.events, newEvent] }));
      },
    }),
    {
      name: 'booking-storage',
    }
  )
);

export default useBookingStore;
