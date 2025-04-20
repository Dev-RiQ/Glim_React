import React, { useEffect, useState, } from 'react';
import '../style/boardList.css';
import BoardInfo from './BoardInfo';

function BoardList() {
  const [boards, setBoards] = useState(null);

  useEffect(() => {
    let boardList = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"];
    let boardBoxes = [];
    boardList.forEach(element => {
      boardBoxes = [...boardBoxes, setBoardBox(element)];
    });
    setBoards(boardBoxes)
  }, []);

  function setBoardBox(element) {
    return (
      <div key={element}>
        <BoardInfo link={element} name={element} />
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