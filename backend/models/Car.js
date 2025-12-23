import mongoose, { Schema } from 'mongoose';

const carBookingSubSchema = new Schema({
  status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled', 'upcoming'], default: 'pending' },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  bookingId: { type: String }
}, { _id: false });

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: Number,
  status: { type: String, enum: ['available', 'booked', 'rented', 'maintenance'], default: 'available' },
  bookings: { type: [carBookingSubSchema], default: [] },
});

const Car = mongoose.model('Car', carSchema);
export default Car;
