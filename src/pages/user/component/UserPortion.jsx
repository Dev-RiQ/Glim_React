import React from 'react';
import '../style/userPortion.css';
import UserImage from './UserImage';
import IconButton from '../../../components/IconButton';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

function UserPortion(props) {

  function goMyPage() {
    window.location.href = "/mypage/" + 1;
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
      <div className="user-portion-rigth">
        <IconButton icon={faEllipsis} />
      </div>

    </div>
  );
}

export default UserPortion;
