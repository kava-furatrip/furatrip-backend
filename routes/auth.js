const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Роут для регистрации по Telegram ID
router.post('/telegram', async (req, res) => {
  const { telegramId, name } = req.body;

  try {
    let user = await User.findOne({ telegramId });

    if (!user) {
      user = new User({ telegramId, name });
      await user.save();
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
});

module.exports = router;