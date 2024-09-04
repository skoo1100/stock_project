import { StockDataStoreType, stockDataSlice } from '@stores/stock-data/stock-data-slice';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export const useStockDataStore = create<StockDataStoreType>()(
  persist(
    (...set) => ({
      ...stockDataSlice(...set),
    }),
    {
      name: 'stock-data-storage',
    },
  ),
);
