import React, { useEffect, useState, } from 'react';
import '../style/shortsList.css';
import ShortsVideo from './ShortsVideo';
import ShowComment from '../../board/hook/ShowComment';

function ShortsList() {
  const [shorts, setShorts] = useState([]);
  const [comments, setComments] = useState(null);
  const [commentView, setCommentView] = useState('comment-box')

  useEffect(() => {
    if (commentView === 'comment-box') {
      setComments(null);
    }
  }, [commentView])

  function shortsComment(e) {
    setComments(ShowComment(1, setCommentView))
    setCommentView('comment-box show')
    pauseVideo(e)
  }


  useEffect(() => {
    let shortsList = ["test1", "test2", "test3", "test4", "test5"
    ];
    let shortsBoxes = [];
    shortsList.forEach((element, idx) => {
      shortsBoxes = [...shortsBoxes, setShortsBox(element, idx)];
    });
    setShorts(shortsBoxes)
  }, []);

  function pauseVideo(e) {
    if (e.currentTarget.parentNode.parentNode.firstChild.played.length === 1) {
      e.currentTarget.parentNode.parentNode.firstChild.pause()
    }
  }

  function setShortsBox(element, idx) {
    return (
      <div className={idx} key={idx} onWheel={e => wheelScroll(e)} onMouseUp={e => endTouch(e)} onMouseDown={e => onTouch(e)} onTouchStart={e => onTouch(e)} onTouchEnd={e => endTouch(e)}>
        <ShortsVideo link={element} name={element} shortsComment={shortsComment} />
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