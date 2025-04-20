import React from 'react';
import '../style/main.css';
import StoryList from '../../story/component/StoryList';
import BoardList from '../../board/component/BoardList';

function Main() {
  return (
    <div className="main-box">
      <StoryList />
      <BoardList />
    </div>
  );
}

export default Main;
