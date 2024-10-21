const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes/routes');
const seedController = require('./src/controllers/seedController'); 

const app = express();
const PORT = 8080;
app.use(cors());
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/storeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');

  // Seed the database when the server starts
  try {
    const seedResponse = await seedController.seedDatabase({ query: {} }, {
      status: (code) => ({
        json: (data) => console.log(`Seeding status: ${code}`, data)
      })
      
    });
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }

  // Start the server only after seeding
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);
