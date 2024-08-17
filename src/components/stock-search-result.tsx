import { useState } from 'react';
import { usePeriodStockQuery } from '@hooks/react-query/use-query-stock';
import { KospiDataType, KosdaqDataType } from '@json/json-type';
import { formatDateToYYYYMMDD } from '@utils/format-date';
import StockChart from './stock-chart';

type StockSearchResultProps = {
  stockData:
    | {
        kospi: KospiDataType[];
        kosdaq: KosdaqDataType[];
      }
    | undefined;
  date: {
    start: string;
    end: string;
  };
  option: {
    priceType: '0' | '1'; // 0: 원주가, 1: 수정주가
    periodType: 'D' | 'W' | 'M' | 'Y'; // D: Day, W: Week, M: Month, Y: Year
    stockType: 'J' | 'ETF' | 'ETN'; // J: 주식, ETF: ETF, ETN: ETN
  };
};

const StockSearchResult = ({ stockData, date, option }: StockSearchResultProps) => {
  const [stockCode, setStockCode] = useState('010140');

  const { data, isLoading, isError, error } = usePeriodStockQuery(
    stockCode,
    formatDateToYYYYMMDD(date.start),
    formatDateToYYYYMMDD(date.end),
    option.priceType,
    option.periodType,
    option.stockType,
  );

  const handleStockCodeClick = (code: string) => {
    setStockCode(code);
  };

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
