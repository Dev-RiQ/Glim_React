import React from 'react';
import '../style/main.css';
import StoryList from '../../story/component/StoryList';
import BoardList from '../../board/page/BoardList';
import api from '../../../utils/api';
import ShowToast from '../../../utils/ShowToast';

function Main() {
  async function test() {
    const asd = await api.get('/chat/1/10');
    console.log(asd?.data)
  }
  test()

  return (
    <div className="main-box">
      <StoryList />
      <BoardList />
    </div>
  );
}

export default Main;