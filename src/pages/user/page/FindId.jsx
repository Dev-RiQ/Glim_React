import React, { useState } from 'react';
import '../style/findId.css';
import ShowToast from '../../main/hook/ShowToast';

function FindId() {
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [showId, setShowId] = useState(null)


  function inputPhone(e) {
    if (e.target.value?.length > 20) {
      ShowToast('error', '전화번호 형식이 잘못되었습니다.')
      e.target.value = e.target.value.substring(0, 20);
      return
    }
    setPhone(e.target.value)
  }

  function inputCode(e) {
    if (e.target.value?.length > 6) {
      ShowToast('error', '인증코드 6자리를 입력해주세요.')
      e.target.value = e.target.value.substring(0, 6);
      return
    }
    setCode(e.target.value)
  }

  function codeValid(e) {
    if (!e) {
      ShowToast('error', '인증번호가 일치하지 않습니다.')
      setShowId(null)
      return
    }
    ShowToast('success', '전화번호 인증에 성공하였습니다.')
    let hideId = 'dhuo*wqj*'
    setShowId(
      <>
        <div className='show-id'>
          회원님의 아이디 : {hideId}
        </div>
        <button className='join-submit-btn' onClick={() => window.location.href = '/login'}>로그인 하기</button>
        <button className='join-submit-btn' onClick={() => window.location.href = '/findPw'}>비밀번호 찾기</button>
      </>
    )
  }

  return (
    <div className="join-box">
      <div className='find-title-box'>
        아이디 찾기
      </div>
      <input type="text" placeholder='01012341234' spellCheck="false" onChange={e => inputPhone(e)} />
      <div className='valid-check-box'>
        <input type="text" placeholder='인증번호 입력' spellCheck="false" onChange={e => inputCode(e)} />
        <button onClick={e => codeValid(e)}>인증번호 확인</button>
      </div>
      {showId}
    </div>
  );
}

export default FindId;
