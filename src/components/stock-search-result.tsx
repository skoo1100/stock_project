import { SetStateAction } from 'react';
import { StockJSONType } from '@json/json-type';

type StockSearchResultProps = {
  stockDataList:
    | {
        kospi: StockJSONType[];
        kosdaq: StockJSONType[];
      }
    | undefined;
  setStockData: React.Dispatch<SetStateAction<StockJSONType>>;
};

const StockSearchResult = ({ stockDataList, setStockData }: StockSearchResultProps) => {
  const handleStockCodeClick = (code: StockJSONType) => {
    setStockData(code);
  };

  return (
    <>
      <ul>
        {/* Kospi */}
        {stockDataList &&
          stockDataList.kospi.map((item) => (
            <li key={`kospi-${item.종목코드}`}>
              <button onClick={() => handleStockCodeClick(item)}>{item.종목명}</button>
            </li>
          ))}
        {/* Kosdac */}
        {stockDataList &&
          stockDataList.kosdaq.map((item) => (
            <li key={`kosdac-${item.종목코드}`}>
              <button onClick={() => handleStockCodeClick(item)}>{item.종목명}</button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default StockSearchResult;
