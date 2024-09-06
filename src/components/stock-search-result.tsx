import { useNavigate } from 'react-router-dom';
import { StockJSONType } from '@type/json-type';
import { StockDataListType } from '@type/stock-type';
import { useStockDataStore } from '@stores/stock-data';

type StockSearchResultProps = {
  stockDataList: StockDataListType;
};

const StockSearchResult = ({ stockDataList }: StockSearchResultProps) => {
  const navigate = useNavigate();
  const { stockData, setStockData } = useStockDataStore();

  const handleStockCodeClick = (item: StockJSONType) => {
    setStockData({
      ...stockData,
      data: item,
    });
    navigate(`/stock-item/${stockData.data.종목코드}`);
  };

  return (
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
  );
};

export default StockSearchResult;
