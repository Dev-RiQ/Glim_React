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
  const userImgDefault = 'https://s3.ap-northeast-2.amazonaws.com/glim-bucket/userimages/user-default-image_128x128.webp'
  const [msgList, setMsgList] = useState([]);
  const [socketMsgList, setSocketMsgList] = useState([]);
  const [loginId, setLoginId] = useState(0);
  const [menu, setMenu] = useState([])
  const [menuModal, setMenuModal] = useState(false)
  const [user, setUser] = useState(null)
  const [offset, setOffset] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollTop, setScrollTop] = useState(true)

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    if (user) {
      setMenu(<UserMenu isMine={true} isChat={true} setMenuModal={setMenuModal} roomId={roomId} />)
      getMsgList()
    }
  }, [user])

  useEffect(() => {
    if (msgList && msgList.length === 1) {
      getRoomSet()
    }
  }, [user, msgList])

  useEffect(() => {
    if (socketMsgList || msgList) {
      api.put(`/chat/user/${roomId}`)
    }
  }, [socketMsgList, msgList])

  async function scroll(e) {
    if (offset === 0) return;
    const rect = e.currentTarget.getBoundingClientRect()
    setScrollTop(rect.bottom !== (window.innerHeight - 50))
    if (rect.top > 0) {
      if (isLoaded) return;
      setIsLoaded(true)
      const height = rect.height;
      const target = e.currentTarget
      await getMsgList()
      setTimeout(() => {
        const targetRect = target.getBoundingClientRect()
        document.querySelector('section').style.scrollBehavior = 'auto';
        document.querySelector('section').scrollTop = targetRect.height - height - 100;
        document.querySelector('section').style.scrollBehavior = 'smooth';
        setIsLoaded(false)
      }, 100);
    }
  }


  async function getUserInfo() {
    const res = await api.get(`/chat/users/${roomId}`)
    res && setUser(res)
    !res && setTimeout(() => {
      (window.history.back())
    }, 500);
  }

  async function getMsgList() {
    let res = await api.get('/chat/' + roomId + (offset !== 0 ? `/${offset}` : ''))
    let list = [];
    setLoginId(res?.loginId)
    res?.msgList?.forEach(msg => {
      list = [...list, <div key={msg.msgId}>
        <ChatMsg msgId={msg.msgId} loginId={res.loginId} id={msg.userId} content={msg.content} userImg={user?.img} createdAt={msg.createdAt} />
      </div>]
    })
    setMsgList([list, ...msgList]);
    res.msgList[0] && setOffset(res.msgList[0].msgId)
    !res && offset === 0 && setMsgList([(<div className='no-list'><p>전송된 채팅이 존재하지 않습니다.</p></div>)])
    !res.msgList[0] && setOffset(0)
  }
  function getRoomSet() {
    setTimeout(() => {
      scrollBottom()
    }, 100);
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
    setSocketMsgList([...socketMsgList, (<div key={msg.msgId}>
      <ChatMsg msgId={msg.msgId} loginId={loginId} id={msg.userId} content={msg.content} userImg={user.img} createdAt={msg.createdAt} />
    </div>)])
    if (!scrollTop) {
      scrollBottom()
    }
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
    <>
      {user && msgList ?
        <div className="chat-room-box">
          <SockJsClient
            // url={"http://localhost:8081/api/v1/chat-socket"}
            // url={"http://192.168.10.89:8081/api/v1/chat-socket"}
            url={"http://192.168.0.2:8081/api/v1/chat-socket"}
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
                  {user ?
                    <UserImage id={user.id} link={user.img} hasStory={user.isStory} />
                    : <UserImage link={userImgDefault} />
                  }
                </div>
                <div className='other-user-name' onClick={() => { if (user) window.location.href = `/myPage/${user.id}` }}>
                  <span>{user ? user.nickname : '알 수 없음'}</span>
                </div>
              </div>
            </div>
            <div className='other-user-menu' onClick={() => setMenuModal(!menuModal)}>
              <IconButton icon={faEllipsis} />
            </div>
          </div>
          <div className='chat-list-box' onWheel={scroll} onTouchMove={scroll}>
            {msgList}
            {socketMsgList}
            <div className='empty-space'></div>
          </div>
          <div className='msg-input-box'>
            {user ?
              <input className='msg-input' type="text" spellCheck="false" onKeyUp={sendMsgKeyUp} onChange={checkMsg} />
              : <input className='msg-input' type="text" spellCheck="false" placeholder='채팅 상대를 확인할 수 없습니다.' readOnly />
            }
            <div className='msg-send' onClick={e => { if (user) sendMsgClick(e) }}>
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
        : <></>
      }
    </>
  );
}

export default ChatRoom;
