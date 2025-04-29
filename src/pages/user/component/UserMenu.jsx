import React, { useEffect, useState } from 'react';
import '../style/userMenu.css';
import UserImage from './UserImage';
import IconButton from '../../../components/IconButton';
import { faBackspace, faCancel, faEllipsis, faRedo } from '@fortawesome/free-solid-svg-icons';

function UserMenu(props) {
  const [menu, setMenu] = useState(null)
  useEffect(() => {
    let menuList = null
    if (props.isMine) {
      if (props.isMyPage) {
        menuList = (
          <>
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
              돌아가기
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
              돌아가기
            </button>
          </>
        )
      }
    } else {
      menuList = (
        <>
          <button className='menu' onClick={() => window.location.href = "/myPage" + 1}>
            계정정보
          </button>
          <button className='menu' onClick={startChat}>
            채팅하기
          </button>
          <button className='menu' onClick={() => props.setMenuModal(false)}>
            돌아가기
          </button>
        </>
      )
    }
    setMenu(menuList)
  }, [])

  function logout() {
    console.log('로그아웃')

  }

  function userExit() {
    console.log('회원탈퇴')

  }

  function changePw() {
    window.location.href = '/findPw'
  }

  function changePhone() {
    window.location.href = '/changePhone'
  }

  function deleteAction() {
    //타입별 삭제 로직
    console.log('삭제 준비중!')
  }

  function startChat() {
    //채팅방 여부 확인하고 없으면 생성해서 들어가기
    console.log('채팅 준비중!')
  }

  return (
    <div className="menu-list-box">
      {menu}
    </div>
  );
}

export default UserMenu;
