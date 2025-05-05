import React, { useEffect, useState, } from 'react';
import '../style/alarm.css';
import UserImage from '../../user/component/UserImage';
import IconButton from '../../../components/IconButton';
import { faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';

function Alarm(props) {
  const alarm = props.alarm;
  const [name, setName] = useState('alarm-box');

  useEffect(() => {
    let name = 'alarm-box'
    if (alarm.isRead) {
      name += ' read';
    }
    setName(name);
  }, [])

  async function movePage(e) {
    await api.put(`/sse/${alarm.id}`)
    window.location.href = `${alarm.uri}`
  }

  function deleteAlarm() {
    const res = api.delete(`/sse/${alarm.id}`)
    res && setName('alarm-box none')
  }

  return (
    <div className={name}>
      <div className='alarm-user-img-box'>
        <UserImage link={alarm.userImg} />
      </div>
      <div className='alarm-content-link-box' onClick={e => movePage(e)}>
        <div className='alarm-content-box'>
          <p className='alarm-content-text'>{alarm.message}</p>
          <span className='alarm-content-ago'>{alarm.createdAt}</span>
        </div>
        <div className='alarm-link-img-box'>
          {alarm.linkImg ?
            <img className='link-img' src={alarm.linkImg} alt='test' width="100%" height="100%" decoding="async" loading="lazy" />
            : <></>}
        </div>
      </div>
      <div className='delete-alarm' onClick={deleteAlarm}>
        <IconButton icon={faX} />
      </div>
    </div>
  );
}

export default Alarm;