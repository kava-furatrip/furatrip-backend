const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const mongoose = require('mongoose');

// Создание поездки
router.post('/', async (req, res) => {
  const { driver, from, to, date, seatsAvailable, price } = req.body;

  try {
    const trip = new Trip({
      driver: new mongoose.Types.ObjectId(driver),
      from,
      to,
      date,
      seatsAvailable,
      price
    });

    await trip.save();
    res.json({ success: true, trip });
  } catch (err) {
    console.error('❌ Ошибка при создании поездки:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Получение всех поездок
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().populate('driver', 'telegramId name');
    res.json(trips);
  } catch (err) {
    console.error('❌ Ошибка при получении поездок:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;