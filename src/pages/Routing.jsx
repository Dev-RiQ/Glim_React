import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Main = lazy(() => import('./main/page/Main'));
const Search = lazy(() => import('./search/page/Search'));
const Shorts = lazy(() => import('./shorts/page/Shorts'));
const AddBoard = lazy(() => import('./board/page/AddBoard'));
const MyPage = lazy(() => import('./user/page/MyPage'));

function Routing() {

  return (
    <section>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/search/' element={<Search />} />
            <Route path='/shorts/' element={<Shorts />} />
            <Route path='/addBoard/' element={<AddBoard />} />
            <Route path='/myPage/' element={<MyPage />} />
            <Route path='/chat/' element={<MyPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </section>
  );
}

export default Routing;