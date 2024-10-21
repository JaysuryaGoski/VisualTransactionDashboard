import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching transactions
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ month, page, perPage, search }) => {
    const response = await axios.get('http://localhost:8080/api/transactions', {
      params: { month, page, perPage, search }
    });
    return response.data;
  }
);

// Async thunk for fetching statistics
export const fetchStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async (month) => {
    const response = await axios.get('http://localhost:8080/api/statistics', {
      params: { month }
    });
    return response.data;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    page: 1,
    perPage: 10,
    total: 0,
    search: '',
    month: '',
    status: 'idle',
    error: null,
    statistics: {} 
  },
  
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        console.log('Transactions data:', action.payload);
        state.status = 'succeeded';
        state.transactions = action.payload.transactions;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  }
});

export const { setPage, setSearch, setMonth } = transactionsSlice.actions;
export default transactionsSlice.reducer;