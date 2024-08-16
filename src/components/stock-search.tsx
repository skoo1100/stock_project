import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { KospiDataType, KosdaqDataType } from '@json/json-type';
import kospiData from '@json/kospi.json';
import kosdaqData from '@json/kosdaq.json';
import StockSearchResult from './stock-search-result';

type StockDataType =
  | {
      kospi: KospiDataType[];
      kosdaq: KosdaqDataType[];
    }
  | undefined;

const StockSearch = () => {
  const [search, setSearch] = useState('');
  const [stockData, setStockData] = useState<StockDataType>({
    kospi: kospiData,
    kosdaq: kosdaqData,
  });

  const updateSearch = (value: string) => {
    const filteredKospi = kospiData.filter((item) => {
      const itemName = item.종목명 || '';
      return itemName.toLowerCase().includes(value.toLowerCase());
    });

    const filteredKosdaq = kosdaqData.filter((item) => {
      return item.종목명.toLowerCase().includes(value.toLowerCase());
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
    const textValue = e.target.value.trim();
    setSearch(textValue);
    debouncedUpdateSearch(textValue);
  };

  return (
    <>
      <input type="text" value={search} onChange={handleSearchChange} />
      <StockSearchResult stockData={stockData} />
    </>
  );
};

export default StockSearch;
