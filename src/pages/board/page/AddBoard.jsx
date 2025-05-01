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
          <MusicPlay music={element.link} />
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
      return
    }
    if (e.target.files.length > 10) {
      e.target.value = null;
      ShowToast('error', '최대 10장까지만 가능합니다.')
      return
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
      setVideo(<ShortsVideo video={video} pre="true" />)
      setBoardType('shorts')
    }
  }

  function redo() {
    setFiles(null);
    setImages(null);
    setVideo(null);
  }

  async function addBoard() {
    if (!content) {
      ShowToast('error', '내용을 입력해주세요.')
      return
    }

    let filenames = []
    if (boardType === "shorts") {
      if (files) {
        const sendFiles = {
          "files": files,
          "fileType": "VIDEO"
        }
        filenames = await apiFile.post('/file', sendFiles)
      }
    } else {
      if (files) {
        const sendFiles = {
          "files": files,
          "fileType": "IMAGE"
        }
        filenames = await apiFile.post('/file', sendFiles)
      }
    }

    if (filenames.length === 0) {
      ShowToast('error', '파일 업로드 중 에러가 발생했습니다.')
      return
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
    !res && ShowToast('error', '게시글 등록에 실패했습니다.')
    res && ShowToast('success', '게시글 등록에 성공했습니다.')
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
    searchList.forEach(element => {
      tagsShow = [...tagsShow, (
        <div className='show-search-user' onClick={e => plusUser(e, element.id, element.nickname)} >
          <div className='search-user-img-box'>
            <UserImage hasStory={element.isStory} />
          </div>
          <div className='search-user-info-box'>
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
              <div className='sub-info-box'>
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
                  <IconButton icon={faCheckCircle} />
                  <input type="checkbox" />
                </div>
                <div className='option-box' onClick={e => optionComment(e)}>
                  <span>댓글 등록 사용</span>
                  <IconButton icon={faCheckCircle} />
                  <input type="checkbox" />
                </div>
                {boardType !== 'shorts' ?
                  <div className='option-box none' onClick={e => optionAd(e)}>
                    <span>광고로 등록하기기</span>
                    <IconButton icon={faCheckCircle} />
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
        <input className="add-file-input" type="file" multiple onChange={e => inputImg(e)} accept="image/*, video/*" />
      </div>
      <p className="add-board-file">게시물에 업로드할 파일을 선택하세요.</p>
    </div>
  );
}

export default AddBoard;