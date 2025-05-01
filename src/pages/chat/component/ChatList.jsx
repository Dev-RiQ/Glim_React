import React, { useEffect, useState } from 'react';
import '../style/chatList.css';
import IconButton from '../../../components/IconButton';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import UserImage from '../../user/component/UserImage';

function ChatList(props) {
  const data = props.data
  const [isRead, setRead] = useState('chat-unread');

  useEffect(() => {
    if (data.isRead) {
      setRead(isRead + ' check');
    }
  }, [])

  function openChat(e) {
    const link = '/chatRoom/' + props.roomId;
    window.location.href = link;
  }

  return (
    <div className="single-chat-box">
      <div className='chat-user-img'>
        <UserImage link={data.img} />
      </div>
      <div className='chat-info' onClick={e => openChat(e)}>
        <div className='chat-user-name'>
          <span className='chat-user-text'>{data.nickname}</span>
        </div>
        <div className='chat-user-msg'>
          <span className='chat-msg-content'>{data.msg}</span>
          <span className='chat-msg-devider'>·</span>
          <span>{data.updatedAt}</span>
        </div>
      </div>
      <div className={isRead}>
        <IconButton icon={faCircle} check="true" />
      </div>
    </div>
  );
}

export default ChatList;
