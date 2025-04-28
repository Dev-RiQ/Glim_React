import React, { useEffect, useState } from 'react';
import '../style/findPw.css';
import ShowToast from '../../main/hook/ShowToast';

function FindPw() {
  const [id, setId] = useState(null)
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [codeOK, setCodeOK] = useState(false)
  const [resetToken, setResetToken] = useState(null)
  const [newPw, setNewPw] = useState(null)

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

  function inputCode(e) {
    if (e.target.value?.length > 6) {
      ShowToast('error', '인증코드 6자리를 입력해주세요.')
      e.target.value = e.target.value.substring(0, 6);
      return
    }
    setCode(e.target.value)
  }

  function sendNewPw() {
    if (!codeOK) {
      ShowToast('error', '인증번호 확인이 되지 않습니다.')
      return
    }
    console.log(newPw)
  }

  function codeValid(e) {
    if (!e) {
      ShowToast('error', '인증번호가 일치하지 않습니다.')
      return
    }
    ShowToast('success', '전화번호 인증에 성공하였습니다.')
    setCodeOK(true)
    setResetToken('')
  }

  return (
    <div className="join-box">
      <div className='find-title-box'>
        비밀번호 변경
      </div>
      <input type="text" placeholder='ID' spellCheck="false" onChange={e => inputId(e)} />
      <input type="text" placeholder='01012341234' spellCheck="false" onChange={e => inputPhone(e)} />
      <div className='valid-check-box'>
        <input type="text" placeholder='인증번호 입력' spellCheck="false" onChange={e => inputCode(e)} />
        <button onClick={e => codeValid(e)}>인증번호 확인</button>
      </div>
      <input type="password" placeholder='새 비밀번호 입력' spellCheck="false" onChange={e => inputNewPw(e)} />
      <button className='join-submit-btn' onClick={sendNewPw}>비밀번호 변경</button>
    </div>
  );
}

export default FindPw;
