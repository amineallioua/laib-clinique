const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: {
      type: String,
      required: true
    }
  }],
  quantity: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  address: {
    type: String,
    required: true,
    trim: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
