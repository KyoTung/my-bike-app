const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  riderPhone: { type: String, required: true },
  
  pickupLocation: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [lng, lat]
    address: String
  },
  
  destination: {
    address: String,
    lat: Number,
    lng: Number
  },

  status: { 
    type: String, 
    enum: ['PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELLED'], 
    default: 'PENDING' 
  },

  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  price: Number, // Giá cước (nếu tính trước)

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);