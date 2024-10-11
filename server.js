const express = require('express');
const cors = require ('cors')
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orderRoute');
const productRoutes = require('./routes/productRoute');
const appointmentRoutes = require('./routes/appointementRoute');
const trainingRoutes = require('./routes/trainingRoute');
const trainingrequestRoutes = require('./routes/trainingrequest');
const connectedDB = require ('./config/database')
require('dotenv').config();  // Load .env file

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

connectedDB();
app.use(cors({
  origin: 'http://localhost:5173' // Allow your frontend origin
}));

app.use('/uploads', express.static('uploads'));


app.use('/api/user', userRoutes); // Use auth routes for registration, login, and logout
app.use('/api/order', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/trainingrequest', trainingrequestRoutes)




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});