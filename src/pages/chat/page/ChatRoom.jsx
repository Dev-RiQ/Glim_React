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
    { "msgId": 9, "id": 2, "content": "안녕하세요" }, { "msgId": 10, "id": 1, "content": "네, 반갑습니다" },
    { "msgId": 11, "id": 2, "content": "오늘 날씨가 참 좋죠?" }, { "msgId": 12, "id": 1, "content": "네, 해가 쨍쨍한게 기분도 좋네요." },
    { "msgId": 13, "id": 1, "content": "식사는 하셨나요?" }, { "msgId": 14, "id": 1, "content": "저는 갈비탕 먹었는데데" },
    { "msgId": 15, "id": 2, "content": "저는 아직이요 ㅠ" }, { "msgId": 16, "id": 2, "content": "뭐먹을지 고민중인데 추천좀 해주세요." },
    { "msgId": 17, "id": 1, "content": "점심이니까 가볍게 마라탕 어떠신가요?" }, { "msgId": 18, "id": 2, "content": "예..? 가볍게요?" },
    { "msgId": 19, "id": 1, "content": "마라탕 가볍지 않나요 ㅎ" }, { "msgId": 20, "id": 2, "content": "그건 좀..." },
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
        <input className='msg-input' type="text" spellCheck="false" onKeyUp={e => sendMsgKeyUp(e)} />
        <div className='msg-send' onClick={e => sendMsgClick(e)}>
          <IconButton icon={faLocationArrow} />
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
