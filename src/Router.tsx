import * as Page from '@/pages/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page.Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
