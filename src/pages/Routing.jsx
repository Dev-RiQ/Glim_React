import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwtToken from '../utils/jwtToken';
import LoginPro from './main/page/LoginPro';
import NotFoundPage from './error/page/NotFoundPage';
const Login = lazy(() => import('./main/page/Login'));
const Main = lazy(() => import('./main/page/Main'));
const Search = lazy(() => import('./search/page/Search'));
const Shorts = lazy(() => import('./shorts/page/Shorts'));
const AddBoard = lazy(() => import('./board/page/AddBoard'));
const MyPage = lazy(() => import('./user/page/MyPage'));
const Chat = lazy(() => import('./chat/page/Chat'));
const ChatRoom = lazy(() => import('./chat/page/ChatRoom'));

function Routing() {
  useEffect(() => {
    if ((window.location.pathname.includes('/login') && window.location.pathname !== '/join') && !jwtToken.call()) {
      // window.location.href = '/login';
    }
  }, [])

  return (
    <section>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Main />} />
            <Route path='/login/:accessToken' element={<LoginPro />} />
            <Route path='/search/' element={<Search />} />
            <Route path='/shorts/' element={<Shorts />} />
            <Route path='/addBoard/' element={<AddBoard />} />
            <Route path='/myPage/' element={<MyPage />} />
            <Route path='/chat/' element={<Chat />} />
            <Route path='/chatRoom/:id' element={<ChatRoom />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </section>
  );
}

export default Routing;