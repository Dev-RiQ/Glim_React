import React, { useEffect, useState } from 'react';
import '../style/chat.css';
import IconButton from '../../../components/IconButton';
import { faComments, faX } from '@fortawesome/free-solid-svg-icons';
import ChatList from '../component/ChatList';
import UserImage from '../../user/component/UserImage';
import testimg from '../../../assets/test/user1.jpg'

function Chat() {
  const [chatList, setChatList] = useState([])
  const [user, setUser] = useState([])
  const [tempUser, setTempUser] = useState([])
  const [showUsers, setShowUsers] = useState([])
  const [showSearchUsers, setShowSearchUsers] = useState([])
  const [userModal, setUserModal] = useState(false)

  useEffect(() => {
    setChatList([...chatList, addChatList(chatList.length)]);
  }, [])

  useEffect(() => {
    setShowSearchUsers([])
    setTempUser(null)
  }, [userModal])

  function addChatList(listSize) {
    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let list = []
    for (let i = 0; i < test.length; i++) {
      list = [...list, <div key={i}><ChatList roomId={test[i]} /></div>];
    }
    setChatList([...chatList, list]);
    return list;
  }

  function searchUser(e) {
    if (!e.target.value) {
      setShowSearchUsers([])
      return
    }
    const testList = [{ "id": 1, "name": "test1", "img": testimg },
    { "id": 2, "name": "test2", "img": testimg },
    { "id": 3, "name": "test3", "img": testimg },
    { "id": 4, "name": "test4", "img": testimg },
    { "id": 4, "name": e.target.value, "img": testimg },
    ] //=>검색결과
    //search 유저 리스트 담아주기
    // 유저 클릭하면 id 저장하기(plusUser)
    let testShow = []
    testList.forEach(element => {
      console.log("name", element.name)
      testShow = [...testShow, (
        <div className='show-search-user' onClick={e => goChat(e, element.id)} >
          <div className='search-user-img-box'>
            <UserImage />
          </div>
          <div>
            @{element.name}
          </div>
        </div>
      )]
    })
    setShowSearchUsers(testShow)
    setTempUser(e.target.value)
  }

  function goChat(e, userId) {
    console.log('선택 유저와의 비밀스런 채팅 연결...')
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
