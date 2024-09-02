import * as Page from '@/pages/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page.Root />}>
          <Route index element={<Page.Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
