const Product = require('../models/product');

exports.getPieChart = async (req, res) => {
  const { month } = req.query;

 
  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  try {
    
    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

    
    const result = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        }
      },
      {
        $group: {
          _id: '$category', 
          count: { $sum: 1 } 
        }
      },
      {
        $sort: { count: -1 } 
      }
    ]);

   
    const response = result.map(item => ({
      category: item._id,
      count: item.count
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching pie chart data' });
  }
};