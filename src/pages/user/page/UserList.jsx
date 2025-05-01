import React, { useEffect, useState } from 'react';
import '../style/userList.css';
import { useLocation } from 'react-router-dom';
import UserImage from '../component/UserImage';
import api from '../../../utils/api';

function UserList() {
  const location = useLocation()
  const type = useState(location.state.type)
  const userId = useState(location.state.userId)
  const [userList, setUserList] = useState([])
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    moreUserList()
  }, [])

  async function moreUserList() {
    let list = []
    if (type === 'follower') {
      list = await api.get(`/follow/followers/${userId}` + (offset !== 0 ? `/${offset}` : ''))
    } else {
      list = await api.get(`/follow/followings/${userId}` + (offset !== 0 ? `/${offset}` : ''))
    }
    let showUserList = []
    list.forEach(element => {
      showUserList = [...showUserList, (
        <div className='show-user-box'>
          <div className='show-user-img'>
            <UserImage link={element.img} />
          </div>
          <div className='show-user-info' onClick={() => window.location.href = `/myPage/${element.id}`}>
            <div className='show-user-nickname'>
              {element.nickname}
            </div>
            <div className='show-user-name'>
              {element.name}
            </div>
          </div>
        </div>
      )]
    })
    setOffset(list[list.length - 1].id)
    setUserList([...userList, showUserList])
  }

  return (
    <div className="user-list-box">
      {userList}
    </div>
  );
}

export default UserList;
