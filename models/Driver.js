const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: String,
  telegram: String,
  phone: String,
  region: String,
  carType: String,
  license: String,
  experience: String,
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Driver', driverSchema);
