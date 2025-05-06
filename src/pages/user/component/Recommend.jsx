import React, { useState } from 'react';
import '../style/recommend.css';
import UserImage from './UserImage';

function Recommend(props) {
  const [follow, setFollow] = useState(false)
  const user = props.user;

  function followChange() {
    follow ?
      props.followCancel(user.userId)
      : props.followAdd(user.userId)
    setFollow(!follow)
  }

  return (
    <div className='user-recommend-box'>
      <div className='user-recommend-img'>
        <UserImage link={user.img} hasStory={user.isStory} />
      </div>
      <div className='user-recommend-name'>
        {user.nickname}
      </div>
      <button className={follow ? 'follow-btn check' : 'follow-btn'} onClick={followChange}>
        {follow ?
          '팔로우 취소'
          : '팔로우 하기'
        }
      </button>
    </div>
  );
}

export default Recommend;
