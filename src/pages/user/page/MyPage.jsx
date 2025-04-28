import { React } from 'react';
import "../style/myPage.css"
import MyPageUserInfo from '../component/MyPageUserInfo';
import MyPageBoardList from '../../board/component/MyPageBoardList';
import user1 from '../../../assets/test/user1.jpg'

function MyPage(props) {

  let isMine = true;


  return (
    <div className="mypage-box">
      <MyPageUserInfo link={user1} isMine={isMine} />
      <MyPageBoardList />
    </div>
  )
};

export default MyPage;
