import React, { useState } from 'react';
import '../style/login.css';
import SocialLoginButton from '../component/SocialLoginButton';
import { faGoogle, faKaggle, faNeos } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import logo from '../../../assets/images/logo-light-mode.png'

function Login() {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  function inputId(e) {
    enterLogin(e)
    setLoginId(e.target.value);
  }

  function inputPw(e) {
    enterLogin(e)
    setLoginPw(e.target.value);
  }

  function enterLogin(e) {
    if (e.code === 'Enter') {
      login();
    }
  }

  async function login() {
    const loginData = {
      username: loginId,
      password: loginPw
    };
    const res = await api.post('/auth/login', loginData)
    res && (window.location.href = '/login/' + res.accessToken);
  }
  function join() {
    window.location.href = '/join';
  }
  function naverLogin() {
    window.location.href = 'http://localhost:8081/api/v1/oauth2/authorization/naver';
  }
  function kakaoLogin() {
    window.location.href = 'http://localhost:8081/api/v1/oauth2/authorization/kakao';
  }
  function googleLogin() {
    window.location.href = 'http://localhost:8081/api/v1/oauth2/authorization/google';
  }

  function findId() {
    window.location.href = '/findId'
  }
  function findPw() {
    window.location.href = '/findPw'
  }

  return (
    <div className="login-box">
      <img className='view-logo' src={logo} alt="logo" width="200px" height="100px" decoding="async" loading="lazy" />
      <div className='input-box'>
        <input className="username" type="text" spellCheck="false" placeholder='ID' onKeyUp={e => inputId(e)} />
        <input className="password" type="password" spellCheck="false" placeholder='PW' onKeyUp={e => inputPw(e)} />
      </div>
      <div className='login-btns-box'>
        <div onClick={login}>
          <SocialLoginButton icon={faArrowRightToBracket} name={"로그인"} />
        </div>
        <div onClick={join}>
          <SocialLoginButton icon={faUserPlus} name={"회원가입"} />
        </div>
        <div onClick={kakaoLogin}>
          <SocialLoginButton icon={faKaggle} name={"카카오 로그인"} />
        </div>
        <div onClick={naverLogin}>
          <SocialLoginButton icon={faNeos} name={"네이버 로그인"} />
        </div>
        <div onClick={googleLogin}>
          <SocialLoginButton icon={faGoogle} name={"구글 로그인"} />
        </div>
        <div className='find-id-pw'>
          <div onClick={findId}>
            <button>아이디 찾기</button>
          </div>
          <div onClick={findPw}>
            <button>비밀번호 찾기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
