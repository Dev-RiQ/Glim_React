import React, { useEffect, useState } from 'react';
import '../style/userList.css';
import { useLocation } from 'react-router-dom';
import UserImage from '../component/UserImage';
import api from '../../../utils/api';
import IconButton from '../../../components/IconButton';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function UserList() {
  const location = useLocation()
  const type = location.state.type
  const userId = location.state.userId
  const [userList, setUserList] = useState([])
  const [offset, setOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    moreUserList()
  }, [])

  async function scroll(e) {
    if (offset === 0) return;
    const rect = e.currentTarget.getBoundingClientRect()
    if (rect.bottom < window.innerHeight) {
      if (isLoaded) return;
      setIsLoaded(true)
      await moreUserList()
      setIsLoaded(false)
    }
  }


  async function moreUserList() {
    let list = []
    if (type === 'follower') {
      list = await api.get(`/follow/followers/${userId}` + (offset !== 0 ? `/${offset}` : ''))
    } else {
      list = await api.get(`/follow/followings/${userId}` + (offset !== 0 ? `/${offset}` : ''))
    }
    let showUserList = []
    list?.forEach(element => {
      showUserList = [...showUserList, (
        <div className='show-user-box'>
          <div className='show-user-img'>
            <UserImage link={element.img} />
          </div>
          <div className='show-user-info' onClick={() => window.location.href = `/myPage/${element.userId}`}>
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
    list && setUserList([...userList, showUserList])
    list && setOffset(list[list.length - 1].id)
    !list && offset === 0 && setUserList([(<div className='no-list'><p>유저 정보가 존재하지 않습니다.</p></div>)])
    !list && setOffset(0)
  }

  return (
    <div className='follow-list-box'>
      <div className='back'>
        <div className='back-btn' onClick={() => window.history.back()}>
          <IconButton icon={faChevronLeft} />
        </div>
        <div className='type-title'>
          {type === 'follower' ?
            '팔로워'
            : '팔로잉'}
        </div>
      </div>
      <div className="user-list-box" onWheel={scroll} onTouchMove={scroll}>
        {userList}
      </div>
    </div>
  );
}

export default UserList;
