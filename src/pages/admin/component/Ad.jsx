import React, { useEffect, useState, } from 'react';
import '../style/adList.css';
import api from '../../../utils/api';
import IconButton from '../../../components/IconButton';
import { faAd, faChevronLeft, faX } from '@fortawesome/free-solid-svg-icons';
import ShowToast from '../../main/hook/ShowToast';
import BoardView from '../../board/page/BoardView';
import BoardInfo from '../../board/component/BoardInfo';

function Ad(props) {
  const data = props.data;
  const [modal, setModal] = useState(null)

  async function showBoard(id) {
    const res = await api.get(`/board/show/${id}`)
    res && setModal(<BoardInfo data={res} />)
  }


  function modalOff() {
    setModal(null)
  }

  async function submit() {
    if (data.status !== 'PENDING') return;
    const res = await api.post(`/ad/${data.id}/approve`)
    res && ShowToast('success', '광고 승인이 완료되었습니다.')
    res && (data.status = 'APPROVED')
    res && setModal(null)
  }

  async function reject() {
    if (data.status !== 'PENDING') return;
    const res = await api.post(`/ad/${data.id}/reject`)
    res && ShowToast('success', '광고 거절이 완료되었습니다.')
    res && (data.status = 'REJECTED')
    res && setModal(null)
  }

  return (
    <>
      <div className='ad-box'>
        <div className='ad-num-box'>
          <div className='ad-preview-btn'>
            <IconButton icon={faAd} />
          </div>
          <div>
            {data.id}번
          </div>
        </div>
        {data.status === 'PENDING' ?
          <button className='ad-board-link' onClick={() => showBoard(data.boardId)}>
            {'광고 검토하기 >'}
          </button>
          : <></>
        }
        <div className='btn-box'>
          <button className={`ad-status-box ${data.status === 'PENDING' ? 'submit' : data.status === 'APPROVED' ? '' : 'reject'}`} onClick={() => submit()}>
            {data.status === 'PENDING' ? '승인'
              : data.status === 'APPROVED' ? '승인 완료'
                : '승인 거절'
            }
          </button>
          {data.status === 'PENDING' ?
            <button className={`ad-status-box rejecting`} onClick={() => reject()}>
              거절
            </button>
            : <></>}
        </div>
      </div>
      {modal ?
        <div className='ad-modal'>
          <div className='ad-modal-header'>
            <div className='ad-modal-left'>
              <div className='ad-modal-icon' onClick={modalOff}>
                <IconButton icon={faChevronLeft} />
              </div>
              <div className='ad-modal-title'>
                {data.id}번 광고
              </div>
            </div>
            <div className='ad-modal-right'>
              <div className='btn-box'>
                <button className={`ad-status-box ${data.status === 'PENDING' ? 'submit' : data.status === 'APPROVED' ? '' : 'reject'}`} onClick={() => submit()}>
                  {data.status === 'PENDING' ? '승인'
                    : data.status === 'APPROVED' ? '승인 완료'
                      : '승인 거절'
                  }
                </button>
                {data.status === 'PENDING' ?
                  <button className={`ad-status-box rejecting`} onClick={() => reject()}>
                    거절
                  </button>
                  : <></>}
              </div>
            </div>
          </div>
          {modal}
        </div>
        : <></>}
    </>
  );
}

export default Ad;