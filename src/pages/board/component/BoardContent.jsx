import React from 'react';
import '../style/boardContent.css';

function BoardContent(props) {
  const data = props.data;

  return (
    <div className="board-content" onClick={props.boardComment}>
      <div className="board-content-data">
        <div className='board-content-box'>
          <span className="board-user-name">{data.user.nickname}</span>
          <span className="board-data">{data.content}</span>
        </div>
      </div>
      <div className="board-content-date">
        <span className="board-date">{data.createdAt}</span>
      </div>
    </div>
  );
}

export default BoardContent;
