import * as Page from '@/pages/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page.Root />}>
          <Route index element={<Page.Main />} />
          <Route path="search" element={<Page.Search />} />
          <Route path="stock-item/:code" element={<Page.StockItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
