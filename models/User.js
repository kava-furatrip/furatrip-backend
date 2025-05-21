const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, default: 'passenger' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);