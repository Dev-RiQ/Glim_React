import React, { useState } from 'react';
import '../style/boardIcon.css';
import IconButton from '../../../components/IconButton';
import { faHeart, faComment, faBookmark } from "@fortawesome/free-solid-svg-icons";
import api from '../../../utils/api';

function BoardMiddle(props) {
  const data = props.data
  const [isSave, setIsSave] = useState(data.isSave)

  async function boardSave(e) {
    const res = isSave ? await api.delete(`/boardSave/${data.id}`)
      : await api.post(`/boardSave/${data.id}`)
    if (isSave) {
      api.post('/tags/view', data.tags)
      api.post(`/boardView/${data.id}`)
    }
    res && setIsSave(!isSave)
  }

  return (
    <div className="board-icon-box">
      <div className="icon-left" >
        <div onClick={props.boardLike}>
          {props.isLike ?
            <IconButton icon={faHeart} check="like" />
            : <IconButton icon={faHeart} />
          }
          <p className="board-middle-count">{data.viewLikes ? data.likeCount : '좋아요'}</p>
        </div>
        <div onClick={e => props.boardComment(e)}>
          <IconButton icon={faComment} />
          <p className="board-middle-count">{data.commentable ? data.commentCount : '댓글 중지'}</p>
        </div>
      </div>
      <div className="icon-right" onClick={e => boardSave(e)}>
        {isSave ?
          <IconButton icon={faBookmark} check="true" />
          : <IconButton icon={faBookmark} />
        }
      </div>
      <div className={props.commentView}>
        {props.comments}
      </div>
    </div >
  );
}

export default BoardMiddle;
