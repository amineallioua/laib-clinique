const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoute');
const productRoutes = require('./routes/productRoute');
const appointmentRoutes = require('./routes/appointementRoute');
const trainingRoutes = require('./routes/trainingRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/trainings', trainingRoutes);



// Connect to MongoDB
mongoose.connect('mongodb+srv://amarbouzida62:1234@cluster0.nlsdc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
