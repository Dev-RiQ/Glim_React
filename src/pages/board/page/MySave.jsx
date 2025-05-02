import React, { useEffect, useState } from 'react';
import SearchImg from '../../search/component/SearchImg';
import api from '../../../utils/api';

function MySave() {
  const [save, setSave] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    getSaveList()
  }, [])

  async function getSaveList() {
    const res = await api.get('/board/save' + (offset !== 0 ? `/${offset}` : ''))
    let saveList = []
    res?.forEach(element => {
      saveList = [...saveList, setSaveBox(element)]
    })
    res && setSave(saveList);
    res && setOffset(res[res.length - 1] + offset);
  }

  function movePage(id, type) {
    let uri = '/board/'
    if (type && type === 'SHORTS') {
      uri = '/shorts/'
    }
    window.location.href = `${uri}${id}`
  }

  function setSaveBox(element) {
    return (
      <div key={element.id} onClick={() => movePage(element.id, element.type)}>
        <SearchImg link={element.img} type={element.type} />
      </div>
    )
  }
  return (
    <>
      {save}
    </>
  );
}

export default MySave;