import React, { useEffect, useState, } from 'react';
import '../style/addBgm.css';
import IconButton from '../../../components/IconButton';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import ShowToast from '../../main/hook/ShowToast';
import MusicPlay from '../../board/component/MusicPlay';
import api from '../../../utils/api';
import apiFile from '../../../utils/apiFile';

function AddBgm(props) {
  const [file, setFile] = useState(null)
  const [pre, setPre] = useState(null)
  const [title, setTitle] = useState(null)
  const [artist, setArtist] = useState(null)


  function uploadFile(e) {
    const target = e.currentTarget.lastChild;
    target.click()
  }

  function inputMusic(e) {
    if (e.target.files.length === 0) {
      setPre(null)
      setFile(null)
      return;
    }
    if (!e.target.files[0].type.startsWith('audio/')) {
      e.target.value = null;
      ShowToast('error', '음악 파일만 업로드 가능합니다.')
      return
    }
    setPre(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  function inputTitle(e) {
    if (e.target.value.length > 16) {
      ShowToast('error', '음원 제목은 최대 16자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 16)
      return
    }
    setTitle(e.target.value)
  }

  function inputArtist(e) {
    if (e.target.value.length > 8) {
      ShowToast('error', '음원 아티스트는 최대 8자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 8)
      return
    }
    setArtist(e.target.value)
  }

  async function submit() {
    if (title.length === 0) {
      ShowToast('error', '음원 제목을 입력해주세요.')
      return
    }
    if (artist.length === 0) {
      ShowToast('error', '음원 아티스트를 입력해주세요.')
      return
    }
    const sendFiles = {
      "files": file,
      "fileType": "AUDIO"
    }
    const filename = await apiFile.post('/file', sendFiles)
    if (!filename) {
      ShowToast('error', '음원 업로드에 실패했습니다.')
      return;
    }

    const body = {
      "title": title,
      "artist": artist,
      "fileName": filename
    }

    const res = await api.post('/admin', body)
    if (res) {
      ShowToast('success', res)
      props.closeModal()
    }
  }

  function cancel() {
    setFile(null)
    setPre(null)
  }

  return (
    <div className='music-upload-box'>
      {pre ?
        <>
          <div className='music-play'>
            <MusicPlay music={pre} />
          </div>
          <input className='input-music-info' type="text" placeholder='제목 입력' onChange={inputTitle} />
          <input className='input-music-info' type="text" placeholder='가수 입력' onChange={inputArtist} />
          <button className='music-upload-btn submit' onClick={submit}>등록</button>
          <button className='music-upload-btn' onClick={cancel}>취소</button>
        </>
        : <>
          <div className="add-file-btn" onClick={e => uploadFile(e)}>
            <IconButton icon={faAdd} />
            <input className='none' type="file" accept='audio/*' onChange={e => inputMusic(e)} />
          </div>
          <p className="add-board-file">업로드할 파일을 선택하세요.</p>
        </>
      }
    </div>
  );
}

export default AddBgm;