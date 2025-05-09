import React, { useEffect, useState, } from 'react';
import '../style/boardList.css';
import BoardInfo from '../component/BoardInfo';
import api from '../../../utils/api';

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBoardList();
  }, []);

  async function getBoardList() {
    const res = await api.get('/board' + (offset !== 0 ? `/${offset}` : ''))
    if (offset === 0 && (!res || res.length === 0)) {
      setBoards([(<div className='no-list'><p>업로드된 게시글이 존재하지 않습니다.</p></div>)])
      return
    }

    let boardBoxes = [];
    res?.forEach(element => {
      boardBoxes = [...boardBoxes, setBoardBox(element)];
    });
    res && setBoards([...boards, boardBoxes])
    if (res) {
      let isAd = false;
      res?.forEach(element => {
        if (element.isAd) {
          isAd = true;
        }
      })
      if (!isAd || res?.length === 1) {
        res && setOffset(res[boardBoxes.length - 1].id)
      } else if (isAd) {
        res && setOffset(res[boardBoxes.length - 2].id)
      }
    }
    !res && setOffset(0)
  }

  function setBoardBox(element) {
    return (
      <div key={element?.id}>
        <BoardInfo data={element} />
      </div>
    )
  }

  async function scroll(e) {
    if (offset === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    if (rect.bottom < window.innerHeight + 1000) {
      if (isLoading) return;
      setIsLoading(true)
      await getBoardList()
      setIsLoading(false)
    }
  }

  return (
    <div className="board-list-box" onWheel={scroll} onTouchMove={scroll}>
      {boards}
    </div>
  );
}

export default BoardList;