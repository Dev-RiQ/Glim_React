import React from 'react';
import '../style/socialLoginButton.css';
import IconButton from '../../../components/IconButton';

function SocialLoginButton(props) {
  let buttonName = 'button-box ';
  switch (props.name) {
    case "네이버 로그인": buttonName += 'naver'; break;
    case "카카오 로그인": buttonName += 'kakao'; break;
    case "구글 로그인": buttonName += 'google'; break;
    default: break;
  }

  return (
    <div className={buttonName}>
      <div className='login-btn-icon'>
        <IconButton icon={props.icon} />
      </div>
      <p className='btn-text'>{props.name}</p>
    </div>
  );
}

export default SocialLoginButton;
