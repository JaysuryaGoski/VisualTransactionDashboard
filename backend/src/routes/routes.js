const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController');
const statisticsController = require('../controllers/statisticsController');
const pieChartController = require('../controllers/pieChartController');
const combinedController = require('../controllers/combinedController');
const barChartController = require('../controllers/barChartController');
const seedController  = require('../controllers/seedController');

// Transactions Routes
router.get('/transactions', transactionController.getTransactions);

// Statistics Routes
router.get('/statistics', statisticsController.getStatistics);

// Pie Chart Routes
router.get('/pie-chart', pieChartController.getPieChart);

// Combined Data Routes
router.get('/combined-data', combinedController.getCombinedData);

// Bar Chart Routes
router.get('/bar-chart', barChartController.getBarChart);

//Seed Routes
router.get('/seed',seedController.seedDatabase);
module.exports = router;