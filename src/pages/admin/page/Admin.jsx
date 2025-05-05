import React, { useEffect, useState, } from 'react';
import '../style/admin.css';
import IconButton from '../../../components/IconButton';
import { faAd, faChevronLeft, faMusic, faRemove, faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import AdList from '../component/AdList';
import BgmList from '../component/BgmList';
import AddBgm from '../component/AddBgm';

function Admin() {
  const [btns, setBtns] = useState([]);
  const [modal, setModal] = useState([]);
  const [modalOn, setModalOn] = useState('admin-modal-box');
  const [modalTitle, setModalTitle] = useState('')

  useEffect(() => {
    getBtns()
  }, [])

  async function getBtns() {
    const res = await api.get('/auth/role')
    if (res !== 'ROLE_ADMIN') {
      ShowToast('error', '잘못된 접근입니다.')
      setTimeout(() => {
        window.history.back();
      }, 500);
    } else {
      let btn = []
      btn = [...btn, (btnSetting(faAd, '광고 승인 요청', setAd))]
      btn = [...btn, (btnSetting(faMusic, '배경 음원 추가', setAddBgm))]
      btn = [...btn, (btnSetting(faRemove, '배경 음원 삭제', setBgm))]
      setBtns(btn)
    }
  }

  function btnSetting(icon, msg, event) {
    return (<div className='admin-btn' onClick={event}>
      <div className='admin-btn-icon'>
        <IconButton icon={icon} />
      </div>
      <div className='admin-btn-msg'>{msg}</div>
    </div>)
  }

  function closeModal() {
    setModal([])
    setModalOn('admin-modal-box')
  }

  function setAd() {
    setModalOn('admin-modal-box show')
    setModalTitle('광고 요청 목록')
    setModal(<AdList />)
  }
  function setAddBgm() {
    setModalOn('admin-modal-box show')
    setModalTitle('배경 음원 추가')
    setModal(<AddBgm closeModal={closeModal} />)
  }
  function setBgm() {
    setModalOn('admin-modal-box show')
    setModalTitle('배경 음원 목록')
    setModal(<BgmList />)
  }



  return (
    <>
      <div className='admin-btn-box'>
        {btns}
      </div>
      <div className={modalOn}>
        <div className='modal-header'>
          <div className='modal-header-btn' onClick={closeModal}>
            <IconButton icon={faChevronLeft} />
          </div>
          <div className='modal-header-title'>
            {modalTitle}
          </div>
        </div>
        {modal}
      </div>
    </>
  );
}

export default Admin;