import { useState } from 'react';
import { useSetAccessTokenCookie, useSetApprovalKeyCookie } from '@hooks/use-set-cookie';
import useWebSocket from '@hooks/web-socket/use-web-socket';
import { usePeriodStockQuery } from '@hooks/react-query/use-query-stock';
import ApexCharts from 'apexcharts';
import StockChart from '@components/stock-chart';
import StockSearch from '@components/stock-search';
import { StockJSONType } from '@type/json-type';
import { StockDataType } from '@type/stock-type';
import StockCalendar from '@components/stock-calendar';

function Test() {
  //const accessToken = useSetAccessTokenCookie(); // 인증 토큰
  //const approvalKey = useSetApprovalKeyCookie(); // 웹소켓 접속 키

  //const { ws, error, messages } = useWebSocket();

  //const { data, isLoading, isError, error } = usePeriodStockQuery('010140', '20220411', '20220509');

  //console.log(data);
  const [stockData, setStockData] = useState<StockDataType>({
    first: {
      종목코드: '',
      종목명: '',
    },
    second: {
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
  });

  return (
    <div style={{ display: 'flex' }}>
      {/* 
      <ul>
        {messages.map((msg: string, index: number) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      */}
      <div style={{ display: 'flex' }}>
        <StockSearch stockData={stockData} setStockData={setStockData} choice={'first'} />
        <StockSearch stockData={stockData} setStockData={setStockData} choice={'second'} />
        <button
          onClick={() =>
            setStockData({
              first: {
                종목코드: '',
                종목명: '',
              },
              second: {
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
            })
          }
        >
          초기화
        </button>
      </div>
      <div>
        <StockChart stockData={stockData} />
        <StockCalendar stockData={stockData} />
      </div>
    </div>
  );
}

export default Test;
