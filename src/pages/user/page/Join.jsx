import React, { useEffect, useState } from 'react';
import '../style/join.css';
import ShowToast from '../../main/hook/ShowToast';
import IconButton from '../../../components/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import logoLight from '../../../assets/images/logo-light-mode.png'
import logoDark from '../../../assets/images/logo-dark-mode.png'
import apiFile from '../../../utils/apiFile';
import api from '../../../utils/api';

function Join() {
  const [id, setId] = useState(null)
  const [pw, setPw] = useState(null)
  const [pwCheck, setPwCheck] = useState(null)
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [name, setName] = useState(null)
  const [img, setImg] = useState(null)
  const [file, setFile] = useState(null)
  const [idOK, setIdOK] = useState(false)
  const [nicknameOK, setNicknameOK] = useState(false)
  const [codeOK, setCodeOK] = useState(false)
  const [logo, setLogo] = useState(logoLight);
  const [sendOK, setSendOK] = useState(false)
  const [timer, setTimer] = useState('')
  const [showCodeOK, setShowCodeOK] = useState('인증번호 확인')

  const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
  useEffect(() => {
    setLogo(isBrowserDarkMode ? logoDark : logoLight)
  }, [])

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

  function inputPwCheck(e) {
    if (e.target.value?.length >= pw.length) {
      if (e.target.value === pw) {
        ShowToast('success', 'PW가 일치합니다.')
        setPwCheck(e.target.value)
        return
      } else {
        ShowToast('error', 'PW가 일치하지 않습니다.')
      }
    }
    setPwCheck(null)
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
    if (e.target.files.length === 0) {
      setImg(null)
      setFile(null)
      return
    }
    if (e.target.files[0].type.startsWith('image/')) {
      setImg(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
    } else {
      e.target.value = null;
      ShowToast('error', '이미지 파일만 업로드 가능합니다.')
    }
  }

  async function idValid(e) {
    if (idOK) return;
    if (!/^[A-Z|a-z|0-9]{6,16}$/.test(id)) {
      ShowToast('error', 'ID는 6~16자 사이의 영문, 숫자만 입력해주세요.')
      return
    }
    const isValidId = await api.post('/auth/check-username', { "username": id })
    if (!isValidId) {
      ShowToast('error', '이미 존재하는 ID입니다.')
      return
    }

    ShowToast('success', '사용할 수 있는 ID입니다.')
    setIdOK(true)
  }

  async function nicknameValid(e) {
    if (nicknameOK) return;
    if (!/^[A-Z|a-z|0-9|가-힣]{6,12}$/.test(nickname)) {
      ShowToast('error', '닉네임은 6~12자 사이의 한글, 영문, 숫자만 입력해주세요.')
      return
    }
    const isValidNickname = await api.post('/auth/check-nickname', { "nickname": nickname })
    if (!isValidNickname) {
      ShowToast('error', '이미 존재하는 닉네임입니다.')
      return
    }

    ShowToast('success', '사용할 수 있는 닉네임입니다.')
    setNicknameOK(true)
  }

  async function getCode(e) {
    if (sendOK) return;
    if (!/^[0-9]{10,11}$/.test(phone)) {
      ShowToast('error', '전화번호는 -을 제외한 숫자만 입력해주세요.')
      return
    }
    setSendOK(true)
    const responseCode = await api.post('/verify/request', { "phone": phone })
    if (responseCode) {
      console.log(responseCode)
      ShowToast('success', '인증코드가 전송되었습니다.')
      let time = 180
      const interval = setInterval(() => {
        const minute = parseInt(time / 60);
        const second = time - 60 * minute;
        const showTime = `${minute}:${second < 10 ? `0${second}` : second}`
        if (second === -1) {
          clearInterval(interval);
          if (!codeOK) {
            setShowCodeOK('인증번호 만료')
          }
        } else {
          setTimer(showTime)
          time -= 1;
        }
      }, 1000);
    }
  }

  async function codeValid(e) {
    if (codeOK || showCodeOK === '인증번호 만료') return;
    if (!/^[0-9]{6}$/.test(code)) {
      ShowToast('error', '인증번호는 6자리의 숫자로 입력해주세요.')
      return
    }
    const isValidCode = await api.post('/verify/verifyCode', { "phone": phone, "code": code })
    if (!isValidCode) {
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
    if (!/^[A-Z|a-z|0-9]{8,16}$/.test(pw)) {
      ShowToast('error', 'PW는 8~16자 사이의 영문, 숫자만 입력해주세요.')
      return
    }
    if (!pwCheck) {
      ShowToast('error', 'PW가 일치하지 않습니다.')
      return
    }
    if (!/^[A-Z|a-z|가-힣]{2,20}$/.test(name)) {
      ShowToast('error', '이름은 2~20자 사이의 영문, 한글만 입력해주세요.')
      return
    }
    let filename = "userimages/user-default-image"
    if (file) {
      const sendFiles = {
        "files": file,
        "fileType": "USER_IMAGE"
      }
      filename = await apiFile.post('/file', sendFiles)
    }

    const body = {
      "username": id,
      "password": pw,
      "nickname": nickname,
      "img": filename,
      "phone": phone,
      "name": name
    }
    const isJoin = await api.post('/auth/sign-up', body)
    if (isJoin) {
      ShowToast('success', '회원가입에 성공하였습니다.')
      window.location.href = "/login"
    }
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
      <input type="password" placeholder='PW Check' spellCheck="false" onChange={e => inputPwCheck(e)} />
      <div className='valid-check-box'>
        <input type="text" placeholder='01012341234' spellCheck="false" onChange={e => inputPhone(e)} readOnly={sendOK} />
        <button className={sendOK ? 'true' : ''} onClick={e => getCode(e)}>인증번호 받기</button>
      </div>
      <div className='valid-check-box'>
        <input type="text" placeholder='인증번호 입력' spellCheck="false" onChange={e => inputCode(e)} readOnly={codeOK} />
        <div className='timer'>{timer}</div>
        <button className={codeOK ? 'true' : showCodeOK === '인증번호 만료' ? 'true' : ''} onClick={e => codeValid(e)}>{showCodeOK}</button>
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
