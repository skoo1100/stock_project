import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { OptionType, StockDataListType } from '@type/stock-type';
//import kospiData from '@json/kospi.json';
//import kosdaqData from '@json/kosdaq.json';
import etfData from '@json/etf.json';
import StockSearchResult from '@components/stock-search-result';
import { useStockDataStore } from '@stores/stock-data';

const StockSearch = () => {
  const { stockData, setStockData } = useStockDataStore();
  const [search, setSearch] = useState('');
  const [stockDataList, setStockDataList] = useState<StockDataListType>({
    //kospi: kospiData,
    //kosdaq: kosdaqData,
    etf: etfData,
  });

  const updateSearch = (value: string) => {
    /*
    const filteredKospi = kospiData.filter((item) => {
      const itemName = item.종목명 || '';
      return itemName.toLowerCase().includes(value.toLowerCase());
    });

    const filteredKosdaq = kosdaqData.filter((item) => {
      return item.종목명.toLowerCase().includes(value.toLowerCase());
    });
    */

    const filteredEtf = etfData.filter((item) => {
      return item.종목명.toLowerCase().includes(value.toLowerCase());
    });

    setStockDataList({
      etf: filteredEtf,
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
    setStockData({
      ...stockData,
      date: {
        start: e.target.value,
        end: stockData.date.end < e.target.value ? e.target.value : stockData.date.end,
      },
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockData({
      ...stockData,
      date: {
        ...stockData.date,
        end: e.target.value,
      },
    });
  };

  const handleOptionChange = (type: keyof OptionType, value: OptionType[keyof OptionType]) => {
    setStockData({
      ...stockData,
      option: {
        ...stockData.option,
        [type]: value,
      },
    });
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleSearchChange} />
      {/*
      <input type="date" value={stockData.date.start} onChange={handleStartDateChange} />
      <input type="date" value={stockData.date.end} onChange={handleEndDateChange} min={stockData.date.start} />
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
      */}
      <div>
        <StockSearchResult stockDataList={stockDataList} />
      </div>
    </div>
  );
};

export default StockSearch;
