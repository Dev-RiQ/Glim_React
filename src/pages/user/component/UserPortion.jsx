import React, { useEffect, useState } from 'react';
import '../style/userPortion.css';
import UserImage from './UserImage';
import IconButton from '../../../components/IconButton';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import UserMenu from './UserMenu';

function UserPortion(props) {
  const user = props.user
  const [menu, setMenu] = useState([])
  const [menuModal, setMenuModal] = useState(false)

  useEffect(() => {
    setMenu(<UserMenu isMine={user.isMine} setMenuModal={setMenuModal} id={props.id} userId={user.id} type={props.type} />)
  }, [])

  function goMyPage() {
    window.location.href = "/myPage/" + user.id;
  }

  return (
    <div className="user-portion-box">
      <div className="user-portion-left">
        <div className="user-img-box">
          <UserImage id={user.id} link={user.img} hasStory={user.isStory} />
        </div>
        <div className="user-portion-info">
          <div className="user-nickname" onClick={goMyPage}>{user.nickname}</div>
          <div className="sub-title">{props.subTitle ? props.subTitle : user.name ? user.name : props.storyDate ? props.storyDate : ''}</div>
        </div>
      </div>
      <div className="user-portion-rigth" onClick={() => setMenuModal(!menuModal)}>
        <IconButton icon={faEllipsis} />
      </div>
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

export default UserPortion;
