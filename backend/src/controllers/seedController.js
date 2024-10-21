const axios = require('axios');
const Product = require('../models/product');

exports.seedDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const products = response.data;

    // Clear existing products
    await Product.deleteMany({});

    // Create products from seed data
    const createdProducts = await Product.insertMany(products);

    res.status(201).json({ message: 'Database seeded successfully', count: createdProducts.length });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error });
  }
};