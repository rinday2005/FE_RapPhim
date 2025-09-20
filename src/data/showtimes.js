// Showtimes and booking data for frontend
export const showtimeData = [
  {
    showtimeId: 'ST001',
    movieId: 'M001',
    hallId: 'H001',
    clusterId: 'CLU001',
    startTime: '14:00',
    endTime: '17:01',
    price: 120000,
    date: '2024-01-15',
    availableSeats: 280,
    totalSeats: 300,
    isActive: true
  },
  {
    showtimeId: 'ST002',
    movieId: 'M001',
    hallId: 'H001',
    clusterId: 'CLU001',
    startTime: '17:30',
    endTime: '20:31',
    price: 120000,
    date: '2024-01-15',
    availableSeats: 250,
    totalSeats: 300,
    isActive: true
  },
  {
    showtimeId: 'ST003',
    movieId: 'M001',
    hallId: 'H001',
    clusterId: 'CLU001',
    startTime: '21:00',
    endTime: '00:01',
    price: 120000,
    date: '2024-01-15',
    availableSeats: 200,
    totalSeats: 300,
    isActive: true
  },
  {
    showtimeId: 'ST004',
    movieId: 'M002',
    hallId: 'H002',
    clusterId: 'CLU001',
    startTime: '15:30',
    endTime: '17:58',
    price: 100000,
    date: '2024-01-15',
    availableSeats: 100,
    totalSeats: 120,
    isActive: true
  },
  {
    showtimeId: 'ST005',
    movieId: 'M002',
    hallId: 'H002',
    clusterId: 'CLU001',
    startTime: '19:00',
    endTime: '21:28',
    price: 100000,
    date: '2024-01-15',
    availableSeats: 80,
    totalSeats: 120,
    isActive: true
  },
  {
    showtimeId: 'ST006',
    movieId: 'M003',
    hallId: 'H003',
    clusterId: 'CLU001',
    startTime: '16:00',
    endTime: '18:35',
    price: 80000,
    date: '2024-01-15',
    availableSeats: 150,
    totalSeats: 200,
    isActive: true
  },
  {
    showtimeId: 'ST007',
    movieId: 'M003',
    hallId: 'H003',
    clusterId: 'CLU001',
    startTime: '20:15',
    endTime: '22:50',
    price: 80000,
    date: '2024-01-15',
    availableSeats: 120,
    totalSeats: 200,
    isActive: true
  },
  {
    showtimeId: 'ST008',
    movieId: 'M001',
    hallId: 'H004',
    clusterId: 'CLU002',
    startTime: '14:30',
    endTime: '17:31',
    price: 150000,
    date: '2024-01-15',
    availableSeats: 300,
    totalSeats: 350,
    isActive: true
  },
  {
    showtimeId: 'ST009',
    movieId: 'M002',
    hallId: 'H005',
    clusterId: 'CLU003',
    startTime: '18:00',
    endTime: '20:28',
    price: 200000,
    date: '2024-01-15',
    availableSeats: 60,
    totalSeats: 80,
    isActive: true
  }
];

export const seatData = [
  {
    seatId: 'A01',
    hallId: 'H001',
    row: 'A',
    number: 1,
    type: 'standard',
    status: 'available',
    price: 0
  },
  {
    seatId: 'A02',
    hallId: 'H001',
    row: 'A',
    number: 2,
    type: 'standard',
    status: 'available',
    price: 0
  },
  {
    seatId: 'H13',
    hallId: 'H001',
    row: 'H',
    number: 13,
    type: 'couple',
    status: 'available',
    price: 50000
  },
  {
    seatId: 'H14',
    hallId: 'H001',
    row: 'H',
    number: 14,
    type: 'couple',
    status: 'available',
    price: 50000
  },
  {
    seatId: 'M15',
    hallId: 'H001',
    row: 'M',
    number: 15,
    type: 'vip',
    status: 'booked',
    price: 100000
  }
];

export const bookingData = [
  {
    bookingId: 'BK001',
    userId: 'USER001',
    showtimeId: 'ST001',
    seatIds: ['M15', 'M16'],
    bookingTime: '2024-01-15T10:30:00Z',
    totalAmount: 240000,
    status: 'confirmed',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid'
  },
  {
    bookingId: 'BK002',
    userId: 'USER002',
    showtimeId: 'ST002',
    seatIds: ['A01', 'A02'],
    bookingTime: '2024-01-15T11:00:00Z',
    totalAmount: 240000,
    status: 'pending',
    paymentMethod: 'cash',
    paymentStatus: 'pending'
  }
];

// Helper functions
export const getShowtimesByMovie = (movieId) => {
  return showtimeData.filter(showtime => showtime.movieId === movieId);
};

export const getShowtimesByCluster = (clusterId) => {
  return showtimeData.filter(showtime => showtime.clusterId === clusterId);
};

export const getShowtimesByDate = (date) => {
  return showtimeData.filter(showtime => showtime.date === date);
};

export const getShowtimeById = (showtimeId) => {
  return showtimeData.find(showtime => showtime.showtimeId === showtimeId);
};

export const getSeatsByHall = (hallId) => {
  return seatData.filter(seat => seat.hallId === hallId);
};

export const getAvailableSeats = (hallId) => {
  return seatData.filter(seat => seat.hallId === hallId && seat.status === 'available');
};

export const getBookingsByUser = (userId) => {
  return bookingData.filter(booking => booking.userId === userId);
};

export const getBookingById = (bookingId) => {
  return bookingData.find(booking => booking.bookingId === bookingId);
};
