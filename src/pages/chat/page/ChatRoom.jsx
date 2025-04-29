import React, { useEffect, useState } from 'react';
import '../style/chatRoom.css';
import IconButton from '../../../components/IconButton';
import { faChevronLeft, faEllipsis, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import ChatMsg from '../component/ChatMsg';
import UserImage from '../../user/component/UserImage';
import api from '../../../utils/api';
import SockJsClient from "react-stomp";
import UserMenu from '../../user/component/UserMenu';

function ChatRoom() {
  const roomId = useParams().id;
  const [msgList, setMsgList] = useState([]);
  const [socketMsgList, setSocketMsgList] = useState([]);
  const [loginId, setLoginId] = useState(0);
  const [menu, setMenu] = useState([])
  const [menuModal, setMenuModal] = useState(false)

  useEffect(() => {
    setMenu(<UserMenu isMine={true} isChat={true} setMenuModal={setMenuModal} />)
    getMsgList()
  }, [])

  async function getMsgList() {
    let test2 = await api.get('/chat/' + roomId)
    let list = [];
    setLoginId(test2?.loginId)
    test2?.msgList?.forEach(msg => {
      list = [...list, <div key={msg.msgId}>
        <ChatMsg msgId={msg.msgId} loginId={test2.loginId} id={msg.userId} content={msg.content} />
      </div>]
    })
    setMsgList(list);
    scrollBottom()
  }

  function sendMsgKeyUp(e) {
    if (!e.nativeEvent.isComposing && e.code === 'Enter') {
      sendMsg(e.target);
    }
  }
  function sendMsgClick(e) {
    sendMsg(e.currentTarget.parentNode.firstChild);
  }

  function sendMsg(target) {
    if (!target || !target.value) return;
    //메시지 전송
    const body = {
      "roomId": roomId,
      "content": target.value,
      "replyMsgId": 0
    }
    const send = api.post('/chat/sendMsg', body)
    target.value = '';
    target.focus();
  }

  function appendMsg(msg) {
    setSocketMsgList([...socketMsgList, <div key={msg.msgId}>
      <ChatMsg msgId={msg.msgId} loginId={loginId} id={msg.userId} content={msg.content} />
    </div>])
    scrollBottom()
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
      <SockJsClient
        url={"http://localhost:8081/api/v1/chat-socket"}
        topics={["/sub/" + roomId]}
        onConnect={console.log("connected!")}
        onDisconnect={console.log("disconnected!")}
        onMessage={(msg) => appendMsg(msg)}
        debug={false}
      />
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
        <div className='other-user-menu' onClick={() => setMenuModal(!menuModal)}>
          <IconButton icon={faEllipsis} />
        </div>
      </div>
      <div className='chat-list-box'>
        {msgList}
        {socketMsgList}
        <div className='empty-space'></div>
      </div>
      <div className='msg-input-box'>
        <input className='msg-input' type="text" spellCheck="false" onKeyUp={sendMsgKeyUp} />
        <div className='msg-send' onClick={e => sendMsgClick(e)}>
          <IconButton icon={faLocationArrow} />
        </div>
      </div>
      {menuModal ?
        <>
          <div className='menu-modal'>
          </div>
          <div className='menu-info'>
            {menu}
          </div>
        </>
        : <></>
      }
    </div>
  );
}

export default ChatRoom;
