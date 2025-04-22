import React from 'react';
import '../style/myPageUserButton.css';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../components/IconButton';

function MyPageUserButton(props) {

  return (
    <div className="user-button-box">
      <button className='user-btn'>프로필 편집</button>
      <button className='user-btn'>프로필 공유</button>
      <div className='user-add-btn'>
        <IconButton icon={faUserPlus} />
      </div>
    </div>
  );
}

export default MyPageUserButton;
