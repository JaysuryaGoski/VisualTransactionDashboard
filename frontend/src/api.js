import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const fetchTransactions = async (month, page, perPage, search) => {
  try {
    const response = await api.get('/transactions', {
      params: { month, page, perPage, search },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchStatistics = async (month) => {
  try {
    const response = await api.get('/statistics', {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchBarCharts = async (month)=>{
    try{
        const response = await api.get('/bar-chart',{
            params: {month},

        })
        return response.data;

    }catch(error){
        console.error(error);
        throw error;
    }
}