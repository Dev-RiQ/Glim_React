import React, { useEffect, useState, } from 'react';
import '../style/addBoard.css';
import IconButton from '../../../components/IconButton';
import { faAdd, faCheckCircle, faChevronRight, faHashtag, faLocationPin, faMusic, faPause, faPlay, faUserTag, faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import BoardImage from '../component/BoardImage';
import ShortsVideo from '../../shorts/component/ShortsVideo';
import UserImage from '../../user/component/UserImage';
import MusicPlay from '../component/MusicPlay';
import apiFile from '../../../utils/apiFile';
import { render } from '@testing-library/react';
import Toast from '../../../components/Toast';
import Loading from '../../loading/page/Loading';

function AddBoard() {
  const [files, setFiles] = useState(null)
  const [images, setImages] = useState(null)
  const [video, setVideo] = useState(null)
  const [boardType, setBoardType] = useState('basic')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [user, setUser] = useState([])
  const [tempUser, setTempUser] = useState([])
  const [showUsers, setShowUsers] = useState([])
  const [showSearchUsers, setShowSearchUsers] = useState([])
  const [hash, setHash] = useState([])
  const [tempHash, setTempHash] = useState(null)
  const [showHashs, setShowHashs] = useState([])
  const [music, setMusic] = useState(0)
  const [showMusic, setShowMusic] = useState([])
  const [locationModal, setLocationModal] = useState(false)
  const [userModal, setUserModal] = useState(false)
  const [hashModal, setHashModal] = useState(false)
  const [musicModal, setMusicModal] = useState(false)
  const [like, setLike] = useState(true)
  const [comment, setComment] = useState(true)
  const [isAd, setIsAd] = useState(false)
  const [isUpLoading, setIsUpLoading] = useState(false)

  useEffect(() => {
    setMusicList()
  }, [])

  useEffect(() => {
    if (isAd) {
      setBoardType("advertisement")
    }
  }, [isAd])

  async function setMusicList() {
    const musicList = await api.get('/bgm')
    let showMusicList = []
    musicList?.forEach(element => {
      showMusicList = [...showMusicList, (
        <div className='show-music-list-box'>
          <div className='music-icon-box' onClick={() => plusMusic(element.id)}>
            <IconButton icon={faMusic} />
          </div>
          <div className='music-info-box' onClick={() => plusMusic(element.id)}>
            <div className='music-info-title'>
              {element.title}
            </div>
            <div className='music-info-artist'>
              {element.artist}
            </div>
          </div>
          <MusicPlay music={element.fileName} />
        </div>
      )]
    })
    setShowMusic(showMusicList)
  }

  function uploadFile(e) {
    const target = e.currentTarget.lastChild;
    target.click()
  }

  function inputImg(e) {
    if (e.target.files.length === 0) {
      setFiles(null)
      return;
    }
    if (e.target.files[0].type.startsWith('video/') && e.target.files.length !== 1) {
      e.target.value = null;
      ShowToast('error', '숏츠는 1개의 영상만 업로드 가능합니다.')
      redo();
      return
    }
    if (e.target.files.length > 10) {
      e.target.value = null;
      ShowToast('error', '최대 10장까지만 가능합니다.')
      redo();
      return
    }

    let fileSize = 0;
    Array.from(e.target.files).forEach(file => {
      fileSize += (file.size / 1024 / 1024)
    })
    if (fileSize > 100) {
      e.target.value = null;
      ShowToast('error', `총합 100MB까지 업로드 가능합니다. (현재 파일 크기 : ${fileSize.toFixed(2)}MB)`)
      redo();
      return;
    }

    let imageList = [];
    let videoList = [];
    if (e.target.files[0].type.startsWith('video/')) {
      videoList = [URL.createObjectURL(e.target.files[0])]
    } else if (e.target.files[0].type.startsWith('image/')) {
      let hasVideo = false;
      Array.from(e.target.files).forEach(element => {
        if (!element.type.startsWith('image/')) {
          e.target.value = null;
          setFiles(null)
          setImages(null)
          setVideo(null);
          hasVideo = true
        }
        if (!element.type.includes('jpg') && !element.type.includes('png') && !element.type.includes('jpeg')) {
          ShowToast('error', 'jpg, png, jpeg 파일만 업로드 가능합니다.')
          e.target.value = null;
          setFiles(null)
          setImages(null)
          setVideo(null);
          return
        }
        imageList = [...imageList, URL.createObjectURL(element)]
      })
      if (hasVideo) {
        ShowToast('error', '이미지 파일끼리만 업로드 가능합니다. 영상은 하나만 올려주세요.')
        return
      }
    }
    setFiles(Array.from(e.target.files))
    if (imageList.length > 0) {
      setImages(<BoardImage imgs={imageList} />)
      setBoardType('basic')
    } else if (videoList.length > 0) {
      setVideo(<ShortsVideo video={videoList[0]} pre="true" />)
      setBoardType('shorts')
    }
  }

  function redo() {
    setFiles(null);
    setImages(null);
    setVideo(null);
  }

  async function addBoard() {
    if (isUpLoading) {
      ShowToast('error', '업로드 중입니다.')
      return;
    }
    if (!content) {
      ShowToast('error', '내용을 입력해주세요.')
      return
    }
    setIsUpLoading(true)
    const apiLoading = render(<Loading upload={true} />).container.firstChild;
    const apiLoadingToast = render(<Toast type={'success'} msg={'업로드 중입니다.'} />).container.firstChild;
    document.querySelector('section').appendChild(apiLoading);
    document.querySelector('section').appendChild(apiLoadingToast);
    let sendFiles = new FormData()
    if (files) {
      for (const file of files) {
        sendFiles.append('files', file)
      }
      if (boardType === "shorts") {
        sendFiles.append('fileType', "VIDEO")
      } else {
        sendFiles.append('fileType', "IMAGE")
      }
    } else {
      document.querySelector('section').removeChild(apiLoading);
      document.querySelector('section').removeChild(apiLoadingToast);
      ShowToast('error', '파일 업로드 중 에러가 발생했습니다.')
      setIsUpLoading(false)
      return;
    }
    let filenames = await apiFile.post('/file', sendFiles)
    if (!filenames) {
      document.querySelector('section').removeChild(apiLoading);
      document.querySelector('section').removeChild(apiLoadingToast);
      ShowToast('error', '파일 업로드 중 에러가 발생했습니다.')
      setIsUpLoading(false)
      return
    }
    if (typeof filenames === 'string') {
      filenames = [filenames]
    }

    const body = {
      "location": location,
      "img": filenames,
      "content": content,
      "tagUserIds": user,
      "tags": hash,
      "bgmId": music,
      "boardType": boardType,
      "viewLikes": like,
      "commentable": comment
    }

    const res = await api.post('/board', body)
    setIsUpLoading(false)
    document.querySelector('section').removeChild(apiLoading);
    document.querySelector('section').removeChild(apiLoadingToast);
    !res && ShowToast('error', '게시글 등록에 실패했습니다.')
    res && ShowToast('success', '게시글 등록에 성공했습니다.')
    setTimeout(() => {
      res && (window.location.href = '/')
    }, 500);
  }

  function inputContent(e) {
    if (e.target.value.length > 255) {
      ShowToast('error', '내용은 255자 이하로 입력해주세요.')
      return
    }
    setContent(e.target.value)
  }

  function addLocation() {
    setLocationModal(true)
  }
  function submitLocation(e) {
    setLocationModal(false)
  }
  function addUser() {
    setUserModal(true)
  }
  function submitUser(e) {
    setUserModal(false)
  }
  async function insertUser(e) {
    if (!e.target.value) {
      setShowSearchUsers([])
      return
    }
    const searchList = await api.post('/auth/search', { "nickname": e.target.value })
    let tagsShow = []
    searchList?.forEach(element => {
      tagsShow = [...tagsShow, (
        <div className='show-search-user' >
          <div className='search-user-img-box'>
            <UserImage link={element.img} hasStory={element.isStory} id={element.userId} />
          </div>
          <div className='search-user-info-box' onClick={e => plusUser(e, element.userId, element.nickname)}>
            <div>
              @{element.nickname}
            </div>
            <div>
              {element.name}
            </div>
          </div>
        </div>
      )]
    })
    setShowSearchUsers(tagsShow)
    setTempUser(e.target.value)
  }
  function plusUser(e, id, name) {
    e.currentTarget.parentNode.nextSibling.value = ''
    e.currentTarget.parentNode.nextSibling.focus()
    setShowSearchUsers([])
    if (user.length >= 10) {
      ShowToast('error', '사람 태그는 최대 10개까지 입력가능합니다.')
      return
    }
    setUser([...user, id])
    setShowUsers([...showUsers, (
      <div className='show-user'>
        @{name}
      </div>
    )])
    setTempUser('')
  }

  function cleanUser() {
    setTempUser(null)
    setUser([])
    setShowUsers([])
  }

  function addHash() {
    setHashModal(true)
  }
  function submitHash(e) {
    setHashModal(false)
  }
  function insertHash(e) {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substring(0, 10)
      ShowToast('error', '해시태그는 10글자 이하로 입력해주세요')
      return
    }
    setTempHash('#' + e.target.value)
  }
  function plusHash(e) {
    if (!tempHash) return;
    if (e.code === 'Enter') {
      e.target.value = ''
      e.target.focus()
    } else {
      if (e.code) return
      e.currentTarget.previousSibling.value = ''
      e.currentTarget.previousSibling.focus()
    }
    if (hash.length >= 20) {
      ShowToast('error', '해시 태그는 최대 20개까지 입력가능합니다.')
      return
    }
    setHash([...hash, tempHash])
    setShowHashs([...showHashs, (
      <div className='show-hash'>
        {tempHash}
      </div>
    )])
    setTempHash('')
  }

  function cleanHash() {
    setTempHash(null)
    setHash([])
    setShowHashs([])
  }

  function addMusic() {
    setMusicModal(true)
  }
  function plusMusic(id) {
    setMusicModal(false)
    setMusic(id)
  }

  function optionLike(e) {
    e.currentTarget.classList.toggle('none')
    setLike(!like)
  }
  function optionComment(e) {
    e.currentTarget.classList.toggle('none')
    setComment(!comment)
  }
  function optionAd(e) {
    e.currentTarget.classList.toggle('none')
    setIsAd(!isAd)
  }


  return (
    <div className="add-board-box">
      {files ?
        <>
          <div className='preview-board'>
            <div className='redo-img' onClick={redo}>
              <IconButton icon={faX} />
            </div>
            <div className='submit-story-add' onClick={addBoard}>
              <button>등록</button>
            </div>
            <div>
              {images ? images : ''}
              {video ? video : ''}
            </div>
            <div>
              <textarea className='add-board-content' placeholder='내용 입력' spellCheck="false" onChange={e => inputContent(e)} />
              <div className={`sub-info-box ${boardType === 'shorts' ? 'video' : ''}`}>
                <div>
                  <div className='add-board-sub-info' onClick={addUser}>
                    <IconButton icon={faUserTag} />
                    <span>사람 태그</span>
                    <IconButton icon={faChevronRight} />
                  </div>
                  <div className='add-board-sub-info' onClick={addHash}>
                    <IconButton icon={faHashtag} />
                    <span>해시 태그</span>
                    <IconButton icon={faChevronRight} />
                  </div>
                </div>
                {boardType !== 'shorts' ?
                  <div>
                    <div className='add-board-sub-info' onClick={addLocation}>
                      <IconButton icon={faLocationPin} />
                      <span>위치 추가</span>
                      <IconButton icon={faChevronRight} />
                    </div>
                    <div className='add-board-sub-info' onClick={addMusic}>
                      <IconButton icon={faMusic} />
                      <span>음악 추가</span>
                      <IconButton icon={faChevronRight} />
                    </div>
                  </div>
                  : <></>
                }
              </div>
              <div className='add-board-option' >
                <div className='option-box' onClick={e => optionLike(e)}>
                  <span>좋아요 수 보기</span>
                  <div className='check-btn-box'>
                    <IconButton icon={faCheckCircle} />
                  </div>
                  <input type="checkbox" />
                </div>
                <div className='option-box' onClick={e => optionComment(e)}>
                  <span>댓글 등록 사용</span>
                  <div className='check-btn-box'>
                    <IconButton icon={faCheckCircle} />
                  </div>
                  <input type="checkbox" />
                </div>
                {boardType !== 'shorts' ?
                  <div className='option-box none' onClick={e => optionAd(e)}>
                    <span>광고 등록 하기</span>
                    <div className='check-btn-box'>
                      <IconButton icon={faCheckCircle} />
                    </div>
                    <input type="checkbox" />
                  </div>
                  : <></>
                }
              </div>
            </div>
            {locationModal ?
              <>
                <div className="board-option-modal">
                  <div className='redo-img' onClick={() => setLocationModal(false)}>
                    <IconButton icon={faX} />
                  </div>
                  <div className='submit-story-add' onClick={submitLocation}>
                    <button>위치 등록</button>
                  </div>
                  <div className='location-input-box'>
                    <input className='location-input' type="text" value={location} placeholder='위치 입력' spellCheck="false" onChange={e => setLocation(e.target.value)} />
                  </div>
                </div>
              </>
              : <></>}
            {userModal ?
              <>
                <div className="board-option-modal">
                  <div className='redo-img' onClick={() => setUserModal(false)}>
                    <IconButton icon={faX} />
                  </div>
                  <div className='submit-story-add' onClick={submitUser}>
                    <button>사람 태그 등록</button>
                  </div>
                  <div className='location-input-box'>
                    <div className='show-hash-box'>
                      {showUsers}
                    </div>
                    <div className='show-search-user-box'>
                      {showSearchUsers}
                    </div>
                    <input className='location-input' type="text" placeholder='유저 닉네임 입력' spellCheck="false" onChange={e => insertUser(e)} />
                    <div className='hash-btn clean' onClick={cleanUser}>
                      <button>초기화</button>
                    </div>
                  </div>
                </div>
              </>
              : <></>}
            {hashModal ?
              <>
                <div className="board-option-modal">
                  <div className='redo-img' onClick={() => setHashModal(false)}>
                    <IconButton icon={faX} />
                  </div>
                  <div className='submit-story-add' onClick={submitHash}>
                    <button>해시 태그 등록</button>
                  </div>
                  <div className='location-input-box'>
                    <div className='show-hash-box'>
                      {showHashs}
                    </div>
                    <input className='location-input' type="text" placeholder='해시 태그 입력' spellCheck="false" onChange={e => insertHash(e)} onKeyUp={e => plusHash(e)} />
                    <div className='hash-btn' onClick={plusHash}>
                      <button>추가</button>
                    </div>
                    <div className='hash-btn clean' onClick={cleanHash}>
                      <button>초기화</button>
                    </div>
                  </div>
                </div>
              </>
              : <></>}
            {musicModal ?
              <>
                <div className="board-option-modal">
                  <div className='redo-img' onClick={() => setMusicModal(false)}>
                    <IconButton icon={faX} />
                  </div>
                  <div className='music-option-box'>
                    {showMusic}
                  </div>
                </div>
              </>
              : <></>}
          </div>
        </>
        : <></>}
      <div className="add-file-btn" onClick={e => uploadFile(e)}>
        <IconButton icon={faAdd} />
        <input className="add-file-input" type="file" multiple onChange={e => inputImg(e)} accept=".jpg, .png, .jpeg, video/*" />
      </div>
      <p className="add-board-file">게시물에 업로드할 파일을 선택하세요.</p>
    </div>
  );
}

export default AddBoard;