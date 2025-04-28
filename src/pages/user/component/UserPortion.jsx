import React, { useEffect, useState } from 'react';
import '../style/userPortion.css';
import UserImage from './UserImage';
import IconButton from '../../../components/IconButton';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import UserMenu from './UserMenu';

function UserPortion(props) {
  const [menu, setMenu] = useState([])
  const [menuModal, setMenuModal] = useState(false)

  useEffect(() => {
    setMenu(<UserMenu isMine={true} setMenuModal={setMenuModal} />)
  }, [])

  function goMyPage() {
    window.location.href = "/myPage/" + 1;
  }

  return (
    <div className="user-portion-box">
      <div className="user-portion-left">
        <div className="user-img-box">
          <UserImage />
        </div>
        <div className="user-portion-info">
          <p className="user-nickname" onClick={goMyPage}>test_nickname</p>
          <p className="sub-title">test_musicname</p>
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
