import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchStatistics } from '../redux/transactionsSlice'; 
import BarChartStats from './BarChartStats';

const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('March'); 
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.transactions.statistics); 
  useEffect(() => {
    
    const fetchTransactionsData = async () => {
      try {
        const data = await dispatch(fetchTransactions({ month, page, perPage, search }));
        setTransactions(data.payload.transactions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactionsData();
    
    
    dispatch(fetchStatistics(month));
  }, [month, page, perPage, search, dispatch]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value); 
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); 
  };

  const handleExpandDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="transaction-dashboard">
      <div className="header">
        <h2>Transaction Dashboard</h2>
        <div className="controls">
          <input
            type="text"
            placeholder="Search transaction"
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select
            value={month}
            onChange={handleMonthChange}
            className="month-dropdown"
          >
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="statistics-section">
        <h3>Statistics - {month}</h3>
        <div className="statistics-box">
          <p>Total Sale: {statistics?.totalSalesAmount || 0}</p>
          <p>Total Sold Items: {statistics?.totalSoldItems || 0}</p>
          <p>Total Not Sold Items: {statistics?.totalNotSoldItems || 0}</p>
        </div>
      </div>
      {/*Bar Charts Section */}
      <BarChartStats selectedMonth={month} />
      {/* Transactions Table */}
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.id}</td>
              <td>{tx.title}</td>
              <td>
                <div
                  className={`description ${
                    expandedDescriptions[tx._id] ? 'expanded' : ''
                  }`}
                >
                  {tx.description}
                </div>
                <button
                  onClick={() => handleExpandDescription(tx._id)}
                  className="expand-button"
                >
                  {expandedDescriptions[tx._id] ? 'Less' : 'More'}
                </button>
              </td>
              <td>{tx.price}</td>
              <td>{tx.category}</td>
              <td>{tx.sold ? 'Yes' : 'No'}</td>
              <td>
                <img src={tx.image} alt={tx.title} width="50" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>Page No: {page}</span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={transactions.length < perPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionDashboard;
