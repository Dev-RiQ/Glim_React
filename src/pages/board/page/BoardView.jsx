import React, { useEffect, useState, } from 'react';
import '../style/boardList.css';
import BoardInfo from '../component/BoardInfo';
import api from '../../../utils/api';

function BoardView(props) {
  const id = props.id;
  const [data, setData] = useState(null)

  useEffect(() => {
    getData();
  })

  async function getData() {
    const res = await api.get(`/board/${id}`)
    res && setData(res)
  }

  return (
    <>
      <BoardInfo data={data} />
    </>
  );
}

export default BoardView;