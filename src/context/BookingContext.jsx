import React, { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  // Add a new booking
  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

// Hook for easy usage
export const useBooking = () => useContext(BookingContext);
