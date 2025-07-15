export const events = [
  {
    id: 'evt-001',
    name: 'Future Fusion Music Fest',
    date: '2025-09-20',
    location: 'Jakarta International Expo',
    pricePerSeat: 750000,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    category: 'Music',
    description: 'Experience the future of music with top DJs and artists from around the globe. A 3-day non-stop party with spectacular visuals and sound.',
    seats: Array.from({ length: 100 }, (_, i) => ({
      number: `${String.fromCharCode(65 + Math.floor(i / 10))}${ (i % 10) + 1 }`,
      status: Math.random() > 0.7 ? 'booked' : 'available',
    })),
  },
  {
    id: 'evt-002',
    name: 'Tech Innovators Conference 2025',
    date: '2025-10-15',
    location: 'Bali Convention Center',
    pricePerSeat: 1200000,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80',
    category: 'Conference',
    description: 'Join industry leaders and visionaries to discuss the next wave of technology. Keynotes, workshops, and networking opportunities.',
    seats: Array.from({ length: 100 }, (_, i) => ({
      number: `${String.fromCharCode(65 + Math.floor(i / 10))}${ (i % 10) + 1 }`,
      status: Math.random() > 0.6 ? 'booked' : 'available',
    })),
  },
  {
    id: 'evt-003',
    name: 'National Soccer Championship Final',
    date: '2025-11-05',
    location: 'GBK Stadium, Jakarta',
    pricePerSeat: 450000,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    category: 'Sport',
    description: 'The final match of the national soccer league. Witness history in the making as the top two teams battle for the championship title.',
    seats: Array.from({ length: 100 }, (_, i) => ({
      number: `${String.fromCharCode(65 + Math.floor(i / 10))}${ (i % 10) + 1 }`,
      status: Math.random() > 0.4 ? 'booked' : 'available',
    })),
  },
  {
    id: 'evt-004',
    name: 'Art & Soul Exhibition',
    date: '2025-09-28',
    location: 'National Gallery of Indonesia',
    pricePerSeat: 150000,
    image: 'https://images.unsplash.com/photo-1531578218432-a7a80b2525a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Art',
    description: 'A curated collection of contemporary art from local and international artists. Explore paintings, sculptures, and interactive installations.',
    seats: Array.from({ length: 100 }, (_, i) => ({
      number: `${String.fromCharCode(65 + Math.floor(i / 10))}${ (i % 10) + 1 }`,
      status: Math.random() > 0.8 ? 'booked' : 'available',
    })),
  },
];

export const categories = ['Music', 'Sport', 'Conference', 'Art'];
