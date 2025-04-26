import React, { useEffect, useState } from 'react';
import '../style/boardIcon.css';
import IconButton from '../../../components/IconButton';
import { faHeart, faComment, faShareNodes, faBookmark } from "@fortawesome/free-solid-svg-icons";
import ShowComment from '../hook/ShowComment';

function BoardMiddle(props) {

  const [comments, setComments] = useState(null);
  const [commentView, setCommentView] = useState('comment-box')

  useEffect(() => {
    if (commentView === 'comment-box') {
      setComments(null);
    }
  }, [commentView])

  function boardLike(e) {
    console.log('like')
  }
  function boardComment(e) {
    setComments(ShowComment(1, setCommentView))
    setCommentView('comment-box show')
  }
  function boardShare(e) {
    console.log('share')
  }
  function boardSave(e) {
    console.log('save')
  }

  return (
    <div className="board-icon-box">
      <div className="icon-left" >
        <div onClick={e => boardLike(e)}>
          <IconButton icon={faHeart} />
          <p className="board-middle-count">123</p>
        </div>
        <div onClick={e => boardComment(e)}>
          <IconButton icon={faComment} />
          <p className="board-middle-count">123</p>
        </div>
        <div onClick={e => boardShare(e)}>
          <IconButton icon={faShareNodes} />
        </div>
      </div>
      <div className="icon-right" onClick={e => boardSave(e)}>
        <IconButton icon={faBookmark} />
      </div>
      <div className={commentView}>
        {comments}
      </div>
    </div >
  );
}

export default BoardMiddle;
