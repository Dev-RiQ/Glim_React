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



  async function followCancel() {
    const res = await api.delete(`/follow`, { "followingId": props.id })
    res && ShowToast('success', res.message)
    res && setIsFollow(!isFollow)
  }

  async function followAdd() {
    const res = await api.post(`/follow`, { "followingId": props.id })
    res && ShowToast('success', res.message)
    res && setIsFollow(!isFollow)
  }

  async function sendChat() {
    const res = await api.post(`/chat/room/${props.id}`)
    window.location.href = `/chatRoom/${res}`
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
    setRecommend(list)
  }

  return (
    <>
      <div className="user-button-box">
        {isMine ?
          <button className='user-btn' onClick={() => window.location.href = '/userInfo'}>프로필 편집</button>
          : <>{isFollow ?
            <button className='user-btn' onClick={followCancel}>팔로우 취소</button>
            : <button className='user-btn' onClick={followAdd}>팔로우 하기</button>
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
      <div className='recommend-list-box'>
        {recommend}
      </div>

    </>
  );
}

export default MyPageUserButton;
