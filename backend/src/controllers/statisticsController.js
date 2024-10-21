const Product = require('../models/product');
exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  
  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  try {
   
    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

    
    const monthFilter = { $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] } };

    
    const totalSales = await Product.aggregate([
      { $match: { sold: true, ...monthFilter } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' }
        }
      }
    ]);

    
    const totalSoldItems = await Product.countDocuments({
      sold: true,
      ...monthFilter
    });

    
    const totalNotSoldItems = await Product.countDocuments({
      sold: false,
      ...monthFilter
    });

    res.status(200).json({
      totalSalesAmount: totalSales.length ? totalSales[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};