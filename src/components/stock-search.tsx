import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { StockJSONType } from '@json/json-type';
import kospiData from '@json/kospi.json';
import kosdaqData from '@json/kosdaq.json';
import StockSearchResult from './stock-search-result';
import StockChart from './stock-chart';

type StockDataType =
  | {
      kospi: StockJSONType[];
      kosdaq: StockJSONType[];
    }
  | undefined;

type OptionType = {
  priceType: '0' | '1'; // 0: 원주가, 1: 수정주가
  periodType: 'D' | 'W' | 'M' | 'Y'; // D: Day, W: Week, M: Month, Y: Year
  stockType: 'J' | 'ETF' | 'ETN'; // J: 주식, ETF: ETF, ETN: ETN
};

const StockSearch = () => {
  const [search, setSearch] = useState('');
  const [stockDataList, setStockDataList] = useState<StockDataType>({
    kospi: kospiData,
    kosdaq: kosdaqData,
  });
  const [stockData, setStockData] = useState<StockJSONType>({
    종목코드: '',
    종목명: '',
  });
  const [date, setDate] = useState({
    start: '',
    end: '',
  });
  const [option, setOption] = useState<OptionType>({
    priceType: '0',
    periodType: 'M',
    stockType: 'J',
  });

  const updateSearch = (value: string) => {
    const filteredKospi = kospiData.filter((item) => {
      const itemName = item.종목명 || '';
      return itemName.toLowerCase().includes(value.toLowerCase());
    });

    const filteredKosdaq = kosdaqData.filter((item) => {
      return item.종목명.toLowerCase().includes(value.toLowerCase());
    });

    setStockDataList({
      kospi: filteredKospi,
      kosdaq: filteredKosdaq,
    });
  };

  const debouncedUpdateSearch = useCallback(
    debounce((value: string) => {
      updateSearch(value);
    }, 300),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value.trim();
    setSearch(textValue);
    debouncedUpdateSearch(textValue);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({
      ...prev,
      start: e.target.value,
      end: prev.end < e.target.value ? e.target.value : prev.end,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate({ ...date, end: e.target.value });
  };

  const handleOptionChange = (type: keyof OptionType, value: OptionType[keyof OptionType]) => {
    setOption((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <input type="text" value={search} onChange={handleSearchChange} />
        <input type="date" value={date.start} onChange={handleStartDateChange} />
        <input type="date" value={date.end} onChange={handleEndDateChange} min={date.start} />
        <div>
          <button onClick={() => handleOptionChange('priceType', '0')}>수정주가</button>
          <button onClick={() => handleOptionChange('priceType', '1')}>원주가</button>
        </div>
        <div>
          <button onClick={() => handleOptionChange('periodType', 'D')}>일</button>
          <button onClick={() => handleOptionChange('periodType', 'W')}>주</button>
          <button onClick={() => handleOptionChange('periodType', 'M')}>월</button>
          <button onClick={() => handleOptionChange('periodType', 'Y')}>년</button>
        </div>
        <div>
          <button onClick={() => handleOptionChange('stockType', 'J')}>주식</button>
          <button onClick={() => handleOptionChange('stockType', 'ETF')}>ETF</button>
          <button onClick={() => handleOptionChange('stockType', 'ETN')}>ETN</button>
        </div>
        <div>
          <StockSearchResult stockDataList={stockDataList} setStockData={setStockData} />
        </div>
      </div>
      <div style={{ width: 400 }}>
        <StockChart stockData={stockData} date={date} option={option} />
      </div>
    </div>
  );
};

export default StockSearch;
