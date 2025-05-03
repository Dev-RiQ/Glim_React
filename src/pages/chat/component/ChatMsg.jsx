import React, { useEffect, useState } from 'react';
import '../style/chatMsg.css';
import UserImage from '../../user/component/UserImage';

function ChatMsg(props) {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (props.id === props.loginId) {
      setMsg(setMyMsg());
    } else {
      setMsg(setOtherMsg());
    }
  }, [])

  function setMyMsg() {
    return (
      <div className='msg-box my' key={props.msgId}>
        <div className='msg-info'>
          <div className='date-text'>
            <span className='msg-date'>{props.createdAt}</span>
          </div>
          <div className='msg-text my'>
            <span className='msg-content'>{props.content}</span>
          </div>
        </div>
      </div>
    );
  }

  function setOtherMsg() {
    return (
      <div className='msg-box' key={props.msgId}>
        <div className='msg-user-img'>
          <UserImage link={props.userImg} />
        </div>
        <div className='msg-info'>
          <div className='msg-text'>
            <span className='msg-content'>{props.content}</span>
          </div>
          <div className='date-text'>
            <span className='msg-date'>{props.createdAt}</span>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="single-chat-box">
      {msg}
    </div>
  );
}

export default ChatMsg;
