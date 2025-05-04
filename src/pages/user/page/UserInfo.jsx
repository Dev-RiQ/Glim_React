import React, { useEffect, useState } from 'react';
import '../style/userInfo.css';
import ShowToast from '../../main/hook/ShowToast';
import IconButton from '../../../components/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import apiFile from '../../../utils/apiFile';
import api from '../../../utils/api';

function UserInfo() {
  const [nickname, setNickname] = useState(null)
  const [beforeNickname, setBeforeNickname] = useState('asdf')
  const [name, setName] = useState(null)
  const [content, setContent] = useState(null)
  const [img, setImg] = useState(null)
  const [imgPre, setImgPre] = useState(null)
  const [imgPreBefore, setImgPreBefore] = useState(null)
  const [file, setFile] = useState(null)
  const [nicknameOK, setNicknameOK] = useState(true)

  useEffect(() => {
    getUserInfo()
  }, [])

  async function getUserInfo() {
    const res = await api.get('/auth/update')
    if (res) {
      setNickname(res.nickname)
      setBeforeNickname(res.nickname)
      setName(res.name)
      setContent(res.content)
      setImg(res.img)
      setImgPre(res.file)
      setImgPreBefore(res.file)
    }
  }

  function inputNickname(e) {
    if (e.target.value?.length > 16) {
      ShowToast('error', '닉네임은 최대 16자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 16);
      return
    }
    setNickname(e.target.value)
    setNicknameOK(false)
  }

  function inputName(e) {
    if (e.target.value?.length > 20) {
      ShowToast('error', '이름은 최대 20자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 20);
      return
    }
    setName(e.target.value)
  }

  function inputContent(e) {
    if (e.target.value?.length > 225) {
      ShowToast('error', '내용은 최대 225자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 225);
      return
    }
    setContent(e.target.value)
  }

  function inputImg(e) {
    if (e.target.files.length === 0) {
      setImgPre(imgPre)
      setFile(null)
      return
    }
    if (e.target.files[0].type.startsWith('image/')) {
      setImgPre(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
    } else {
      e.target.value = null;
      ShowToast('error', '이미지 파일만 업로드 가능합니다.')
    }
  }


  async function nicknameValid(e) {
    if (nicknameOK) return;
    if (!nickname || nickname.length < 6 || nickname.length > 16) {
      ShowToast('error', '닉네임은 6~16자 사이로 입력해주세요.')
      return
    }
    if (beforeNickname === nickname) {
      setNicknameOK(true)
      return;
    }
    const isValidNickname = await api.post('/auth/check-nickname', { "nickname": nickname })
    if (!isValidNickname) {
      ShowToast('error', '이미 존재하는 닉네임입니다.')
      return
    }

    ShowToast('success', '사용할 수 있는 닉네임입니다.')
    setNicknameOK(true)
  }


  async function updateUser() {
    if (!nicknameOK) {
      ShowToast('error', '닉네임 중복체크가 필요합니다.')
      return
    }
    if (!name || name.length < 2 || name.length > 20) {
      ShowToast('error', '이름은 2~20자 사이로 입력해주세요.')
      return
    }

    let filename = img
    if (file) {
      const sendFiles = {
        files: file,
        fileType: "USER_IMAGE"
      }
      filename = await apiFile.post('/file', sendFiles)
    }
    const body = {
      "nickname": nickname,
      "name": name,
      "content": content,
      "img": filename,
    }
    const res = await api.put('/auth/update', body)
    res && ShowToast('success', '회원정보 수정에 성공하였습니다.')
    res && (window.location.href = "/myPage")
  }


  function inputFile(e) {
    e.currentTarget.nextSibling.click()
  }

  return (
    <div className="join-box">
      <div className='user-img-setting' onClick={e => inputFile(e)}>
        {img ?
          <img className='view-user-img' src={img} alt="logo" width="100px" height="100px" decoding="async" loading="lazy" />
          : (<><IconButton icon={faPlus} /><p>이미지 추가</p></>)}

      </div>
      <input className="join-file-input" type="file" placeholder='img' onChange={e => inputImg(e)} accept="image/*" />
      <div className='valid-check-box'>
        <input type="text" placeholder='nickname' value={nickname} spellCheck="false" onChange={e => inputNickname(e)} />
        <button onClick={e => nicknameValid(e)}>중복체크</button>
      </div>
      <input type="text" placeholder='name' value={name} spellCheck="false" onChange={e => inputName(e)} />
      <textarea placeholder='content' value={content} spellCheck="false" onChange={e => inputContent(e)} />
      <button className='join-submit-btn' onClick={updateUser}>수정완료</button>
    </div>
  );
}

export default UserInfo;
