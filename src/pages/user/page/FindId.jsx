import React, { useState } from 'react';
import '../style/findId.css';
import ShowToast from '../../main/hook/ShowToast';
import api from '../../../utils/api';

function FindId() {
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [codeOK, setCodeOK] = useState(false)
  const [showId, setShowId] = useState(null)
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
    const res = await api.post('/auth/find-username', { "phone": phone, "code": code })
    if (!res) {
      ShowToast('error', '인증번호가 일치하지 않습니다.')
      return
    }
    ShowToast('success', '전화번호 인증에 성공하였습니다.')
    setCodeOK(true)
    const ids =
      <>
        <div className='show-id'>
          ⬇️ 회원님의 아이디 ⬇️
          {res[0] ? <><br />{res[0]}</> : '가입된 아이디가 존재하지 않습니다.'}
          {res[1] ? <><br />{res[1]}</> : <></>}
        </div>
        <button className='join-submit-btn' onClick={() => window.location.href = '/login'}>로그인 하기</button>
        <button className='join-submit-btn' onClick={() => window.location.href = '/findPw'}>비밀번호 찾기</button>
      </>
    setShowId(ids)
  }

  return (
    <div className="join-box">
      <div className='find-title-box'>
        아이디 찾기
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
      {showId}
    </div>
  );
}

export default FindId;
