const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  
  // Trạng thái hoạt động
  isOnline: { type: Boolean, default: false },
  socketId: { type: String }, // Để server biết gửi tin nhắn cho ai

  // Vị trí (GeoJSON)
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },

  // Hạng thành viên & Giới hạn cuốc
  subscription: {
    tier: { 
        type: String, 
        enum: ['BASIC', 'PRO', 'VIP'], 
        default: 'BASIC' 
    },
    expiryDate: { type: Date }, // Ngày hết hạn gói
    ridesCountMonth: { type: Number, default: 0 } // Đếm số cuốc trong tháng (cho gói Basic)
  },

  // Hình ảnh (Lưu link Cloudinary)
  avatar: { type: String, default: "" }, 
  paymentQr: { type: String, default: "" }

}, { timestamps: true });

// Index quan trọng để tìm kiếm vị trí
driverSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Driver', driverSchema);