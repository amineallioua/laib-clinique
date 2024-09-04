const express = require('express');
const connectDB = require('./config/database'); // Import the database connection file
const orderRoutes = require('./routes/orderRoute');
const productRoutes = require('./routes/productRoute');
const appointmentRoutes = require('./routes/appointementRoute');
const trainingRoutes = require('./routes/trainingRoute');

const app = express();
const PORT = process.env.PORT || 4000; // Updated port number

// Connect to MongoDB
connectDB(); // Initialize the database connection

// Middleware
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/trainings', trainingRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
