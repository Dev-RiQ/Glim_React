import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwtToken from '../utils/jwtToken';
import LoginPro from './user/page/LoginPro';
import NotFoundPage from './error/page/NotFoundPage';
const Login = lazy(() => import('./user/page/Login'));
const FindId = lazy(() => import('./user/page/FindId'));
const FindPw = lazy(() => import('./user/page/FindPw'));
const Join = lazy(() => import('./user/page/Join'));
const SocialJoin = lazy(() => import('./user/page/SocialJoin'));
const Main = lazy(() => import('./main/page/Main'));
const Search = lazy(() => import('./search/page/Search'));
const Shorts = lazy(() => import('./shorts/page/Shorts'));
const AddStory = lazy(() => import('./story/page/AddStory'));
const AddBoard = lazy(() => import('./board/page/AddBoard'));
const MyPage = lazy(() => import('./user/page/MyPage'));
const Chat = lazy(() => import('./chat/page/Chat'));
const ChatRoom = lazy(() => import('./chat/page/ChatRoom'));
const BoardView = lazy(() => import('./board/page/BoardView'));
const ShortsView = lazy(() => import('./shorts/page/ShortsView'));
const Alarm = lazy(() => import('./alarm/page/AlarmList'));
const UserInfo = lazy(() => import('./user/page/UserInfo'));
const UserList = lazy(() => import('./user/page/UserList'));
const Ranking = lazy(() => import('./ranking/page/Ranking'));

function Routing() {
  useEffect(() => {
    if ((!window.location.pathname.includes('/login') && window.location.pathname !== '/join') && !jwtToken.call()) {
      window.location.href = '/login';
    }
  }, [])

  return (
    <section>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/findId' element={<FindId />} />
            <Route path='/findPw' element={<FindPw />} />
            <Route path='/join' element={<Join />} />
            <Route path='/socialJoin' element={<SocialJoin />} />
            <Route path='/' element={<Main />} />
            <Route path='/alarm' element={<Alarm />} />
            <Route path='/login/:accessToken' element={<LoginPro />} />
            <Route path='/login/:accessToken/:noPhone' element={<LoginPro />} />
            <Route path='/search/' element={<Search />} />
            <Route path='/shorts/' element={<Shorts />} />
            <Route path='/shorts/:id' element={<ShortsView />} />
            <Route path='/addStory' element={<AddStory />} />
            <Route path='/addBoard/' element={<AddBoard />} />
            <Route path='/board/:id' element={<BoardView />} />
            <Route path='/myPage/' element={<MyPage />} />
            <Route path='/myPage/:id' element={<MyPage />} />
            <Route path='/userInfo' element={<UserInfo />} />
            <Route path='/userList' element={<UserList />} />
            <Route path='/chat/' element={<Chat />} />
            <Route path='/chatRoom/:id' element={<ChatRoom />} />
            <Route path='/ranking' element={<Ranking />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </section>
  );
}

export default Routing;