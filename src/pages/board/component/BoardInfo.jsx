import React, { useEffect, useState } from 'react';
import BoardMiddle from './BoardMiddle';
import UserPortion from '../../user/component/UserPortion';
import BoardContent from './BoardContent';
import BoardImage from './BoardImage';
import ShowComment from '../hook/ShowComment';

function BoardInfo(props) {
  const [comments, setComments] = useState(null);
  const [commentView, setCommentView] = useState('comment-box')

  useEffect(() => {
    if (commentView === 'comment-box') {
      setComments(null);
    }
  }, [commentView])

  function boardComment(e) {
    setComments(ShowComment(1, setCommentView))
    setCommentView('comment-box show')
  }
  function boardLike() {
    console.log('like')
  }

  return (
    <div className="board-box">
      <UserPortion />
      <BoardImage boardLike={boardLike} />
      <BoardMiddle boardLike={boardLike} boardComment={boardComment} comments={comments} commentView={commentView} />
      <BoardContent boardComment={boardComment} />
    </div>
  );
}

export default BoardInfo;
