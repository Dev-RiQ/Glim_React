import React, { useEffect, useState, } from 'react';
import '../style/boardList.css';
import BoardInfo from '../component/BoardInfo';
import api from '../../../utils/api';
import { useParams } from 'react-router-dom';

function BoardView() {
  const id = useParams().id;
  const [view, setView] = useState(null)

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    const res = await api.get(`/board/show/${id}`)
    res && setView(<BoardInfo data={res} />)
    !res && setTimeout(() => {
      (window.history.back())
    }, 500);
  }

  return (
    <>
      {view}
    </>
  );
}

export default BoardView;