import React from 'react';
import '../style/userComment.css';
import IconButton from '../../../components/IconButton';
import { faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import UserImage from '../../user/component/UserImage';

function UserComment(props) {

  return (
    <div className="user-portion-box">
      <div className="user-portion-left">
        <div className="user-img-box">
          <UserImage />
        </div>
        <div className="user-portion-info">
          <p className="user-nickname">test_nickname</p>
          <p className="comment-content">와 진짜 가고싶다와 진짜 가고싶다와 진짜 가고싶다와 진짜 가고싶다와 진짜 가고싶다와 진짜 가고싶다와 진짜 가고싶다와 진짜 가고싶다와 진짜 가고싶다</p>
        </div>
      </div>
      <div className="user-portion-rigth">
        <IconButton icon={faHeart} />
        <p>1.1만</p>
      </div>
    </div>
  );
}

export default UserComment;
