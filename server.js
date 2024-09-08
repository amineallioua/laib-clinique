const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orderRoute');
const productRoutes = require('./routes/productRoute');
const appointmentRoutes = require('./routes/appointementRoute');
const trainingRoutes = require('./routes/trainingRoute');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/user', userRoutes); // Use auth routes for registration, login, and logout
app.use('/api/order', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/trainings', trainingRoutes);

mongoose.connect('mongodb+srv://amarbouzida62:1234@cluster0.nlsdc.mongodb.net/', {
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
