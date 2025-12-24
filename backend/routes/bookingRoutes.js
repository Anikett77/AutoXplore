import express from 'express'
import auth from '../middleware/auth.js'
import { createBooking, getUserBookings } from '../controllers/bookingController.js'

const router = express.Router()

// Create a booking (authenticated) that we want
router.post('/', auth, createBooking)

// Get bookings for current user (authenticated)
router.get('/my', auth, getUserBookings)

export default router