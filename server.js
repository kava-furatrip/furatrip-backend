const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Подключение к MongoDB
mongoose.connect(
  'mongodb+srv://kava:Gringo4689@cluster0.o971ycv.mongodb.net/furatrip?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log('✅ MongoDB подключён!'))
 .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

// 📦 Схема водителя
const driverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  telegram: String,
  truckType: String,
  region: String,
  experience: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Driver = mongoose.model('Driver', driverSchema);

// 🚀 Эндпоинт Webhook (например, для Tally)
app.post('/api/drivers', async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    await newDriver.save();
    console.log('✅ Новый водитель добавлен:', req.body);
    res.status(201).json({ message: 'Водитель добавлен' });
  } catch (err) {
    console.error('❌ Ошибка при добавлении водителя:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// 🛠 Проверка сервера
app.get('/', (req, res) => {
  res.send('FuraTrip backend работает!');
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
