import React, { useEffect, useState } from 'react';
import '../style/userComment.css';
import IconButton from '../../../components/IconButton';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import UserImage from '../../user/component/UserImage';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import ReplyComment from './ReplyComment';

function UserComment(props) {
  const data = props.data;
  const isComment = props.isComment
  const [isLike, setIsLike] = useState(data.isLike)
  const [show, setShow] = useState('user-comment-box')
  const [comment, setComment] = useState([]);
  const [reply, setReply] = useState([])
  const [replyMore, setReplyMore] = useState('none')
  const [replyOffset, setReplyOffset] = useState(0)

  useEffect(() => {
    showComment()
  }, [reply, isLike, replyMore])

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

  async function loadReply() {
    const res = await api.get(`/comment/reply/${data.id}` + (replyOffset !== 0 ? `/${replyOffset}` : ''))
    data.isReply = false;
    if (!res) {
      ShowToast('error', '더 이상 불러올 답글이 없습니다.')
      setReplyMore('none')
      return
    }
    res && setReplyBox(res);
    if (replyOffset === 0) {
      res && setReplyMore('')
    }
    res && setReplyOffset(res[res.length - 1].id)
  }

  function setReplyBox(data) {
    let list = []
    data.forEach(element => {
      list = [...list, (
        <>
          <ReplyComment data={element} loadReply={loadReply} setReplyOffset={setReplyOffset} />
        </>
      )]
    })
    setReply(list)
  }

  function showComment() {
    setComment(
      <>
        <div className={show + (data.replyCommentId === null && data.replyCommentId !== 0 ? ' inner' : '')}>
          <div className="user-comment-left">
            <div className="user-img-box">
              <UserImage link={data.user.img} hasStory={data.user.isStory} />
            </div>
            <div className="user-comment-info">
              <p className="user-nickname" onClick={goMyPage}>{data.user.nickname}</p>
              <p className="comment-content">{data.content}</p>
              {isComment ?
                <p className='comment-content-data'>
                  <span>{data.createdAt}</span>
                  <span onClick={(e) => props.addReply(e.target.parentNode.parentNode.parentNode.parentNode.nextSibling, data.id, data.nickname, setReply)}>답글 달기</span>
                  {data.isReply ?
                    <span onClick={loadReply}>답글 더보기</span>
                    : <></>
                  }
                  {data.user.isMine ?
                    <span onClick={deleteComment}>삭제</span> // 삭제 이벤트 추가
                    : <></>
                  }
                </p>
                : <></>
              }
            </div>
          </div>
          {isComment ?
            <div className="user-comment-rigth" onClick={changeLike}>
              <IconButton icon={faHeart} check={isLike ? "like" : ''} />
              <p>{data.likes}</p>
            </div>
            : <></>
          }
        </div>
        {reply}
        <p className={replyMore} onClick={() => loadReply()}>답글 더보기</p>
      </>
    )
  }
  return (
    <>
      {comment}
    </>
  );
}

export default UserComment;
