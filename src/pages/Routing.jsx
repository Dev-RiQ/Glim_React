import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Main = lazy(() => import('./main/page/Main'));

function Routing() {
  return (
    <section>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Main />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </section>
  );
}

export default Routing;