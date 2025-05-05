import React, { useEffect, useState } from 'react';
import '../style/pay.css';
import IconButton from '../../../components/IconButton';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function Pay() {
  const [isPay, setIsPay] = useState(false);

  useEffect(() => {
    checkPay()
  }, [])

  async function checkPay() {
    const res = await api.get('/auth/rate')
    console.log(res.data)
    res && setIsPay(res.data === 0 ? false : true)
  }

  async function pay() {
    const res = await api.post('/auth/rate')
    res && ShowToast('success', res)
    res && setIsPay(!isPay)
  }

  return (
    <div className='pay-box'>
      <div className='pay-info-box'>
        <div className='pay-title'>Glim Premium {isPay ? <span className='payed'>구독중</span> : <></>}</div>
        {isPay ?
          <></>
          : <div className='pay-content-box'>
            <div>✔️ 월 ￦100</div>
            <div>✔️ 광고제거</div>
            <div>✔️ 기분좋음 (개발자가)</div>
          </div>
        }
        <div className={`pay-btn ${isPay ? 'none' : ''}`} onClick={pay}>
          <div className='pay-icon-box'>
            <IconButton icon={faCreditCard} />
          </div>
          {isPay ?
            <>
              구독취소
            </>
            : '구독하기'}
        </div>
      </div>
    </div>
  );
}

export default Pay;
