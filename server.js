const express = require('express');

const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orderRoute');
const productRoutes = require('./routes/productRoute');
const appointmentRoutes = require('./routes/appointementRoute');
const trainingRoutes = require('./routes/trainingRoute');
const trainingrequestRoutes = require('./routes/trainingrequest');
require('dotenv').config();  // Load .env file

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/user', userRoutes); // Use auth routes for registration, login, and logout
app.use('/api/order', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/trainingrequest', trainingrequestRoutes)

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});