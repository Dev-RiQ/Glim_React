import React, { useEffect, useState, } from 'react';
import '../style/alarmList.css';
import IconButton from '../../../components/IconButton';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Alarm from '../component/Alarm';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import sseEvent from '../../../utils/sse';

function AlarmList() {
  const [isLoading, setIsLoading] = useState(true)
  const [alarms, setAlarms] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    getAlarms()
  }, [])

  useEffect(() => {
    if (isLoading) {
      getSseAlarms()
    }
  }, [alarms])

  async function getAlarms() {
    const res = await api.get('/sse/list' + (offset !== 0 ? `/${offset}` : ''));
    res && setAlarm(res)
    !res && setAlarms([(<div className='no-alarm'><p>도착한 알림이 존재하지 않습니다.</p></div>)])
  }

  function setAlarm(res) {
    let list = [];
    res?.forEach(alarm => {
      list = [...list, (
        <div key={alarm.id}>
          <Alarm alarm={alarm} />
        </div>
      )]
    })
    setAlarms([...alarms, list])
  }

  async function getSseAlarms() {
    const res = await sseEvent('/sse')
    res.addEventListener('notification', async (e) => {
      const data = JSON.parse(e.data)
      let list = [];
      data?.forEach(alarm => {
        list = [(
          <div key={alarm.id}>
            <Alarm alarm={alarm} />
          </div>
        ), ...list]
      })
      setAlarms([list, ...alarms])
    })
    setIsLoading(false);
  }


  return (
    <div className="alarm-list-box">
      {alarms}
    </div>
  );
}

export default AlarmList;