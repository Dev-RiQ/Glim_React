import React, { useEffect, useState } from 'react';
import '../style/join.css';
import ShowToast from '../../main/hook/ShowToast';
import logoLight from '../../../assets/images/logo-light-mode.png'
import logoDark from '../../../assets/images/logo-dark-mode.png'
import { useLocation } from 'react-router-dom';
import api from '../../../utils/api';

function SocialJoin() {
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [nicknameOK, setNicknameOK] = useState(false)
  const [codeOK, setCodeOK] = useState(false)
  const location = useLocation()
  const [token, setToken] = useState(location.state.accessToken)
  const [logo, setLogo] = useState(null)
  const [sendOK, setSendOK] = useState(false)
  const [timer, setTimer] = useState('')
  const [showCodeOK, setShowCodeOK] = useState('인증번호 확인')

  const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
  useEffect(() => {
    setLogo(isBrowserDarkMode ? logoDark : logoLight)
  }, [])

  if (!(token.length > 100)) {
    window.location.href = "/login";
    return;
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

  async function nicknameValid(e) {
    if (nicknameOK) return;
    if (!/^[A-Z|a-z|0-9|가-힣]{6,12}$/.test(nickname)) {
      ShowToast('error', '닉네임은 6~12자 사이의 영문, 숫자, 한글만 입력해주세요.')
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
      ShowToast('error', '인증코드는 6자리의 숫자만 입력해주세요.')
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
    if (!nicknameOK) {
      ShowToast('error', '닉네임 중복체크가 필요합니다.')
      return
    }
    if (!codeOK) {
      ShowToast('error', '전화번호 인증이 필요합니다.')
      return
    }

    const body = {
      "nickname": nickname,
      "phone": phone,
      "accessToken": token
    }
    const isJoin = await api.post('/user/social-info', body)

    if (isJoin) {
      localStorage.setItem("accessToken", token);
      ShowToast('success', '소셜 회원가입에 성공하였습니다.')
      window.location.href = "/"
    }
  }

  return (
    <div className="join-box">
      <img className='view-logo' src={logo} alt="logo" width="200px" height="100px" decoding="async" loading="lazy" />
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
      <button className='join-submit-btn' onClick={join}>가입완료</button>
    </div>
  );
}

export default SocialJoin;
