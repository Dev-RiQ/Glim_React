import React, { useEffect, useState, } from 'react';
import '../style/addBoard.css';
import IconButton from '../../../components/IconButton';
import { faAdd, faCheckCircle, faChevronRight, faHashtag, faLocationPin, faMusic, faUserTag, faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import BoardImage from '../component/BoardImage';

function AddBoard() {
  const [imgs, setImgs] = useState(null)
  const [images, setImages] = useState([])
  const [location, setLocation] = useState([])
  const [user, setUser] = useState([])
  const [hash, setHash] = useState([])
  const [music, setMusic] = useState([])
  const [like, setLike] = useState([])
  const [comment, setComment] = useState([])
  const [share, setShare] = useState([])

  function uploadFile(e) {
    const target = e.currentTarget.lastChild;
    target.click()
  }

  function inputImg(e) {
    if (e.target.files.length > 10) {
      e.target.value = null;
      ShowToast('error', '최대 10장까지만 가능합니다.')
    }
    let list = [];
    Array.from(e.target.files).forEach(element => {
      if (!element.type.startsWith('image/')) {
        e.target.value = null;
        setImgs(null)
        setImages(null)
        ShowToast('error', '이미지 파일만 업로드 가능합니다.')
        return
      }
      list = [...list, URL.createObjectURL(element)]
    })
    setImgs(Array.from(e.target.files))
    setImages(<BoardImage imgs={list} />)
  }

  function redo() {
    setImgs(null);
    setImages(null);
  }

  function addBoard() {
    console.log('등록')
  }

  function inputContent(e) {
    console.log(e.target.value)
  }

  function addLocation() {
    console.log('위치추가')
  }
  function addUser() {
    console.log('사람추가')

  }
  function addHash() {
    console.log('해시추가')

  }
  function addMusic() {
    console.log('음악추가')

  }

  function optionLike(e) {
    e.currentTarget.classList.toggle('none')

  }
  function optionComment(e) {
    e.currentTarget.classList.toggle('none')

  }
  function optionShare(e) {
    e.currentTarget.classList.toggle('none')

  }


  return (
    <div className="add-board-box">
      {imgs ?
        <div className='preview-board'>
          <div className='redo-img' onClick={redo}>
            <IconButton icon={faX} />
          </div>
          <div className='submit-story-add' onClick={addBoard}>
            <button>등록</button>
          </div>
          {images}
          <div>
            <textarea className='add-board-content' placeholder='내용 입력' onChange={e => inputContent(e)} />
            <div className='sub-info-box'>
              <div>
                <div className='add-board-sub-info' onClick={addLocation}>
                  <IconButton icon={faLocationPin} />
                  <span>위치 추가</span>
                  <IconButton icon={faChevronRight} />
                </div>
                <div className='add-board-sub-info' onClick={addUser}>
                  <IconButton icon={faHashtag} />
                  <span>해시 태그</span>
                  <IconButton icon={faChevronRight} />
                </div>
              </div>
              <div>
                <div className='add-board-sub-info' onClick={addHash}>
                  <IconButton icon={faUserTag} />
                  <span>사람 태그</span>
                  <IconButton icon={faChevronRight} />
                </div>
                <div className='add-board-sub-info' onClick={addMusic}>
                  <IconButton icon={faMusic} />
                  <span>음악 추가</span>
                  <IconButton icon={faChevronRight} />
                </div>
              </div>
            </div>
            <div className='add-board-option' >
              <div className='option-box' onClick={e => optionLike(e)}>
                <span>좋아요 수 보기</span>
                <IconButton icon={faCheckCircle} />
                <input type="checkbox" />
              </div>
              <div className='option-box' onClick={e => optionComment(e)}>
                <span>댓글 등록 사용</span>
                <IconButton icon={faCheckCircle} />
                <input type="checkbox" />
              </div>
              <div className='option-box' onClick={e => optionShare(e)}>
                <span>공유된 수 보기</span>
                <IconButton icon={faCheckCircle} />
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
        : <></>}
      <div className="add-file-btn" onClick={e => uploadFile(e)}>
        <IconButton icon={faAdd} />
        <input className="add-file-input" type="file" multiple onChange={e => inputImg(e)} accept="image/*" />
      </div>
      <p className="add-board-file">게시물에 업로드할 파일을 선택하세요.</p>
    </div>
  );
}

export default AddBoard;