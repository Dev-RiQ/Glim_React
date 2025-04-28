import React, { useState } from 'react';
import '../style/join.css';
import ShowToast from '../../main/hook/ShowToast';
import IconButton from '../../../components/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo-light-mode.png'
import apiFile from '../../../utils/apiFile';

function Join() {
  const [id, setId] = useState(null)
  const [pw, setPw] = useState(null)
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [name, setName] = useState(null)
  const [img, setImg] = useState(null)
  const [file, setFile] = useState(null)
  const [idOK, setIdOK] = useState(false)
  const [nicknameOK, setNicknameOK] = useState(false)
  const [codeOK, setCodeOK] = useState(false)

  function inputId(e) {
    if (e.target.value?.length > 16) {
      ShowToast('error', 'ID는 최대 16자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 16);
      return
    }
    setId(e.target.value)
    setIdOK(false)
  }

  function inputPw(e) {
    if (e.target.value?.length > 16) {
      ShowToast('error', 'PW는 최대 16자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 16);
      return
    }
    setPw(e.target.value)
  }

  function inputPhone(e) {
    if (e.target.value?.length > 20) {
      ShowToast('error', '전화번호 형식이 잘못되었습니다.')
      e.target.value = e.target.value.substring(0, 20);
      return
    }
    setPhone(e.target.value)
    setCodeOK(false)
  }

  function inputCode(e) {
    if (e.target.value?.length > 6) {
      ShowToast('error', '인증코드 6자리를 입력해주세요.')
      e.target.value = e.target.value.substring(0, 6);
      return
    }
    setCode(e.target.value)
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

  function inputImg(e) {
    if (e.target.files[0].type.startsWith('image/')) {
      setImg(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
    } else {
      e.target.value = null;
      ShowToast('error', '이미지 파일만 업로드 가능합니다.')
    }
  }

  function idValid(e) {
    if (idOK) return;
    if (!id || id.length < 6 || id.length > 16) {
      ShowToast('error', 'ID는 6~16자 사이로 입력해주세요.')
      return
    }
    if (id.length < 6 || id.length > 16) {
      ShowToast('error', '이미 존재하는 ID입니다.')
      return
    }

    ShowToast('success', '사용할 수 있는 ID입니다.')
    setIdOK(true)
  }

  function nicknameValid(e) {
    if (nicknameOK) return;
    if (!nickname || nickname.length < 6 || nickname.length > 16) {
      ShowToast('error', '닉네임은 6~16자 사이로 입력해주세요.')
      return
    }
    if (nickname.length < 6 || nickname.length > 16) {
      ShowToast('error', '이미 존재하는 닉네임입니다.')
      return
    }

    ShowToast('success', '사용할 수 있는 닉네임입니다.')
    setNicknameOK(true)
  }


  function codeValid(e) {
    if (codeOK) return;
    if (id.length < 6 || id.length > 16) {
      ShowToast('error', '인증번호가 일치하지 않습니다.')
      return
    }

    ShowToast('success', '전화번호 인증에 성공하였습니다.')
    setCodeOK(true)
  }

  async function join() {
    if (!idOK) {
      ShowToast('error', 'ID 중복체크가 필요합니다.')
      return
    }
    if (!nicknameOK) {
      ShowToast('error', '닉네임 중복체크가가 필요합니다.')
      return
    }
    if (!codeOK) {
      ShowToast('error', '전화번호 인증이 필요합니다.')
      return
    }
    if (!pw || pw.length < 8 || pw.length > 16) {
      ShowToast('error', 'PW는 8~16자 사이로 입력해주세요.')
      return
    }
    if (!name || name.length < 2 || name.length > 20) {
      ShowToast('error', '이름은 2~20자 사이로 입력해주세요.')
      return
    }

    const sendFiles = {
      files: file,
      fileType: "USER_IMAGE"
    }
    await apiFile.post('/file', sendFiles)
    ShowToast('success', '회원가입에 성공하였습니다.')
    window.location.href = "/login"
  }

  function inputFile(e) {
    e.currentTarget.nextSibling.click()
  }

  return (
    <div className="join-box">
      <img className='view-logo' src={logo} alt="logo" width="200px" height="100px" decoding="async" loading="lazy" />
      <div className='user-img-setting' onClick={e => inputFile(e)}>
        {img ?
          <img className='view-user-img' src={img} alt="logo" width="100px" height="100px" decoding="async" loading="lazy" />
          : (<><IconButton icon={faPlus} /><p>이미지 추가</p></>)}

      </div>
      <input className="join-file-input" type="file" placeholder='img' onChange={e => inputImg(e)} accept="image/*" />
      <div className='valid-check-box'>
        <input type="text" placeholder='ID' spellCheck="false" onChange={e => inputId(e)} />
        <button onClick={e => idValid(e)}>중복체크</button>
      </div>
      <input type="password" placeholder='PW' spellCheck="false" onChange={e => inputPw(e)} />
      <input type="text" placeholder='01012341234' spellCheck="false" onChange={e => inputPhone(e)} />
      <div className='valid-check-box'>
        <input type="text" placeholder='인증번호 입력' spellCheck="false" onChange={e => inputCode(e)} />
        <button onClick={e => codeValid(e)}>인증번호 확인</button>
      </div>
      <div className='valid-check-box'>
        <input type="text" placeholder='nickname' spellCheck="false" onChange={e => inputNickname(e)} />
        <button onClick={e => nicknameValid(e)}>중복체크</button>
      </div>
      <input type="text" placeholder='name' spellCheck="false" onChange={e => inputName(e)} />
      <button className='join-submit-btn' onClick={join}>가입완료</button>
    </div>
  );
}

export default Join;
