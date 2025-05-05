import React, { useEffect, useState } from 'react';
import '../style/chat.css';
import IconButton from '../../../components/IconButton';
import { faComments, faX } from '@fortawesome/free-solid-svg-icons';
import ChatList from '../component/ChatList';
import UserImage from '../../user/component/UserImage';
import api from '../../../utils/api';
import sseEvent from '../../../utils/sse';

function Chat() {
  const [chatList, setChatList] = useState([(<div className='no-list'><p>시작된 채팅이 존재하지 않습니다.</p></div>)])
  const [showSearchUsers, setShowSearchUsers] = useState([])
  const [userModal, setUserModal] = useState(false)

  useEffect(() => {
    getSseChatList()
    // setChatList([...chatList, addChatList()]);
  }, [])

  useEffect(() => {
    setShowSearchUsers([])
  }, [userModal])

  async function getSseChatList() {
    const res = await sseEvent('/chat')
    res.addEventListener('chat', async (e) => {
      const data = JSON.parse(e.data)
      let list = [];
      data?.forEach(room => {
        list = [...list, <><ChatList data={room} /></>];
      })
      res && setChatList([list])
      // setChatList([list, ...chatList])
    })
  }

  // async function addChatList() {
  //   const res = await api.get('/chat')
  //   let list = []
  //   res?.forEach(room => {
  //     list = [...list, <><ChatList data={room} /></>];
  //   })
  //   setChatList([...chatList, list]);
  //   return list;
  // }

  async function searchUser(e) {
    if (!e.target.value) {
      setShowSearchUsers([])
      return
    }
    const searchList = await api.post('/auth/search', { "nickname": e.target.value })
    let list = []
    searchList?.forEach(element => {
      list = [...list, (
        <div className='show-search-user'>
          <div className='search-user-img-box'>
            <UserImage link={element.img} />
          </div>
          <div onClick={e => goChat(e, element.userId)} >
            <div>
              @{element.nickname}
            </div>
            <div>
              {element.name}
            </div>
          </div>
        </div>
      )]
    })
    setShowSearchUsers(list)
  }

  async function goChat(e, userId) {
    const res = await api.post(`/chat/room/${userId}`)
    res && (window.location.href = `/chatRoom/${res.roomId}`)
  }

  return (
    <div className="chat-box">
      <div className='chat-title-box'>
        <div className='chat-title'>
          <span>메시지</span>
        </div>
        <div className='add-chat-btn' onClick={() => setUserModal(!userModal)}>
          {userModal ?
            <IconButton icon={faX} />
            : <IconButton icon={faComments} />
          }
        </div>
      </div>
      <div className='chat-list-box'>
        {chatList}
      </div>
      {userModal ?
        <div className='search-user'>
          <input className='search-input' type="text" placeholder='유저 닉네임 입력' spellCheck="false" onChange={e => searchUser(e)} />
          <div className='show-search-user-box'>
            {showSearchUsers}
          </div>
        </div> : <></>}
    </div>
  );
}

export default Chat;
