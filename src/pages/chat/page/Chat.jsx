import React, { useEffect, useState } from 'react';
import '../style/chat.css';
import IconButton from '../../../components/IconButton';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import ChatList from '../component/ChatList';

function Chat() {
  const [chatList, setChatList] = useState([])

  useEffect(() => {
    setChatList([...chatList, addChatList(chatList.length)]);
  }, [])

  function addChatList(listSize) {
    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let list = []
    for (let i = 0; i < test.length; i++) {
      list = [...list, <div key={i}><ChatList roomId={test[i]} /></div>];
    }
    setChatList([...chatList, list]);
    return list;
  }

  return (
    <div className="chat-box">
      <div className='chat-title-box'>
        <div className='chat-title'>
          <span>메시지</span>
        </div>
        <div className='add-chat-btn'>
          <IconButton icon={faComments} />
        </div>
      </div>
      <div className='chat-list-box'>
        {chatList}
      </div>
    </div>
  );
}

export default Chat;
