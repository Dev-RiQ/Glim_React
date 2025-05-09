import { createRoot } from 'react-dom/client'
import React, { useEffect, useState, } from 'react';
import '../style/addStory.css';
import IconButton from '../../../components/IconButton';
import { faAdd, faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import apiFile from '../../../utils/apiFile';
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
      if (!e.target.files[0].type.includes('jpg') && !e.target.files[0].type.includes('png') && !e.target.files[0].type.includes('jpeg')) {
        ShowToast('error', 'jpg, png, jpeg 파일만 업로드 가능합니다.')
        redo();
        return
      }
      setImg(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
      setTarget(e.target)
    } else {
      ShowToast('error', '이미지 파일만 업로드 가능합니다.')
      redo();
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
    const loadingContainer = document.createElement('div')
    loadingContainer.classList.add('no-box')
    document.querySelector('section').appendChild(loadingContainer);

    const apiLoading = createRoot(loadingContainer)
    apiLoading.render(<Loading upload={true} />)

    const toastContainer = document.createElement('div')
    toastContainer.classList.add('no-box')
    document.querySelector('section').appendChild(toastContainer);

    const apiLoadingToast = createRoot(toastContainer)
    apiLoadingToast.render(<Toast type={'success'} msg={'업로드 중입니다.'} />)
    let filename;
    if (file) {
      const sendFiles = {
        "files": file,
        "fileType": "IMAGE"
      }
      filename = await apiFile.post('/file', sendFiles)
    }

    if (!filename) {
      document.querySelector('section').removeChild(loadingContainer);
      document.querySelector('section').removeChild(toastContainer);
      apiLoading.unmount()
      apiLoadingToast.unmount()
      ShowToast('error', '파일 업로드 중 에러가 발생했습니다.')
      setIsUpLoading(false)
      return
    }

    const res = await api.post('/story', { "fileName": filename })
    setIsUpLoading(false)
    document.querySelector('section').removeChild(loadingContainer);
    document.querySelector('section').removeChild(toastContainer);
    apiLoading.unmount()
    apiLoadingToast.unmount()
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
        <input className="add-file-input" type="file" onChange={e => inputImg(e)} accept=".jpg, .png, .jpeg" />
      </div>
      <p className="add-board-file">스토리에 추가할 파일을 선택하세요.</p>
    </div>
  );
}

export default AddStory;