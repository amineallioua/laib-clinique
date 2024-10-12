const Product = require('../models/product'); // Adjust the path as needed

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stockQuantity } = req.body;
    const photo = req.file ? req.file.path : ''; // Save the uploaded photo path

    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: 'A product with the same name already exists' });
    }

    const product = new Product({
      name,
      description,
      photo, // Store the file path of the uploaded image
      price,
      stockQuantity
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product name must be unique' });
    }
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, description, photo, price, stockQuantity } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, photo, price, stockQuantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
