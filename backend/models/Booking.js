import mongoose from 'mongoose'

const { Schema, model } = mongoose

const bookingSchema = new Schema(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car', // adjust if your car model is named differently that we want
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    // optional: store price or other metadata
    meta: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Booking', bookingSchema)