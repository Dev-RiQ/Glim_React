import React, { useEffect, useState, } from 'react';
import '../style/bgmList.css';
import api from '../../../utils/api';
import MusicPlay from '../../board/component/MusicPlay';
import IconButton from '../../../components/IconButton';
import { faMusic, faX } from '@fortawesome/free-solid-svg-icons';
import ShowToast from '../../main/hook/ShowToast';

function BgmList() {
  const [bgms, setBgms] = useState([]);

  useEffect(() => {
    getBgms();
  }, [])

  async function getBgms() {
    const res = await api.get('/bgm')
    res && setBgmList(res)
  }

  function setBgmList(res) {
    let list = []
    res.forEach(bgm => {
      list = [...list, getBgmList(bgm)]
    })
    setBgms(list)
  }

  function getBgmList(bgm) {
    return (
      <div className='music-box'>
        <div className='music-info-box'>
          <div>
            <IconButton icon={faMusic} />
          </div>
          <div className='music-info-text'>
            <div>{bgm.title}</div>
            <div>{bgm.artist}</div>
          </div>
        </div>
        <div className='music-adjust-box'>
          <div>
            <MusicPlay music={bgm.fileName} />
          </div>
          <div onClick={(e) => deleteMusic(bgm.id, e)}>
            <IconButton icon={faX} />
          </div>
        </div>
      </div>
    )
  }

  async function deleteMusic(id, e) {
    const res = await api.delete(`/admin/${id}`)
    const target = e.currentTarget.parentNode.parentNode
    res && ShowToast('success', res)
    res && target.classList.add('delete')
  }

  return (
    <>
      {bgms}
    </>
  );
}

export default BgmList;