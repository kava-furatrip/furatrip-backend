const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

router.post('/', async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    await newDriver.save();
    res.status(201).json({ message: 'Водитель сохранён' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при сохранении' });
  }
});

router.get('/', async (req, res) => {
  const drivers = await Driver.find().sort({ createdAt: -1 });
  res.json(drivers);
});

module.exports = router;
