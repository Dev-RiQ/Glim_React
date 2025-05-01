import { React, useEffect, useState } from 'react';
import "../style/storyView.css"
import UserPortion from '../../user/component/UserPortion';
import IconButton from '../../../components/IconButton';
import { faHeart, faPaperPlane, faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function StoryView(props) {
  const data = props.data;
  const [isLike, setIsLike] = useState(data.isLike)
  const [content, setContent] = useState('')

  useEffect(() => {
    api.get(`/story/${data.id}`)
  }, [])

  async function storyLike() {
    const res = isLike ? await api.delete(`/storyLike/${data.id}`)
      : await api.post(`/storyLike/${data.id}`)
    res && setIsLike(!isLike)
  }

  function inputContent(e) {
    if (e.target.value.length > 255) {
      ShowToast('error', '메시지는 최대 255자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 255)
      return
    }
    setContent(e.target.value)
  }

  async function sendMsg() {
    if (!content) return;
    const roomId = await api.post(`/chat/room/${data.user.id}`)
    const body = {
      "roomId": roomId,
      "content": content,
      "replyMsgId": 0
    }
    const res = await api.post('/chat/sendMsg', body)
    res && ShowToast('success', '메시지가 전송되었습니다.')
    !res && ShowToast('error', '메시지 전송에 실패하였습니다.')
  }

  return (
    <>
      <img className="story-view-img" width="100%" height="100%" src={data.img} alt="story" />
      <div className="story-header">
        <div className="story-end" onClick={props.endStoryView}>
          <IconButton icon={faX} />
        </div>
        <div className="story-user-protion">
          <UserPortion user={data.user} storyDate={data.createdAt} id={data.id} />
        </div>
      </div>
      <div className="story-footer">
        <div onClick={storyLike}>
          {isLike ?
            <IconButton icon={faHeart} check="like" />
            : <IconButton icon={faHeart} />
          }
        </div>
        <input className="story-reply-msg" type="text" onChange={inputContent} />
        <div onClick={sendMsg}>
          <IconButton icon={faPaperPlane} />
        </div>
      </div>
    </>
  )
};

export default StoryView;
