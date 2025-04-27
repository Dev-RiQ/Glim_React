import React, { useEffect, useState, } from 'react';
import '../style/alarmList.css';
import IconButton from '../../../components/IconButton';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Alarm from '../component/Alarm';

function AlarmList() {
  const [alarms, setAlarms] = useState([])

  useEffect(() => {
    getAlarms()
  }, [])

  function getAlarms() {
    let list = [];
    for (let i = 0; i < 15; i++) {
      list = [...list, (
        <div key={i}>
          <Alarm content={'test_' + i} />
        </div>
      )]
    }
    setAlarms([...alarms, list])
  }

  return (
    <div className="alarm-list-box">
      {alarms}
    </div>
  );
}

export default AlarmList;