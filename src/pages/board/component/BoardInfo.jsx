import React from 'react';
import BoardMiddle from './BoardMiddle';
import UserPortion from '../../user/component/UserPortion';
import BoardContent from './BoardContent';
import BoardImage from './BoardImage';

function BoardInfo(props) {

  return (
    <div className="board-box">
      <UserPortion />
      <BoardImage />
      <BoardMiddle />
      <BoardContent />
    </div>
  );
}

export default BoardInfo;
