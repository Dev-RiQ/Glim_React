import React, { useEffect, useState } from 'react';
import '../style/myPageUserInfo.css';
import UserImage from './UserImage';
import IconButton from '../../../components/IconButton';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import MyPageUserButton from './MyPageUserButton';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

function MyPageUserInfo(props) {
  const isMine = props.isMine;
  const navigate = useNavigate()
  const [menu, setMenu] = useState([])
  const [menuModal, setMenuModal] = useState(false)

  useEffect(() => {
    setMenu(<UserMenu isMine={true} isMyPage={true} setMenuModal={setMenuModal} />)
  }, [])

  function showUserList(type) {
    navigate('/userList', { state: { "type": type } })
  }

  function showMenu() {
    setMenuModal(!menuModal)
  }

  return (
    <div className="mypage-user-box">
      <div className='mypage-user-portion'>
        <div className="mypage-user-img">
          <UserImage link={props.link} />
        </div>
        <div className='my-info'>
          <div className='my-names'>
            <div>
              <span className='my-id'>@my_nickname_1234</span>
              <br />
              <span className='my-name'>myName</span>
            </div>
            {isMine ?
              <div className='my-menu' onClick={showMenu}>
                <IconButton icon={faEllipsis} />
              </div>
              : <></>
            }
          </div>
          <div className='my-counts'>
            <div className='my-board-count'>
              <p className='count'>13</p>
              <p className='count-title'>게시물</p>
            </div>
            <div className='my-follower-count' onClick={() => showUserList('follower')}>
              <p className='count'>9999</p>
              <p className='count-title'>팔로워</p>
            </div>
            <div className='my-following-count' onClick={() => showUserList('following')}>
              <p className='count'>1</p>
              <p className='count-title'>팔로잉</p>
            </div>
          </div>
        </div>
      </div>
      <div className='my-content'>
        <p className='content-line'>아무나 팔로우 해줘~</p>
        <p className='content-line'>1명만 더하면 1만!!</p>
      </div>
      <MyPageUserButton isMine={isMine} />
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
    </div>
  );
}

export default MyPageUserInfo;
