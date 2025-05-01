import React, { useEffect, useState, } from 'react';
import '../style/boardList.css';
import BoardInfo from '../component/BoardInfo';
import api from '../../../utils/api';

function BoardList() {
  const [boards, setBoards] = useState(null);
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    getBoardList();
  }, []);

  async function getBoardList() {
    const res = await api.get('/board' + offset !== 0 ? `/${offset}` : '')
    let boardBoxes = [];
    res?.forEach(element => {
      boardBoxes = [...boardBoxes, setBoardBox(element)];
    });
    res && setBoards(boardBoxes)
    res && setOffset(offset + res[boardBoxes.length - 1].id)
  }

  function setBoardBox(element) {
    return (
      <div key={element?.id}>
        <BoardInfo data={element} />
      </div>
    )
  }

  return (
    <div className="board-list-box">
      {boards}
    </div>
  );
}

export default BoardList;