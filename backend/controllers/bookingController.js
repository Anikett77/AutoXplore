import Booking from '../models/Booking.js'
import mongoose from 'mongoose'

/**
 * Create a booking
 * Expects body: { car, pickupDate, returnDate, meta? }
 * Uses req.user.id (set by auth middleware) as the booking user.
 * which we need
 */
export async function createBooking(req, res) {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const { car, pickupDate, returnDate, meta } = req.body

    if (!car || !pickupDate || !returnDate) {
      return res.status(400).json({ message: 'car, pickupDate and returnDate are required' })
    }

    if (!mongoose.Types.ObjectId.isValid(car)) {
      return res.status(400).json({ message: 'Invalid car id' })
    }

    const pickup = new Date(pickupDate)
    const ret = new Date(returnDate)
    if (isNaN(pickup) || isNaN(ret)) {
      return res.status(400).json({ message: 'Invalid dates' })
    }
    if (pickup >= ret) {
      return res.status(400).json({ message: 'pickupDate must be before returnDate' })
    }

    const booking = new Booking({
      car,
      user: userId,
      pickupDate: pickup,
      returnDate: ret,
      meta,
    })

    await booking.save()

    // optional: populate referenced fields before return
    await booking.populate('car').execPopulate?.() // execPopulate exists on older mongoose; safe no-op otherwise
    // or use Booking.findById(booking._id).populate('car').lean()

    return res.status(201).json({ message: 'Booking created', booking })
  } catch (err) {
    console.error('createBooking error', err)
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}

/**
 * Get bookings for authenticated user
 * Query params optional: status, limit, skip
 */
export async function getUserBookings(req, res) {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const { status, limit = 50, skip = 0 } = req.query

    const filter = { user: userId }
    if (status) filter.status = status

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit))
      .populate('car') // populate as needed
      .lean()

    return res.status(200).json({ bookings })
  } catch (err) {
    console.error('getUserBookings error', err)
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}