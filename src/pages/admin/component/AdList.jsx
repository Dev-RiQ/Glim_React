import React, { useEffect, useState, } from 'react';
import '../style/adList.css';
import api from '../../../utils/api';
import Ad from './Ad';

function AdList() {
  const [adList, setAdList] = useState([(<div className='no-list'><p>신청된 광고가 존재하지 않습니다.</p></div>)])

  useEffect(() => {
    getAdList();
  }, [])

  async function getAdList() {
    const res = await api.get('/ad/list')
    res && setAdListBox(res)
    !res && setAdListBox([
      { id: 1, boardId: 1, status: 'PENDING', rejectionReason: '' },
      { id: 2, boardId: 2, status: 'REJECTED', rejectionReason: '맘에안듬' },
      { id: 3, boardId: 3, status: 'PENDING', rejectionReason: '' },
      { id: 4, boardId: 4, status: 'APPROVED', rejectionReason: '' },
      { id: 5, boardId: 5, status: 'REJECTED', rejectionReason: '맘에줜나안듬' },
      { id: 6, boardId: 6, status: 'PENDING', rejectionReason: '' },
      { id: 7, boardId: 7, status: 'APPROVED', rejectionReason: '' },
      { id: 8, boardId: 8, status: 'PENDING', rejectionReason: '' },
    ])
  }


  function setAdListBox(res) {
    let list = []
    res.forEach(ad => {
      list = [...list, <Ad data={ad} />]
    })
    setAdList(list)
  }

  return (
    <div className='ad-list-box'>
      {adList}
    </div>
  );
}

export default AdList;