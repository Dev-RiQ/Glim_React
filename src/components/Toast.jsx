import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React, useEffect, useState } from 'react';
import "../assets/style/toast.css"
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import useToast from '../utils/ShowToast';

function Toast(props) {
  const [msg, setMsg] = useState('');
  const [icon, setIcon] = useState(faExclamation);
  const [iconColor, setIconColor] = useState('toast-icon success');
  const [isShow, setShow] = useState('toast-box');

  useEffect(() => {
    if (props.type === 'error') {
      setError(props.msg);
    } else if (props.type === 'success') {
      setSuccess(props.msg);
    }
  }, []);

  function setError(msg) {
    setMsg(msg)
    setIcon(faExclamation);
    setIconColor("toast-icon error");
    showToast()
  }

  function setSuccess(msg) {
    setMsg(msg)
    setIcon(faCheck);
    setIconColor("toast-icon success");
    showToast()
  }

  function showToast() {
    setTimeout(() => {
      setShow('toast-box show');
    }, 100);
    setTimeout(() => {
      setShow('toast-box');
    }, 1400);
  }

  return (
    <div className={isShow}>
      <button>
        <div className={iconColor}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <span className="toast-msg">{msg}</span>
      </button>
    </div >
  )
};

export default Toast;
