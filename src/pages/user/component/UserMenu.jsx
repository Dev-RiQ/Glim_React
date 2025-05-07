import React, { useEffect, useState } from 'react';
import '../style/userMenu.css';
import api from '../../../utils/api';

function UserMenu(props) {
  const [menu, setMenu] = useState(null)
  useEffect(() => {
    let menuList = null
    if (props.isMine) {
      if (props.isMyPage) {
        menuList = (
          <>
            <button className='menu' onClick={showSave}>
              저장한 게시글 보기
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={showStory}>
              스토리 이력 보기
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={() => window.location.href = '/pay'}>
              결제정보
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={logout}>
              로그아웃
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={changePw}>
              비밀번호 변경
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={changePhone}>
              전화번호 변경
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={userExit}>
              회원탈퇴
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={() => props.setMenuModal(false)}>
              취소
            </button>
          </>
        )
      } else if (props.isChat) {
        menuList = (
          <>
            <button className='menu' onClick={chatOutAction}>
              채팅방 나가기
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={() => props.setMenuModal(false)}>
              취소
            </button>
          </>
        )
      } else {
        menuList = (
          <>
            <button className='menu' onClick={deleteAction}>
              삭제하기
            </button>
            <hr className='menu-hr' />
            <button className='menu' onClick={() => props.setMenuModal(false)}>
              취소
            </button>
          </>
        )
      }
    } else {
      menuList = (
        <>
          <button className='menu' onClick={() => window.location.href = `/myPage/${props.userId}`}>
            계정정보
          </button>
          <hr className='menu-hr' />
          <button className='menu' onClick={startChat}>
            채팅하기
          </button>
          <hr className='menu-hr' />
          <button className='menu' onClick={() => props.setMenuModal(false)}>
            취소
          </button>
        </>
      )
    }
    setMenu(menuList)
  }, [])

  async function logout() {
    const log = await api.post('/auth/logout')
    if (log) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
  }

  async function userExit() {
    const exit = await api.delete(`/auth/delete`)
    if (exit) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
  }

  async function startChat() {
    const res = await api.post(`/chat/room/${props.userId}`)
    res && (window.location.href = `/chatRoom/${res.roomId}`)
  }

  async function chatOutAction() {
    const res = await api.put(`/chat/exit/${props.roomId}`)
    res && (window.location.href = '/chat')
  }

  function showSave() {
    window.location.href = '/mySave'
  }

  function showStory() {
    window.location.href = '/myStory'
  }

  function changePw() {
    window.location.href = '/findPw'
  }

  function changePhone() {
    window.location.href = '/changePhone'
  }

  function deleteAction() {
    let res = api.delete(`/${props.type}/${props.id}`)
    res && (window.location.href = '/')
  }

  return (
    <div className="menu-list-box">
      {menu}
    </div>
  );
}

export default UserMenu;
