const axios = require('axios');

exports.getCombinedData = async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;

  
  if (!month) {
    return res.status(400).json({ message: 'Month is required' });
  }

  try {
    
    const baseURL = 'http://localhost:8080/api';

    
    const apiCalls = [
      axios.get(`${baseURL}/transactions`, { params: { month, page, perPage, search } }),
      axios.get(`${baseURL}/statistics`, { params: { month } }),
      axios.get(`${baseURL}/pie-chart`, { params: { month } })
    ];

   
    const responses = await Promise.all(apiCalls);

    
    const combinedData = {
      transactions: responses[0].data,
      statistics: responses[1].data,
      pieChart: responses[2].data
    };

    
    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching combined data' });
  }
};