import { React, useEffect, useState } from 'react';
import "../style/myPage.css"
import MyPageUserInfo from '../component/MyPageUserInfo';
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';

function MyPage() {
  const userId = useParams().id;
  const [myPage, setMyPage] = useState([]);

  useEffect(() => {
    if (userId) {
      getUserInfo(userId)
    } else {
      getUserInfo()
    }
  }, [])

  async function getUserInfo(id) {
    const user = (id ? await api.get(`/auth/${id}`) : await api.get('/auth/me'))

    setMyPage(
      <div className="mypage-box">
        <MyPageUserInfo user={user} isMine={user.isMine !== undefined ? user.isMine : true} />
      </div>
    )
  }

  return (
    <>
      {myPage}
    </>
  )
};

export default MyPage;
