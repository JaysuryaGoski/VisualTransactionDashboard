const Product = require('../models/product');

exports.getTransactions = async (req, res) => {
  const { page, perPage, search, month } = req.query;

  
  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  
  const pagination = {
    page: parseInt(page) || 1,
    perPage: parseInt(perPage) || 10
  };

  try {
    
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    };

    const monthNumber = monthMap[month];

    
    if (!monthNumber) {
      return res.status(400).json({ message: 'Invalid month' });
    }

    
    const query = {
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, monthNumber] 
      }
    };

    
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') }, 
        { description: new RegExp(search, 'i') }, 
        { price: !isNaN(parseFloat(search)) ? parseFloat(search) : undefined } 
      ];
    }

    // Pagination logic
    const skip = (pagination.page - 1) * pagination.perPage;
    const total = await Product.countDocuments(query);
    const transactions = await Product.find(query).skip(skip).limit(pagination.perPage);

    // Return the paginated results
    res.status(200).json({
      total,
      page: pagination.page,
      perPage: pagination.perPage,
      transactions
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};
