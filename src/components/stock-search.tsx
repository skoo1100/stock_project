import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import kospiData from '@json/kospi.json';
import kosdaqData from '@json/kosdaq.json';

const StockSearch = () => {
  const [search, setSearch] = useState('');
  const [stockData, setStockData] = useState({
    kospi: kospiData,
    kosdaq: kosdaqData,
  });

  const updateSearch = (value: string) => {
    const filteredKospi = kospiData.filter((item: { 종목명?: string }) => {
      const itemName = item.종목명 || '';
      return itemName.toLowerCase().includes(value.toLowerCase());
    });

    const filteredKosdaq = kosdaqData.filter((item: { 종목명?: string }) => {
      const itemName = item.종목명 || '';
      return itemName.toLowerCase().includes(value.toLowerCase());
    });

    setStockData({
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
    setSearch(e.target.value);
    debouncedUpdateSearch(e.target.value);
  };

  const handleSearchClick = () => {
    //검색 시 나올 예정
    console.log(stockData.kospi);
    console.log(stockData.kosdaq);
  };

  return (
    <>
      <input type="text" value={search} onChange={handleSearchChange} />
      <button onClick={handleSearchClick}>검색</button>
    </>
  );
};

export default StockSearch;
