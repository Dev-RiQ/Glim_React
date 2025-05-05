import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwtToken from '../utils/jwtToken';
import LoginPro from './user/page/LoginPro';
import NotFoundPage from './error/page/NotFoundPage';
import Loading from './loading/page/Loading';
const Login = lazy(() => import('./user/page/Login'));
const FindId = lazy(() => import('./user/page/FindId'));
const FindPw = lazy(() => import('./user/page/FindPw'));
const ChangePhone = lazy(() => import('./user/page/ChangePhone'));
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
const MySave = lazy(() => import('./board/page/MySave'));
const MyStory = lazy(() => import('./story/page/MyStory'));
const MyStoryView = lazy(() => import('./story/page/MyStoryView'));
const Pay = lazy(() => import('./pay/page/Pay'));
const Admin = lazy(() => import('./admin/page/Admin'));

function Routing() {
  useEffect(() => {
    if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/find') && !window.location.pathname.includes('join') && !jwtToken.call()) {
      window.location.href = '/login';
    }
  }, [])

  return (
    <section>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/findId' element={<FindId />} />
            <Route path='/findPw' element={<FindPw />} />
            <Route path='/changePhone' element={<ChangePhone />} />
            <Route path='/join' element={<Join />} />
            <Route path='/socialjoin' element={<SocialJoin />} />
            <Route path='/' element={<Main />} />
            <Route path='/alarm' element={<Alarm />} />
            <Route path='/login/:accessToken' element={<LoginPro />} />
            <Route path='/login/:accessToken/:noPhone' element={<LoginPro />} />
            <Route path='/search/' element={<Search />} />
            <Route path='/shorts/' element={<Shorts />} />
            <Route path='/shorts/:id' element={<ShortsView />} />
            <Route path='/addStory' element={<AddStory />} />
            <Route path='/story/:id' element={<MyStoryView />} />
            <Route path='/addBoard/' element={<AddBoard />} />
            <Route path='/board/:id' element={<BoardView />} />
            <Route path='/myPage/' element={<MyPage />} />
            <Route path='/myPage/:id' element={<MyPage />} />
            <Route path='/myStory' element={<MyStory />} />
            <Route path='/mySave' element={<MySave />} />
            <Route path='/userInfo' element={<UserInfo />} />
            <Route path='/userList' element={<UserList />} />
            <Route path='/chat/' element={<Chat />} />
            <Route path='/chatRoom/:id' element={<ChatRoom />} />
            <Route path='/ranking' element={<Ranking />} />
            <Route path='/pay' element={<Pay />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </section>
  );
}

export default Routing;