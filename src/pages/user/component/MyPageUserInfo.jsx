import React, { useEffect, useState } from 'react';
import '../style/myPageUserInfo.css';
import UserImage from './UserImage';
import IconButton from '../../../components/IconButton';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import MyPageUserButton from './MyPageUserButton';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import MyPageBoardList from '../../board/component/MyPageBoardList';
import api from '../../../utils/api';

function MyPageUserInfo(props) {
  const isMine = props.isMine;
  const user = props.user;
  const navigate = useNavigate()
  const [menu, setMenu] = useState([])
  const [menuModal, setMenuModal] = useState(false)
  const [loginList, setLoginList] = useState([]);
  const [loginChangeBox, setLoginChangeBox] = useState('login-change-box');

  useEffect(() => {
    setMenu(<UserMenu isMine={isMine} isMyPage={true} userId={user.id} setMenuModal={setMenuModal} />)
  }, [])

  function showUserList(type) {
    navigate('/userList', { state: { "type": type, "userId": user.id } })
  }

  function showMenu() {
    setMenuModal(!menuModal)
  }


  async function changeLogin() {
    const res = await api.get('/auth/accounts')
    let list = []
    res?.forEach(element => {
      list = [...list, (
        <>
          <div className='change-user-box' onClick={() => loginChange(element.userId)}>
            <div className='change-user-img'>
              <UserImage link={element.img} />
            </div>
            <div className='change-user-info'>
              <div className='change-user-username'>
                @{element.nickname}
              </div>
              <div className='change-user-nickname'>
                {element.name}
              </div>
            </div>
          </div>
          <hr className='devide-hr' />
        </>
      )]
    })
    setLoginList(list)
    setLoginChangeBox('login-change-box show')
  }

  async function loginChange(id) {
    const res = await api.post('/auth/accounts/switch', { "switchToUserId": id })
    res && localStorage.setItem('accessToken', res.accessToken)
    res && window.location.reload()
  }

  return (
    <div className="mypage-user-box">
      <div className='mypage-user-portion'>
        <div className="mypage-user-img">
          <UserImage id={user.id} link={user.img} hasStory={user.isStory} />
        </div>
        <div className='my-info'>
          <div className='my-names'>
            <div>
              <span className='my-id'>@{user.nickname}</span>
              <br />
              <span className='my-name'>{user.name}</span>
            </div>
            {isMine ?
              <div className='my-menu' onClick={showMenu}>
                <IconButton icon={faEllipsis} />
              </div>
              : <></>
            }
          </div>
          <div className='my-counts'>
            <div className='my-follower-count'>
              <p className='count'>{user.boardCount}</p>
              <p className='count-title'>게시물</p>
            </div>
            <div className='my-follower-count' onClick={() => { if (user.followers !== 0) showUserList('follower') }}>
              <p className='count'>{user.followers}</p>
              <p className='count-title'>팔로워</p>
            </div>
            <div className='my-following-count' onClick={() => { if (user.followings !== 0) showUserList('following') }}>
              <p className='count'>{user.followings}</p>
              <p className='count-title'>팔로잉</p>
            </div>
          </div>
        </div>
      </div>
      <div className='my-content'>
        <p className='content-line'>{user.content}</p>
      </div>
      <MyPageUserButton id={user.id} isMine={isMine} isFollowing={user.isFollowing} changeLogin={changeLogin} />
      <MyPageBoardList userId={user.id} />
      {menuModal ?
        <>
          <div className='menu-modal'>
          </div>
          <div className='menu-info'>
            {menu}
          </div>
        </>
        : <></>
      }
      <div className={loginChangeBox}>
        <div className='login-change-box-back'></div>
        <div className='login-change'>
          {loginList}
          <div className='exit-btn' onClick={() => setLoginChangeBox('login-change-box')}>돌아가기</div>
        </div>
      </div>
    </div>
  );
}

export default MyPageUserInfo;
