import React, { useEffect, useState } from 'react';
import '../style/chatRoom.css';
import IconButton from '../../../components/IconButton';
import { faChevronLeft, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import ChatMsg from '../component/ChatMsg';
import UserImage from '../../user/component/UserImage';

function ChatRoom() {
  const roomId = useParams();
  const [msgList, setMsgList] = useState([]);
  const [socketMsgList, setSocketMsgList] = useState([]);

  useEffect(() => {
    getMsgList()
  }, [])

  function getMsgList() {
    let test = [{ "msgId": 1, "id": 1, "content": "야" }, { "msgId": 2, "id": 1, "content": "야" },
    { "msgId": 3, "id": 1, "content": "야" }, { "msgId": 4, "id": 2, "content": "왜" },
    { "msgId": 5, "id": 2, "content": "왜" }, { "msgId": 6, "id": 2, "content": "왜" },
    { "msgId": 7, "id": 1, "content": "그냥 ㅎ" }, { "msgId": 8, "id": 2, "content": "ㅡㅡ" },
    { "msgId": 9, "id": 2, "content": "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ" }, { "msgId": 10, "id": 1, "content": "ㅗㅗ" },
    { "msgId": 11, "id": 2, "content": "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ" }, { "msgId": 12, "id": 1, "content": "ㅗㅗ" },
    { "msgId": 13, "id": 2, "content": "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ" }, { "msgId": 14, "id": 1, "content": "ㅗㅗ" },
    { "msgId": 15, "id": 2, "content": "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ" }, { "msgId": 16, "id": 1, "content": "ㅗㅗ" },
    { "msgId": 17, "id": 2, "content": "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ" }, { "msgId": 18, "id": 1, "content": "ㅗㅗ" },
    ]
    let list = [];
    test.forEach(msg => {
      list = [...list, <div key={msg.msgId}>
        <ChatMsg msgId={msg.msgId} id={msg.id} content={msg.content} />
      </div>]
    })
    setMsgList(list);
    scrollBottom()
  }

  function sendMsgKeyUp(e) {
    if (e.code === 'Enter')
      sendMsg(e.target);
  }
  function sendMsgClick(e) {
    sendMsg(e.currentTarget.parentNode.firstChild);
  }

  function sendMsg(target) {
    if (!target || !target.value) return;
    //메시지 전송
    console.log(target.value);
    setSocketMsgList([...socketMsgList, <div key={socketMsgList.length + 30}>
      <ChatMsg msgId={socketMsgList.length + 30} id={1} content={target.value} />
    </div>])
    scrollBottom()
    target.value = '';
    target.focus();
  }

  function scrollBottom() {
    setTimeout(() => {
      document.querySelector('section').style.scrollBehavior = 'auto';
      document.querySelector('section').scrollTop = 100000;
      document.querySelector('section').style.scrollBehavior = 'smooth';
    }, 10);
  }

  function moveBack(e) {
    window.history.back();
  }

  return (
    <div className="chat-room-box">
      <div className='chat-title-box'>
        <div className='chat-title'>
          <div className='move-back' onClick={e => moveBack(e)}>
            <IconButton icon={faChevronLeft} />
          </div>
          <div className='other-user-info'>
            <div className='other-user-img'>
              <UserImage />
            </div>
            <div className='other-user-name'>
              <span>test_0123</span>
            </div>
          </div>
        </div>
      </div>
      <div className='chat-list-box'>
        {msgList}
        {socketMsgList}
        <div className='empty-space'></div>
      </div>
      <div className='msg-input-box'>
        <input className='msg-input' type="text" onKeyUp={e => sendMsgKeyUp(e)} />
        <div className='msg-send' onClick={e => sendMsgClick(e)}>
          <IconButton icon={faLocationArrow} />
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
