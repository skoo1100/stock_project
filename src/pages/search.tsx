import StockSearch from '@components/stock-search';
import { useStockDataStore } from '@stores/stock-data';

const Search = () => {
  const { stockData, initStockData } = useStockDataStore();

  return (
    <div style={{ display: 'flex' }}>
      <StockSearch />
      <button onClick={() => initStockData}>초기화</button>
    </div>
  );
};

export default Search;
