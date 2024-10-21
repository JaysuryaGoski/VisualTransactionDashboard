const Product = require('../models/product');

exports.getBarChart = async (req, res) => {
  const { month } = req.query;

  
  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  try {
   
    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

    const priceRanges = [
      [0, 100],
      [101, 200],
      [201, 300],
      [301, 400],
      [401, 500],
      [501, 600],
      [601, 700],
      [701, 800],
      [801, 900],
      [901, Infinity]
    ];

    
    const result = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        }
      },
      {
        $bucket: {
          groupBy: '$price', 
          boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901], 
          default: '901+', 
          output: {
            count: { $sum: 1 } 
          }
        }
      }
    ]);

    
    const response = priceRanges.map((range, index) => {
      const label = range[1] === Infinity ? `${range[0]}-above` : `${range[0]}-${range[1]}`;
      const bucket = result.find(bucket => {
        if (index === result.length - 1 && bucket._id === '901+') return true;
        return bucket._id >= range[0] && bucket._id < range[1];
      });
      return {
        range: label,
        count: bucket ? bucket.count : 0
      };
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bar chart data' });
  }
};