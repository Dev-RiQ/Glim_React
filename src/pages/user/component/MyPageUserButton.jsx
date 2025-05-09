import React, { useState } from 'react';
import '../style/myPageUserButton.css';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../components/IconButton';
import Recommend from './Recommend';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function MyPageUserButton(props) {
  const isMine = props.isMine;
  const [isFollow, setIsFollow] = useState(props.isFollowing);
  const [recommend, setRecommend] = useState([]);



  async function followCancel(userId) {
    const res = await api.delete(`/follow/${userId}`)
    res && ShowToast('success', res.message)
    res && setIsFollow(!isFollow)
  }

  async function followAdd(userId) {
    const res = await api.post(`/follow`, { "followingId": userId })
    res && ShowToast('success', res.message)
    res && setIsFollow(!isFollow)
  }

  async function sendChat() {
    const res = await api.post(`/chat/room/${props.id}`)
    res && (window.location.href = `/chatRoom/${res.roomId}`)
  }

  async function recommendShow() {
    if (recommend.length > 0) {
      setRecommend([])
      return
    }
    let recList = await api.get('/follow/recommend')
    let list = [];
    recList?.forEach(element => {
      list = [...list, (
        <Recommend user={element} followAdd={followAdd} followCancel={followCancel} />
      )]
    })
    !recList && (list = [<p className='rec-no-list'>팔로우 기반 추천 현황이 없습니다.</p>])
    setRecommend(list)
  }

  const [isClick, setIsClick] = useState(false);
  const [pointer, setPointer] = useState(0);
  const [pointerAfter, setPointerAfter] = useState(0);
  const [isView, setIsView] = useState(false);

  function click(e) {
    setPointer(e.clientX)
    setPointerAfter(e.clientX)
    setIsClick(true)
  }
  function clickOver(e) {
    if (isView) {
      setPointer(0)
      setPointerAfter(0)
      return;
    }
    setIsClick(false)
    setPointer(0)
    setPointerAfter(0)
  }
  function clickDrag(e) {
    if (isView) {
      setPointer(0)
      setPointerAfter(0)
      return;
    }
    if (isClick) {
      e.currentTarget.scrollLeft += pointer - pointerAfter;
      setPointerAfter(e.clientX)
    }
  }
  function storyShow(e) {
    setTimeout(() => {
      if (document.querySelector('.storyLine-box')) {
        setIsView(true)
      }
    }, 100);
  }

  return (
    <>
      <div className="user-button-box">
        {isMine ?
          <button className='user-btn' onClick={() => window.location.href = '/userInfo'}>프로필 편집</button>
          : <>{isFollow ?
            <button className='user-btn cancel' onClick={() => followCancel(props.id)}>팔로우 취소</button>
            : <button className='user-btn submit' onClick={() => followAdd(props.id)}>팔로우 하기</button>
          }
          </>
        }
        {
          isMine ?
            <button className='user-btn' onClick={props.changeLogin}>계정 전환</button>
            : <button className='user-btn' onClick={sendChat}>채팅 보내기</button>
        }
        <div className='user-add-btn' onClick={recommendShow}>
          <IconButton icon={faUserPlus} />
        </div>
      </div >
      <div className='recommend-list-box' onClick={storyShow} onMouseDown={e => click(e)} onMouseMove={e => clickDrag(e)} onMouseUp={e => clickOver(e)}>
        {recommend}
      </div>

    </>
  );
}

export default MyPageUserButton;
