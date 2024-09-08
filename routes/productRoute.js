const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product'); // Adjust the path as needed
const authenticateToken = require('../middlewares/auth.middleware');

// Routes
router.post('/',createProduct);
router.get('/',getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
