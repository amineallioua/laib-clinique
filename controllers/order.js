const Order = require('../models/order');
const Product = require('../models/product'); // Assuming you have a Product model

// Create a new order with multiple products and quantities
exports.createOrder = async (req, res) => {
  try {
    const { clientName, phone, products, address } = req.body;

    // Calculate the total price of the order
    let total = 0;
    const productDetails = await Promise.all(products.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      const amount = item.quantity; // Quantity of each product
      const priceForProduct = product.price * amount;
      total += priceForProduct;

      return {
        productId: product._id,
        productName: product.name,
        quantity: amount
      };
    }));

    // Create a new order
    const newOrder = new Order({
      clientName,
      phone,
      products: productDetails,
      address,
      total,
      status: 'Pending' // Default status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

exports.confirmOrder = async (req, res) => {
    try {
      const { orderId } = req.params; // Assuming the order ID is passed as a URL parameter
  
      // Find the order by ID
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if the order is already confirmed
      if (order.status === 'Confirmed') {
        return res.status(400).json({ message: 'Order is already confirmed' });
      }
  
      // Update the stock quantity for each product
      await Promise.all(order.products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
  
        // Ensure sufficient stock is available
        if (product.stockQuantity < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }
  
        // Reduce the product stock by the ordered quantity
        product.stockQuantity -= item.quantity;
        await product.save();
      }));
  
      // Update the order status to "Confirmed"
      order.status = 'Confirmed';
      await order.save();
  
      res.status(200).json({ message: 'Order confirmed successfully', order });
    } catch (error) {
      res.status(500).json({ message: 'Failed to confirm order', error: error.message });
    }
  };
