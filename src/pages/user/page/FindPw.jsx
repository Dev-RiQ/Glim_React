import React, { useEffect, useState } from 'react';
import '../style/findPw.css';
import ShowToast from '../../main/hook/ShowToast';
import api from '../../../utils/api';

function FindPw() {
  const [id, setId] = useState(null)
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [codeOK, setCodeOK] = useState(false)
  const [resetToken, setResetToken] = useState(null)
  const [newPw, setNewPw] = useState(null)
  const [pwCheck, setPwCheck] = useState(null)
  const [sendOK, setSendOK] = useState(false)
  const [timer, setTimer] = useState('')
  const [showCodeOK, setShowCodeOK] = useState('인증번호 확인')

  function inputId(e) {
    if (e.target.value?.length > 16) {
      ShowToast('error', '아이디는 최대 16자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 16);
      return
    }
    setId(e.target.value)
  }

  function inputPhone(e) {
    if (e.target.value?.length > 20) {
      ShowToast('error', '전화번호 형식이 잘못되었습니다.')
      e.target.value = e.target.value.substring(0, 20);
      return
    }
    setPhone(e.target.value)
  }

  function inputNewPw(e) {
    if (e.target.value?.length > 16) {
      ShowToast('error', '비밀번호는 최대 16자입니다.')
      e.target.value = e.target.value.substring(0, 16);
      return
    }
    setNewPw(e.target.value)
  }

  function inputPwCheck(e) {
    if (e.target.value?.length >= newPw.length) {
      if (e.target.value === newPw) {
        ShowToast('success', 'PW가 일치합니다.')
        setPwCheck(e.target.value)
        return
      } else {
        ShowToast('error', 'PW가 일치하지 않습니다.')
      }
    }
    setPwCheck(null)
  }

  function inputCode(e) {
    if (e.target.value?.length > 6) {
      ShowToast('error', '인증코드 6자리를 입력해주세요.')
      e.target.value = e.target.value.substring(0, 6);
      return
    }
    setCode(e.target.value)
  }

  async function getCode(e) {
    if (sendOK) return;
    if (!/^[0-9]{10,11}$/.test(phone)) {
      ShowToast('error', '전화번호는 -을 제외한 숫자만 입력해주세요.')
      return
    }
    const responseCode = await api.post('/verify/request', { "phone": phone })
    if (responseCode) {
      ShowToast('success', '인증코드가 전송되었습니다.')
      setSendOK(true)
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
      ShowToast('error', '인증코드는 6자리의 숫자자만 입력해주세요.')
      return
    }
    const token = await api.post('/auth/find-password', { "username": id, "phone": phone, "code": code })
    if (!token) {
      ShowToast('error', '인증번호가 일치하지 않습니다.')
      return
    }
    ShowToast('success', '전화번호 인증에 성공하였습니다.')
    setCodeOK(true)
    setResetToken(token.resetToken)
  }

  async function sendNewPw() {
    if (!/^[A-Z|a-z|0-9]{6,16}$/.test(id)) {
      ShowToast('error', 'ID는 6~16자 사이의 영문, 숫자만 입력해주세요.')
      return
    }
    if (!codeOK) {
      ShowToast('error', '인증번호 확인이 되지 않습니다.')
      return
    }
    if (!/^[A-Z|a-z|0-9]{8,16}$/.test(newPw)) {
      ShowToast('error', 'PW는 8~16자 사이의 영문, 숫자만 입력해주세요.')
      return
    }
    if (!pwCheck) {
      ShowToast('error', 'PW가 일치하지 않습니다.')
      return
    }
    const body = {
      "resetToken": resetToken,
      "username": id,
      "newPassword": newPw
    }
    const res = await api.post('/auth/reset-password', body)
    res && ShowToast('success', res)
    res && setTimeout(() => {
      window.location.href = '/login'
    }, 500);
  }

  return (
    <div className="join-box">
      <div className='find-title-box'>
        비밀번호 변경
      </div>
      <input type="text" placeholder='ID' spellCheck="false" onChange={e => inputId(e)} />
      <div className='valid-check-box'>
        <input type="text" placeholder='01012341234' spellCheck="false" onChange={e => inputPhone(e)} readOnly={sendOK} />
        <button className={sendOK ? 'true' : ''} onClick={e => getCode(e)}>인증번호 받기</button>
      </div>
      <div className='valid-check-box'>
        <input type="text" placeholder='인증번호 입력' spellCheck="false" onChange={e => inputCode(e)} readOnly={codeOK} />
        <div className='timer'>{timer}</div>
        <button className={codeOK ? 'true' : showCodeOK === '인증번호 만료' ? 'true' : ''} onClick={e => codeValid(e)}>{showCodeOK}</button>
      </div>
      <input type="password" placeholder='새 비밀번호 입력' spellCheck="false" onChange={e => inputNewPw(e)} />
      <input type="password" placeholder='새 비밀번호 확인' spellCheck="false" onChange={e => inputPwCheck(e)} />
      <button className='join-submit-btn' onClick={sendNewPw}>비밀번호 변경</button>
    </div>
  );
}

export default FindPw;
