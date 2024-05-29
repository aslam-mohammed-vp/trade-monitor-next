import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store/store';
import type { Stock, StockDataMap } from '@/types/types';

interface StocklistState {
  watchlist: string[];
  stockData: StockDataMap;
}

const initialState: StocklistState = {
  watchlist: [],
  stockData: {},
};

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist.push(action.payload);
    },
    updateStockData: (state, action: PayloadAction<Stock>) => {
      const data = action.payload;
      if (state.watchlist.includes(data.isin)) {
        state.stockData[data.isin] = data;
      }
    },
    removeFromWatchList: (state, action: PayloadAction<string>) => {
      const removeId = action.payload;
      state.watchlist = state.watchlist.filter((id) => id !== removeId);
      delete state.stockData[removeId];
    },
  },
});

export const { addToWatchlist, updateStockData, removeFromWatchList } =
  stockSlice.actions;

export const watchListSelector = (state: RootState) =>
  state.stockSlice.watchlist;

export const stockDataSelector = (state: RootState) =>
  state.stockSlice.stockData;

export default stockSlice.reducer;
