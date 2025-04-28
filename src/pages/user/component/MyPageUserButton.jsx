import React, { useState } from 'react';
import '../style/myPageUserButton.css';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../components/IconButton';
import test from '../../../assets/test/user3.jpg'
import Recommend from './Recommend';

function MyPageUserButton(props) {
  const isMine = props.isMine;
  const [isFollow, setIsFollow] = useState(props.isFollow);
  const [recommend, setRecommend] = useState([]);

  function followCancel() {
    setIsFollow(!isFollow)
  }

  function followAdd() {
    setIsFollow(!isFollow)
  }

  function changeLogin() {

  }

  function sendChat() {

  }

  function recommendShow() {
    if (recommend.length > 0) {
      setRecommend([])
      return
    }
    let recList = [
      { "userId": 1, "nickname": "junhee", "img": test },
      { "userId": 2, "nickname": "junhee", "img": test },
      { "userId": 3, "nickname": "junhee", "img": test },
      { "userId": 4, "nickname": "junhee", "img": test },
      { "userId": 5, "nickname": "junhee", "img": test },
    ];
    let list = [];
    recList.forEach(element => {
      list = [...list, (
        <Recommend nickname={element.nickname} />
      )]
    })
    setRecommend(list)
  }

  return (
    <>
      <div className="user-button-box">
        {isMine ?
          <button className='user-btn' onClick={() => window.location.href = '/userInfo'}>프로필 편집</button>
          : <>{isFollow ?
            <button className='user-btn' onClick={followCancel}>팔로우 취소</button>
            : <button className='user-btn' onClick={followAdd}>팔로우 하기</button>
          }
          </>
        }
        {
          isMine ?
            <button className='user-btn' onClick={changeLogin}>계정 전환</button>
            : <button className='user-btn' onClick={sendChat}>채팅 보내기</button>
        }
        <div className='user-add-btn' onClick={recommendShow}>
          <IconButton icon={faUserPlus} />
        </div>
      </div >
      <div className='recommend-list-box'>
        {recommend}
      </div>
    </>
  );
}

export default MyPageUserButton;
