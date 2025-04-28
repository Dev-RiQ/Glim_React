import React, { useEffect, useState, } from 'react';
import '../style/addBoard.css';
import IconButton from '../../../components/IconButton';
import { faAdd, faCheckCircle, faChevronRight, faHashtag, faLocationPin, faMusic, faPause, faPlay, faUserTag, faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import BoardImage from '../component/BoardImage';
import ShortsVideo from '../../shorts/component/ShortsVideo';
import testimg from '../../../assets/test/user1.jpg'
import UserImage from '../../user/component/UserImage';
import testMusic from '../../../assets/test/music (1).mp3'
import MusicPlay from '../component/MusicPlay';

function AddBoard() {
  const [files, setFiles] = useState(null)
  const [images, setImages] = useState(null)
  const [video, setVideo] = useState(null)
  const [imageNames, setImageNames] = useState([])
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
  const [share, setShare] = useState(true)

  useEffect(() => {
    let musicList = [{ "id": 1, "title": "제목1", "artist": "가수1", "link": "음악파일" },
    { "id": 2, "title": "제목2", "artist": "가수2", "link": "음악파일" },
    { "id": 3, "title": "제목3", "artist": "가수3", "link": "음악파일" },
    { "id": 4, "title": "제목4", "artist": "가수4", "link": "음악파일" },
    { "id": 5, "title": "제목5", "artist": "가수5", "link": "음악파일" },
    { "id": 6, "title": "제목6", "artist": "가수6", "link": "음악파일" },
    { "id": 7, "title": "제목7", "artist": "가수7", "link": "음악파일" },
    { "id": 8, "title": "제목8", "artist": "가수8", "link": "음악파일" },
    { "id": 9, "title": "제목9", "artist": "가수9", "link": "음악파일" },
    { "id": 10, "title": "제목10", "artist": "가수10", "link": "음악파일" },
    ]
    let showMusicList = []
    musicList.forEach(element => {
      showMusicList = [...showMusicList, (
        <div className='show-music-list-box'>
          <div className='music-icon-box' onClick={e => plusMusic(element.id)}>
            <IconButton icon={faMusic} />
          </div>
          <div className='music-info-box' onClick={e => plusMusic(element.id)}>
            <div className='music-info-title'>
              {element.title}
            </div>
            <div className='music-info-artist'>
              {element.artist}
            </div>
          </div>
          <MusicPlay music={testMusic} />
        </div>
      )]
    })
    setShowMusic(showMusicList)
  }, [])

  function uploadFile(e) {
    const target = e.currentTarget.lastChild;
    target.click()
  }

  function inputImg(e) {
    if (e.target.files.length === 0) return;
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

  function addBoard() {
    if (!content) {
      ShowToast('error', '내용을 입력해주세요.')
      return
    }
    if (content.length > 255) {
      ShowToast('error', '내용은 255자 이하로 입력해주세요.')
      return
    }

    // 이미지 업로드하고 파일명 받아와서
    // 게시글 등록으로 넘겨주기
    console.log('등록')
    console.log(files)
    console.log(imageNames)
    console.log(boardType)
    console.log(content)
    console.log(location)
    console.log(user)
    console.log(hash)
    console.log(music)
    console.log(like)
    console.log(comment)
    console.log(share)
  }

  function inputContent(e) {
    setContent(e.target.value)
  }

  function addLocation() {
    console.log('위치추가')
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
  function insertUser(e) {
    if (!e.target.value) {
      setShowSearchUsers([])
      return
    }
    const testList = [{ "id": 1, "name": "test1", "img": testimg },
    { "id": 2, "name": "test2", "img": testimg },
    { "id": 3, "name": "test3", "img": testimg },
    { "id": 4, "name": "test4", "img": testimg },
    { "id": 4, "name": e.target.value, "img": testimg },
    ] //=>검색결과
    //search 유저 리스트 담아주기
    // 유저 클릭하면 id 저장하기(plusUser)
    let testShow = []
    testList.forEach(element => {
      console.log("name", element.name)
      testShow = [...testShow, (
        <div className='show-search-user' onClick={e => plusUser(e, element.id, element.name)} >
          <div className='search-user-img-box'>
            <UserImage />
          </div>
          <div>
            @{element.name}
          </div>
        </div>
      )]
    })
    setShowSearchUsers(testShow)
    setTempUser(e.target.value)
  }
  function plusUser(e, id, name) {
    // 인풋 초기화하고 포커싱해주기
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
    console.log('음악추가')
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
  function optionShare(e) {
    e.currentTarget.classList.toggle('none')
    setShare(!share)
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
                  <div className='add-board-sub-info' onClick={addLocation}>
                    <IconButton icon={faLocationPin} />
                    <span>위치 추가</span>
                    <IconButton icon={faChevronRight} />
                  </div>
                  <div className='add-board-sub-info' onClick={addHash}>
                    <IconButton icon={faHashtag} />
                    <span>해시 태그</span>
                    <IconButton icon={faChevronRight} />
                  </div>
                </div>
                <div>
                  <div className='add-board-sub-info' onClick={addUser}>
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