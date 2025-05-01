import React, { useEffect, useState, } from 'react';
import '../style/shortsList.css';
import ShortsVideo from './ShortsVideo';
import ShowComment from '../../board/hook/ShowComment';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function ShortsList() {
  const [shorts, setShorts] = useState([]);
  const [comments, setComments] = useState(null);
  const [commentView, setCommentView] = useState('comment-box')
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (commentView === 'comment-box') {
      setComments(null);
    }
  }, [commentView])

  function shortsComment(e, data) {
    if (!data.commentable) {
      ShowToast('error', '댓글 사용이 중지된 게시글입니다.')
      return;
    }
    setComments(ShowComment(data, setCommentView))
    setCommentView('comment-box show')
    pauseVideo(e)
  }


  useEffect(() => {
    getShortsList()
  }, []);

  async function getShortsList() {
    const res = await api.get('/board/shorts' + offset !== 0 ? `/${offset}` : '')
    let shortsBoxes = [];
    res?.forEach((element, idx) => {
      shortsBoxes = [...shortsBoxes, setShortsBox(element, shorts.length + idx)];
    });
    res && setOffset(res[res.length - 1].id)
    res && setShorts(getShortsList())
    return shortsBoxes;
  }

  function pauseVideo(e) {
    if (e.currentTarget.parentNode.parentNode.firstChild.played.length === 1) {
      e.currentTarget.parentNode.parentNode.firstChild.pause()
    }
  }

  function setShortsBox(element, idx) {
    return (
      <div className={idx} key={idx} onWheel={e => wheelScroll(e)} onMouseUp={e => endTouch(e)} onMouseDown={e => onTouch(e)} onTouchStart={e => onTouch(e)} onTouchEnd={e => endTouch(e)}>
        <ShortsVideo data={element} shortsComment={shortsComment} />
      </div>
    )
  }

  let touchStart = 0;
  let touchEnd = 0;

  function onTouch(e) {
    if (e.touches)
      touchStart = e.touches[0].clientY;
    else
      touchStart = e.clientY;

  }

  function endTouch(e) {
    if (e.touches)
      touchEnd = e.changedTouches[0].clientY;
    else
      touchEnd = e.clientY;
    const diff = touchStart - touchEnd;
    if (diff > 50) scrollUp(e);
    else if (diff < -50) scrollDown(e);
    else if (diff !== 0) reScroll();
  }

  const section = document.querySelector('section');
  const height = window.innerHeight - 50;
  function reScroll(e) {
    section.scrollTop = parseInt(e.currentTarget.className) * height;
  }

  function scrollUp(e) {
    if (e.currentTarget.nextSibling) {
      section.scrollTop = (parseInt(e.currentTarget.className) + 1) * height
      e.currentTarget.firstChild.firstChild.pause();
      e.currentTarget.nextSibling.firstChild.firstChild.muted = true;
      e.currentTarget.nextSibling.firstChild.firstChild.play();
      e.currentTarget.nextSibling.firstChild.firstChild.muted = false;
    }
    section.style.overflowY = 'hidden'
    setTimeout(() => {
      section.style.overflowY = 'scroll'
    }, 100);
  }

  function scrollDown(e) {
    if (e.currentTarget.previousSibling) {
      section.scrollTop = (parseInt(e.currentTarget.className) - 1) * height
      e.currentTarget.firstChild.firstChild.pause();
      e.currentTarget.previousSibling.firstChild.firstChild.muted = true;
      e.currentTarget.previousSibling.firstChild.firstChild.play();
      e.currentTarget.previousSibling.firstChild.firstChild.muted = false;
    } else {
      section.scrollTop = parseInt(e.currentTarget.className) * height;
    }
    section.style.overflowY = 'hidden'
    setTimeout(() => {
      section.style.overflowY = 'scroll'
    }, 100);
  }

  let [isWheel, setWheel] = useState(false);
  function wheelScroll(e) {
    if (!isWheel) {
      setWheel(true);
      switch (e.nativeEvent.deltaY) {
        case 100: scrollUp(e); break;
        case -100: scrollDown(e); break;
        default: break;
      }
      setTimeout(() => {
        setWheel(false)
      }, 300);
    }
  }

  return (
    <>
      <div className="shorts-list-box">
        {shorts}
      </div>
      <div className={commentView}>
        {comments}
      </div>
    </>
  );
}

export default ShortsList;