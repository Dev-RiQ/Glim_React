import React, { useEffect, useState } from 'react';
import '../style/chatList.css';
import IconButton from '../../../components/IconButton';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import UserImage from '../../user/component/UserImage';

function ChatList(props) {
  const [isRead, setRead] = useState('chat-unread');

  useEffect(() => {
    // setRead(isRead + ' check');
  }, [])

  function openChat(e) {
    const link = '/chatRoom/' + props.roomId;
    window.location.href = link;
  }

  return (
    <div className="single-chat-box" onClick={e => openChat(e)}>
      <div className='chat-user-img'>
        <UserImage />
      </div>
      <div className='chat-info'>
        <div className='chat-user-name'>
          <span className='chat-user-text'>test_1234</span>
        </div>
        <div className='chat-user-msg'>
          <span className='chat-msg-content'>mosiggangE님의 릴스를 보냈습니다.</span>
          <span className='chat-msg-devider'>·</span>
          <span>3일 전</span>
        </div>
      </div>
      <div className={isRead}>
        <IconButton icon={faCircle} check="true" />
      </div>
    </div>
  );
}

export default ChatList;
