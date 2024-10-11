const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order'); // Ensure the correct path to the controller

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to confirm an order
router.put('/confirm/:orderId', orderController.confirmOrder);

router.get('/getAllOrders',orderController.getAllOrders);

router.get('/:id',orderController.getOrderById);

module.exports = router;
