import React, { useState } from 'react';
import '../style/join.css';
import ShowToast from '../../main/hook/ShowToast';
import IconButton from '../../../components/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/logo-light-mode.png'
import { useLocation, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import apiFile from '../../../utils/apiFile';

function SocialJoin() {
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [nicknameOK, setNicknameOK] = useState(false)
  const [codeOK, setCodeOK] = useState(false)
  const location = useLocation()
  const [token, setToken] = useState(location.state.accessToken)

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
    if (!nickname || nickname.length < 6 || nickname.length > 16) {
      ShowToast('error', '닉네임은 6~16자 사이로 입력해주세요.')
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
      "phone": phone
    }
    const isJoin = await api.post('/auth/social-info', body)

    if (isJoin) {
      localStorage.setItem("accessToken", token);
      ShowToast('success', '회원가입에 성공하였습니다.')
      window.location.href = "/"
    }
  }

  return (
    <div className="join-box">
      <img className='view-logo' src={logo} alt="logo" width="200px" height="100px" decoding="async" loading="lazy" />
      <div className='valid-check-box'>
        <input type="text" placeholder='01012341234' spellCheck="false" onChange={e => inputPhone(e)} />
        <button onClick={e => getCode(e)}>인증번호 받기</button>
      </div>
      <div className='valid-check-box'>
        <input type="text" placeholder='인증번호 입력' spellCheck="false" onChange={e => inputCode(e)} />
        <button onClick={e => codeValid(e)}>인증번호 확인</button>
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
