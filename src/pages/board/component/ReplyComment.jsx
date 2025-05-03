import React, { useEffect, useState } from 'react';
import '../style/userComment.css';
import IconButton from '../../../components/IconButton';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import UserImage from '../../user/component/UserImage';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function ReplyComment(props) {
  const data = props.data;
  const [isLike, setIsLike] = useState(data.isLike)
  const [show, setShow] = useState('user-comment-box')
  const [reply, setReply] = useState([])

  useEffect(() => {
    setReplyBox()
  }, [isLike, show])

  function goMyPage() {
    window.location.href = "/mypage/" + data.user.id;
  }

  async function changeLike() {
    const res = isLike ? await api.delete(`/commentLike/${data.id}`)
      : await api.post(`/commentLike/${data.id}`)
    res && (data.likes = parseInt(data.likes) + (isLike ? -1 : 1));
    res && setIsLike(!isLike)
  }

  async function deleteComment() {
    const res = await api.delete(`/comment/${data.id}`)
    res && ShowToast('seccess', '댓글이 삭제되었습니다.')
    res && setShow('user-comment-box none')
  }

  function setReplyBox() {
    setReply([(
      <div className={show + ' inner'}>
        <div className="user-comment-left">
          <div className="user-img-box">
            <UserImage link={data.user.img} hasStory={data.user.isStory} />
          </div>
          <div className="user-comment-info">
            <p className="user-nickname" onClick={goMyPage}>{data.user.nickname}</p>
            <p className="comment-content">{data.content}</p>
            <p className='comment-content-data'>
              <span>{data.createdAt}</span>
              {data.user.isMine ?
                <span onClick={deleteComment}>삭제</span> // 삭제 이벤트 추가
                : <></>
              }
            </p>
          </div>
        </div>
        <div className="user-comment-rigth" onClick={changeLike}>
          <IconButton icon={faHeart} check={isLike ? "like" : ''} />
          <p>{data.likes}</p>
        </div>
      </div>
    )])
  }
  return (
    <>
      {reply}
    </>
  );
}

export default ReplyComment;
