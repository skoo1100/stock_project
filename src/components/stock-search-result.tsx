import { SetStateAction } from 'react';
import { StockJSONType } from '@json/json-type';

type DateType = {
  start: string;
  end: string;
};

type OptionType = {
  priceType: '0' | '1'; // 0: 원주가, 1: 수정주가
  periodType: 'D' | 'W' | 'M' | 'Y'; // D: Day, W: Week, M: Month, Y: Year
  stockType: 'J' | 'ETF' | 'ETN'; // J: 주식, ETF: ETF, ETN: ETN
};

type StockDataType = {
  first: StockJSONType;
  second: StockJSONType;
  date: DateType;
  option: OptionType;
};

type StockSearchResultProps = {
  stockDataList:
    | {
        kospi?: StockJSONType[];
        kosdaq?: StockJSONType[];
        etf: StockJSONType[];
      }
    | undefined;
  setStockData: React.Dispatch<SetStateAction<StockDataType>>;
  choice: 'first' | 'second';
};

const StockSearchResult = ({ stockDataList, setStockData, choice }: StockSearchResultProps) => {
  const handleStockCodeClick = (code: StockJSONType) => {
    setStockData((prev) => ({
      ...prev,
      [choice]: code,
    }));
  };

  return (
    <>
      <ul>
        {/*
        {stockDataList &&
          stockDataList.kospi.map((item) => (
            <li key={`kospi-${item.종목코드}`}>
              <button onClick={() => handleStockCodeClick(item)}>{item.종목명}</button>
            </li>
          ))}
        {stockDataList &&
          stockDataList.kosdaq.map((item) => (
            <li key={`kosdac-${item.종목코드}`}>
              <button onClick={() => handleStockCodeClick(item)}>{item.종목명}</button>
            </li>
          ))}
          */}
        {stockDataList &&
          stockDataList.etf.map((item) => (
            <li key={`kospi-${item.종목코드}`}>
              <button onClick={() => handleStockCodeClick(item)}>{item.종목명}</button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default StockSearchResult;
