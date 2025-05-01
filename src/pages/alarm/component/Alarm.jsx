import React, { useEffect, useState, } from 'react';
import '../style/alarm.css';
import UserImage from '../../user/component/UserImage';
import IconButton from '../../../components/IconButton';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Alarm(props) {

  let name = 'alarm-box'
  if (Math.random() > 0.5) {
    name += ' read';
  }

  function movePage(e) {
    console.log(e.target, '으로 이동')

  }

  function deleteAlarm() {
    console.log('알람 삭제')
  }


  return (
    <div className={name}>
      <div className='alarm-user-img-box'>
        <UserImage />
      </div>
      <div className='alarm-content-link-box' onClick={e => movePage(e)}>
        <div className='alarm-content-box'>
          <p className='alarm-content-text'>{props.content}님이 회원님의 게시글에 댓글을 남겼습니다.</p>
          <span className='alarm-content-ago'>1일 전</span>
        </div>
        <div className='alarm-link-img-box'>
          <img className='link-img' src={null} alt='test' width="100%" height="100%" decoding="async" loading="lazy" />
        </div>
      </div>
      <div className='delete-alarm' onClick={deleteAlarm}>
        <IconButton icon={faX} />
      </div>
    </div>
  );
}

export default Alarm;