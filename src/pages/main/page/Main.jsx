import React, { useEffect, useState } from 'react';
import StoryList from '../../story/component/StoryList';
import BoardList from '../../board/page/BoardList';

function Main() {

  return (
    <div className="main-box">
      <StoryList />
      <BoardList />
    </div>
  );
}

export default Main;