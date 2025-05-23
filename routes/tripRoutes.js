const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Получить все поездки
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    console.error('Ошибка при получении поездок:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
