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
import ShowToast from '../../main/hook/ShowToast';

function ChatRoom() {
  const roomId = useParams().id;
  const [msgList, setMsgList] = useState([]);
  const [socketMsgList, setSocketMsgList] = useState([]);
  const [loginId, setLoginId] = useState(0);
  const [menu, setMenu] = useState([])
  const [menuModal, setMenuModal] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    setMenu(<UserMenu isMine={true} isChat={true} setMenuModal={setMenuModal} roomId={roomId} />)
    getMsgList()
  }, [])

  async function getUserInfo() {
    const res = await api.get(`/chat/users/${roomId}`)
    res && setUser(res)
  }

  async function getMsgList() {
    let res = await api.get('/chat/' + roomId)
    let list = [];
    setLoginId(res?.loginId)
    res?.msgList?.forEach(msg => {
      list = [...list, <div key={msg.msgId}>
        <ChatMsg msgId={msg.msgId} loginId={res.loginId} id={msg.userId} content={msg.content} userImg={user?.img} />
      </div>]
    })
    setMsgList(list);
    scrollBottom()
  }

  function checkMsg(e) {
    if (e.target.value.length > 255) {
      ShowToast('error', '메시지는 최대 255자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 255)
    }
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
    const body = {
      "roomId": roomId,
      "content": target.value,
      "replyMsgId": 0
    }
    const res = api.post('/chat/sendMsg', body)
    res && (target.value = '')
    res && target.focus();
  }

  function appendMsg(msg) {
    setSocketMsgList([...socketMsgList, <div key={msg.msgId}>
      <ChatMsg msgId={msg.msgId} loginId={loginId} id={msg.userId} content={msg.content} userImg={user.img} />
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
              <UserImage link={user.img} />
            </div>
            <div className='other-user-name'>
              <span>{user.nickname}</span>
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
        <input className='msg-input' type="text" spellCheck="false" onKeyUp={sendMsgKeyUp} onChange={checkMsg} />
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
