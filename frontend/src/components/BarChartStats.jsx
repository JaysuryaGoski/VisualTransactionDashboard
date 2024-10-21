import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchBarCharts } from '../api';  

const BarChartStats = ({ selectedMonth }) => {
  const [priceRangeData, setPriceRangeData] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for month:", selectedMonth);
        const data = await fetchBarCharts(selectedMonth);  
        console.log("API response data:", data);
        if (data && Array.isArray(data)) {
          setPriceRangeData(data);  
        } else {
          console.log("No valid price range data found");
          setPriceRangeData([]); 
        }
      } catch (error) {
        console.error("Error fetching bar chart data:", error.message);
        setError(error.message);
      }
    };

    if (selectedMonth) {
      fetchData();  
    }
  }, [selectedMonth]);

  return (
    <div className="bar-chart-container">
      <h3>Bar Chart Stats - {selectedMonth}</h3>
      {error ? (
        <p>Error: {error}</p>
      ) : priceRangeData ? (
        priceRangeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={priceRangeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />  
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00C2C7" /> 
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available for this month.</p>  
        )
      ) : (
        <p>Loading...</p>  
      )}
    </div>
  );
};

export default BarChartStats;
