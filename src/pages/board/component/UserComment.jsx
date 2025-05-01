import React, { useState } from 'react';
import '../style/userComment.css';
import IconButton from '../../../components/IconButton';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import UserImage from '../../user/component/UserImage';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function UserComment(props) {
  const data = props.data;
  const isComment = props.isComment
  const [isLike, setIsLike] = useState(data.isLike)
  const [show, setShow] = useState('user-comment-box')

  function goMyPage() {
    window.location.href = "/mypage/" + data.user.id;
  }

  async function changeLike() {
    const res = isLike ? await api.delete(`/commentLike/${data}`)
      : await api.post(`/commentLike/${data}`)
    res && setIsLike(!isLike)
  }

  async function deleteComment() {
    const res = await api.delete(`/comment/${data.id}`)
    res && ShowToast('seccess', '댓글이 삭제되었습니다.')
    res && setShow('user-comment-box none')
  }
  return (
    <>
      <div className={show + data.replyCommentId !== 0 ? ' inner' : ''}>
        <div className="user-comment-left">
          <div className="user-img-box">
            <UserImage link={data.user.img} hasStory={data.user.isStory} />
          </div>
          <div className="user-comment-info">
            <p className="user-nickname" onClick={goMyPage}>{data.user.id}</p>
            <p className="comment-content">{data.content}</p>
            {isComment ?
              <p>
                <span>{data.createdAt}</span>
                <span onClick={(e) => props.addReply(e.target.parentNode.parentNode.parentNode.parentNode.nextSibling, data.id, data.nickname)}>답글 달기</span>
                {data.hasReply ?
                  <span onClick={(e) => props.loadReply(e.target.parentNode.parentNode.parentNode.parentNode.nextSibling, data.id)}>답글 더보기</span> // 클릭이벤트 추가 => 인풋이랑 연결결
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
      <div className='reply-box'>
      </div>
    </>
  );
}

export default UserComment;
