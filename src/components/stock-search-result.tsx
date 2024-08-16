import { usePeriodStockQuery } from '@hooks/react-query/use-query-stock';
import { KospiDataType, KosdaqDataType } from '@json/json-type';
import StockChart from './stock-chart';
import { useState } from 'react';

type StockSearchResultProps = {
  stockData:
    | {
        kospi: KospiDataType[];
        kosdaq: KosdaqDataType[];
      }
    | undefined;
};

const StockSearchResult = ({ stockData }: StockSearchResultProps) => {
  const [stockCode, setStockCode] = useState('010140');

  const { data, isLoading, isError, error } = usePeriodStockQuery(stockCode, '20220411', '20220509');

  const handleStockCodeClick = (code: string) => {
    setStockCode(code);
  };
  console.log(stockCode);
  console.log(data);

  return (
    <>
      <ul>
        {/* 코스피 */}
        {stockData &&
          stockData.kospi.map((item) => (
            <li key={`kospi-${item.종목코드}`}>
              <button onClick={() => handleStockCodeClick(item.종목코드)}>{item.종목명}</button>
            </li>
          ))}
        {/* 코스닥 */}
        {stockData &&
          stockData.kosdaq.map((item) => (
            <li key={`kosdac-${item.종목코드}`}>
              <button onClick={() => handleStockCodeClick(item.종목코드)}>{item.종목명}</button>
            </li>
          ))}
      </ul>
      <StockChart stockData={data} />
    </>
  );
};

export default StockSearchResult;
