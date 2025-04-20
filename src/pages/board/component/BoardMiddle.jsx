import React from 'react';
import '../style/boardIcon.css';
import IconButton from '../../../components/IconButton';
import { faHeart, faComment, faShareNodes, faBookmark } from "@fortawesome/free-solid-svg-icons";

function BoardMiddle(props) {

  return (
    <div className="board-icon-box">
      <div className="icon-left">
        <IconButton icon={faHeart} />
        <p className="board-middle-count">123</p>
        <IconButton icon={faComment} />
        <p className="board-middle-count">123</p>
        <IconButton icon={faShareNodes} />
      </div>
      <div className="icon-right">
        <IconButton icon={faBookmark} />
      </div>
    </div>
  );
}

export default BoardMiddle;
