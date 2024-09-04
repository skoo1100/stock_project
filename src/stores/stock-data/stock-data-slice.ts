import { StateCreator } from 'zustand';
import { StockDataType } from '@type/stock-type';

export type StockDataStoreType = {
  stockData: StockDataType;
  setStockData: (data: StockDataType) => void;
  initStockData: () => void;
};

export const stockDataSlice: StateCreator<StockDataStoreType> = (set) => ({
  stockData: {
    data: {
      종목코드: '',
      종목명: '',
    },
    date: {
      start: '',
      end: '',
    },
    option: {
      priceType: '0',
      periodType: 'M',
    },
  },
  setStockData: (data: StockDataType) => set({ stockData: data }),
  initStockData: () =>
    set({
      stockData: {
        data: {
          종목코드: '',
          종목명: '',
        },
        date: {
          start: '',
          end: '',
        },
        option: {
          priceType: '0',
          periodType: 'M',
        },
      },
    }),
});
