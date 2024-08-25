import { SetStateAction } from 'react';
import { StockJSONType } from '@type/json-type';
import { StockDataType, StockDataListType } from '@type/stock-type';

type StockSearchResultProps = {
  stockDataList: StockDataListType;
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
