const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const tripRoutes = require('./routes/tripRoutes'); // ⬅️ добавили

const app = express();
const PORT = process.env.PORT || 100000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes); // ⬅️ подключили маршрут

mongoose.connect(
  'mongodb+srv://kava:gringo4689@cluster0.o971ycv.mongodb.net/furatrip?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log('✅ MongoDB подключён!');
  app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  });
})
.catch((err) => console.error('Ошибка подключения к MongoDB:', err));
