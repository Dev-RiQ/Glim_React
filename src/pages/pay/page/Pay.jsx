import React, { useEffect, useState } from 'react';
import '../style/pay.css';
import IconButton from '../../../components/IconButton';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import { useSearchParams } from 'react-router-dom';

function Pay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPay, setIsPay] = useState(false);

  useEffect(() => {
    checkPay()
    if (searchParams.get('imp_success') !== null) {
      setPayResult(searchParams.get('imp_success'));
    }
  }, [])

  async function checkPay() {
    const res = await api.get('/auth/rate')
    res && setIsPay(res.data === 0 ? false : true)
  }

  async function pay() {
    if (!isPay) {
      getPay();
    } else {
      setMyPay()
    }
  }

  async function getPay() {
    const { IMP } = window;
    IMP.init("imp77335438")
    await IMP.request_pay({
      pg: "tosspayments.iamporttest_4",
      pay_method: "card",
      customer_uid: "user_001",
      name: "정기결제 카드 등록",
      amount: 100,
      buyer_email: "test@test.com",
      buyer_name: "홍길동",
      buyer_tel: "01012345678",
      m_redirect_url: "http://localhost:3000/pay"
    }, res => setPayResult(res.success))
  }

  function setPayResult(res) {
    if (res === 'true' || res === true) {
      setMyPay()
    } else {
      ShowToast('error', '구독 신청에 실패하였습니다.')
    }
  }

  async function setMyPay() {
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
