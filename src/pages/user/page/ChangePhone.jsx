import React, { useEffect, useState } from 'react';
import '../style/changePhone.css';
import ShowToast from '../../main/hook/ShowToast';
import api from '../../../utils/api';

function ChangePhone() {
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [codeOK, setCodeOK] = useState(false)
  const [sendOK, setSendOK] = useState(false)
  const [timer, setTimer] = useState('')
  const [showCodeOK, setShowCodeOK] = useState('인증번호 확인')

  function inputPhone(e) {
    if (e.target.value?.length > 20) {
      ShowToast('error', '전화번호 형식이 잘못되었습니다.')
      e.target.value = e.target.value.substring(0, 20);
      return
    }
    setPhone(e.target.value)
    codeOK(false)
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

  function inputCode(e) {
    if (e.target.value?.length > 6) {
      ShowToast('error', '인증코드 6자리를 입력해주세요.')
      e.target.value = e.target.value.substring(0, 6);
      return
    }
    setCode(e.target.value)
  }

  async function changePhone() {
    if (!codeOK) {
      ShowToast('error', '전화번호 인증을 먼저 진행해주세요.')
      return
    }
    const res = await api.put('/auth/update-phone')
    res && ShowToast('success', '전화번호 변경에 성공하였습니다.')
    res && setTimeout(() => {
      window.location.href = '/myPage'
    }, 500);
  }

  return (
    <div className="join-box">
      <div className='find-title-box'>
        전화번호 변경
      </div>
      <div className='valid-check-box'>
        <input type="text" placeholder='01012341234' spellCheck="false" onChange={e => inputPhone(e)} readOnly={sendOK} />
        <button className={sendOK ? 'true' : ''} onClick={e => getCode(e)}>인증번호 받기</button>
      </div>
      <div className='valid-check-box'>
        <input type="text" placeholder='인증번호 입력' spellCheck="false" onChange={e => inputCode(e)} readOnly={codeOK} />
        <div className='timer'>{timer}</div>
        <button className={codeOK ? 'true' : showCodeOK === '인증번호 만료' ? 'true' : ''} onClick={e => codeValid(e)}>{showCodeOK}</button>
      </div>
      <button className='join-submit-btn' onClick={changePhone}>전화번호 변경</button>
    </div>
  );
}

export default ChangePhone;
