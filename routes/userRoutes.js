const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Регистрация пользователя (водителя или пассажира)
router.post('/register', async (req, res) => {
  try {
    const { name, telegramId, role } = req.body;

    if (!name || !telegramId) {
      return res.status(400).json({ message: 'Имя и Telegram ID обязательны' });
    }

    const existingUser = await User.findOne({ telegramId });
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь уже зарегистрирован' });
    }

    const newUser = new User({ name, telegramId, role });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить всех пользователей
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении пользователей' });
  }
});

module.exports = router;