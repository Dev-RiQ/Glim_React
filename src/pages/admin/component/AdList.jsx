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