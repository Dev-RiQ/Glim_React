import React, { useEffect, useState } from 'react';
import '../style/boardIcon.css';
import IconButton from '../../../components/IconButton';
import { faHeart, faComment, faShareNodes, faBookmark } from "@fortawesome/free-solid-svg-icons";
import ShowComment from '../hook/ShowComment';

function BoardMiddle(props) {

  function boardSave(e) {
    console.log('save')
  }

  return (
    <div className="board-icon-box">
      <div className="icon-left" >
        <div onClick={props.boardLike}>
          <IconButton icon={faHeart} />
          <p className="board-middle-count">123</p>
        </div>
        <div onClick={e => props.boardComment(e)}>
          <IconButton icon={faComment} />
          <p className="board-middle-count">123</p>
        </div>
      </div>
      <div className="icon-right" onClick={e => boardSave(e)}>
        <IconButton icon={faBookmark} />
      </div>
      <div className={props.commentView}>
        {props.comments}
      </div>
    </div >
  );
}

export default BoardMiddle;
