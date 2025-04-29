import React from 'react';
import '../style/boardContent.css';

function BoardContent(props) {

  return (
    <div className="board-content" onClick={props.boardComment}>
      <div className="board-content-data">
        <div className='board-content-box'>
          <span className="board-user-name">이름_123456789</span>
          <span className="board-data">내용123456789내용123456789내용123456789내용123456789내용123456789</span>
        </div>
      </div>
      <div className="board-content-date">
        <span className="board-date">4월 14일</span>
      </div>
    </div>
  );
}

export default BoardContent;
