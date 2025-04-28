import React, { useState } from 'react';
import '../style/myPageUserButton.css';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../components/IconButton';

function MyPageUserButton(props) {
  const isMine = props.isMine;
  const [isFollow, setIsFollow] = useState(props.isFollow);

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

  return (
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
      <div className='user-add-btn'>
        <IconButton icon={faUserPlus} />
      </div>
    </div >
  );
}

export default MyPageUserButton;
