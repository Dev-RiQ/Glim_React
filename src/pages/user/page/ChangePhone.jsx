import React, { useEffect, useState } from 'react';
import '../style/changePhone.css';
import ShowToast from '../../main/hook/ShowToast';
import api from '../../../utils/api';

function ChangePhone() {
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [codeOK, setCodeOK] = useState(false)

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
    const responseCode = await api.post('/verify/request', { "phone": phone })
    if (responseCode) {
      ShowToast('success', '인증코드가 전송되었습니다.')
    }
  }

  async function codeValid(e) {
    if (codeOK) return;
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
        <input type="text" placeholder='01012341234' spellCheck="false" onChange={e => inputPhone(e)} />
        <button onClick={e => getCode(e)}>인증번호 받기</button>
      </div>
      <div className='valid-check-box'>
        <input type="text" placeholder='인증번호 입력' spellCheck="false" onChange={e => inputCode(e)} />
        <button onClick={e => codeValid(e)}>인증번호 확인</button>
      </div>
      <button className='join-submit-btn' onClick={changePhone}>전화번호 변경</button>
    </div>
  );
}

export default ChangePhone;
