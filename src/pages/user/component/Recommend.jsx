import React, { useState } from 'react';
import '../style/recommend.css';
import UserImage from './UserImage';

function Recommend(props) {
  const [follow, setFollow] = useState(false)

  return (
    <div className='user-recommend-box'>
      <div className='user-recommend-img'>
        <UserImage />
      </div>
      <div className='user-recommend-name'>
        {props.nickname}
      </div>
      <button className={follow ? 'follow-btn check' : 'follow-btn'} onClick={() => setFollow(!follow)}>
        {follow ?
          '팔로우 취소'
          : '팔로우 하기'
        }
      </button>
    </div>
  );
}

export default Recommend;
