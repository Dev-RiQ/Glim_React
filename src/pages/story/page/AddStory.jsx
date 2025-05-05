import React, { useEffect, useState, } from 'react';
import '../style/addStory.css';
import IconButton from '../../../components/IconButton';
import { faAdd, faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import apiFile from '../../../utils/apiFile';
import { render } from '@testing-library/react';
import Toast from '../../../components/Toast';
import Loading from '../../loading/page/Loading';

function AddStory() {
  const [img, setImg] = useState(null)
  const [file, setFile] = useState(null)
  const [isUpLoading, setIsUpLoading] = useState(false)
  const [target, setTarget] = useState(null)

  function uploadFile(e) {
    const target = e.currentTarget.lastChild;
    target.click()
  }

  function inputImg(e) {
    let fileSize = e.target.files[0].size / 1024 / 1024
    if (fileSize > 100) {
      ShowToast('error', `최대 100MB까지 업로드 가능합니다. (현재 파일 크기 : ${fileSize.toFixed(2)} MB`)
      redo();
      return;
    }
    if (e.target.files[0].type.startsWith('image/')) {
      setImg(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
      setTarget(e.target)
    } else {
      e.target.value = null;
      ShowToast('error', '이미지 파일만 업로드 가능합니다.')
    }
  }

  function redo() {
    setFile(null);
    setImg(null);
    target.value = '';
  }

  async function addStory() {
    if (isUpLoading) {
      ShowToast('error', '업로드 중입니다.')
      return;
    }
    setIsUpLoading(true)
    const apiLoading = render(<Loading upload={true} />).container.firstChild;
    const apiErrorToast = render(<Toast type={'success'} msg={'업로드 중입니다.'} />).container.firstChild;
    document.querySelector('section').appendChild(apiLoading);
    document.querySelector('section').appendChild(apiErrorToast);
    let filename;
    if (file) {
      const sendFiles = {
        "files": file,
        "fileType": "IMAGE"
      }
      filename = await apiFile.post('/file', sendFiles)
    }

    if (!filename) {
      document.querySelector('section').appendChild(apiLoading);
      document.querySelector('section').removeChild(apiErrorToast);
      ShowToast('error', '파일 업로드 중 에러가 발생했습니다.')
      setIsUpLoading(false)
      return
    }

    const res = await api.post('/story', { "fileName": filename })
    setIsUpLoading(false)
    document.querySelector('section').appendChild(apiLoading);
    document.querySelector('section').removeChild(apiErrorToast);
    res && ShowToast('success', '스토리 등록이 완료되었습니다.')
    setTimeout(() => {
      window.location.href = '/'
    }, 500);
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