import { StockJSONType } from '@type/json-type';

export type DateType = {
  start: string;
  end: string;
};

export type OptionType = {
  priceType: '0' | '1'; // 0: 원주가, 1: 수정주가
  periodType: 'D' | 'W' | 'M' | 'Y'; // D: Day, W: Week, M: Month, Y: Year
};

export type StockDataType = {
  first: StockJSONType;
  second: StockJSONType;
  date: DateType;
  option: OptionType;
};

export type StockDataListType =
  | {
      kospi?: StockJSONType[];
      kosdaq?: StockJSONType[];
      etf: StockJSONType[];
    }
  | undefined;
