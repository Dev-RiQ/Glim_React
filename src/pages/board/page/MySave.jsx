import React, { useEffect, useState } from 'react';
import SearchImg from '../../search/component/SearchImg';
import '../style/myBoard.css'
import api from '../../../utils/api';

function MySave() {
  const [save, setSave] = useState([])
  const [offset, setOffset] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSaveList()
  }, [])


  async function scroll(e) {
    if (offset === 0) return;
    const rect = e.currentTarget.getBoundingClientRect()
    if (rect.bottom < window.innerHeight + 1000) {
      if (isLoaded) return;
      setIsLoaded(true)
      await getSaveList()
      setIsLoaded(false)
    }
  }

  async function getSaveList() {
    const res = await api.get('/board/save' + (offset !== 0 ? `/${offset}` : ''))
    let saveList = []
    res?.forEach(element => {
      saveList = [...saveList, setSaveBox(element)]
    })
    res && setSave(saveList);
    res && setOffset(res[res.length - 1].id);
    !res && offset === 0 && setSave([(<div className='no-list'><p>저장한 게시글이 존재하지 않습니다.</p></div>)])
    !res && setOffset(0)
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
    <div className='my-save-box' onWheel={scroll} onTouchMove={scroll}>
      {save}
    </div>
  );
}

export default MySave;