import React, { useEffect, useState } from 'react';
import '../style/boardComment.css';
import IconButton from '../../../components/IconButton';
import { faComment, faX } from '@fortawesome/free-solid-svg-icons';
import UserComment from './UserComment';

function BoardComment(props) {

  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    let list = [];
    for (let i = 0; i < 8; i++) {
      list = [...list, (<div className='comment-user-box' key={i}>
        <UserComment />
      </div>)]
    }
    setCommentList(list);
  }, [])

  function exitComment(e) {
    props.setCommentView('comment-box')
  }


  return (
    <div className="board-comment-box">
      <div className='comment-header'>
        <span className='comment-title'>댓글</span>
      </div>
      <div className='comment-close' onClick={e => exitComment(e)} >
        <IconButton icon={faX} />
      </div>
      <div className='comment-list-box'>
        {commentList}
      </div>
      <div className='comment-footer'>
        <input className='comment-input' type="text" placeholder='댓글을 입력하세요.' />
        <div className='comment-enter'>
          <IconButton icon={faComment} />
        </div>
      </div>
    </div >
  );
}

export default BoardComment;
