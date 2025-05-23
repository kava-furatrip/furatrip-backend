const express = require('express');
const router = express.Router();

// Тестовый маршрут
router.get('/', (req, res) => {
  res.json({ message: '🔥 Роут /api/users работает!' });
});

module.exports = router;
