import React, { useEffect, useState, } from 'react';
import '../style/addStory.css';
import IconButton from '../../../components/IconButton';
import { faAdd, faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import apiFile from '../../../utils/apiFile';

function AddStory() {
  const [img, setImg] = useState(null)
  const [file, setFile] = useState(null)

  function uploadFile(e) {
    const target = e.currentTarget.lastChild;
    target.click()
  }

  function inputImg(e) {
    if (e.target.files[0].type.startsWith('image/')) {
      setImg(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
    } else {
      e.target.value = null;
      ShowToast('error', '이미지 파일만 업로드 가능합니다.')
    }
  }

  function redo() {
    setFile(null);
    setImg(null);
  }

  async function addStory() {
    let filename;
    if (file) {
      const sendFiles = {
        "files": file,
        "fileType": "IMAGE"
      }
      filename = await apiFile.post('/file', sendFiles)
    }

    if (!filename) {
      ShowToast('error', '사진 업로드에 실패했습니다.')
      return
    }
    console.log(filename)

    const res = await api.post('/story', { "fileName": filename })
    res && ShowToast('success', '스토리 등록이 완료되었습니다.')
  }

  return (
    <div className="add-board-box">
      {img ?
        <div className='preview-story'>
          <div className='redo-img' onClick={redo}>
            <IconButton icon={faX} />
          </div>
          <div className='submit-story-add' onClick={addStory}>
            <button>등록</button>
          </div>
          <img className='view-story-img' src={img} alt="logo" width="100%" height="100%" decoding="async" loading="lazy" />
        </div>
        : <></>}
      <div className="add-file-btn" onClick={e => uploadFile(e)}>
        <IconButton icon={faAdd} />
        <input className="add-file-input" type="file" onChange={e => inputImg(e)} accept="image/*" />
      </div>
      <p className="add-board-file">스토리에 추가할 파일을 선택하세요.</p>
    </div>
  );
}

export default AddStory;