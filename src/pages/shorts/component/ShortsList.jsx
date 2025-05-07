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
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    if (commentView === 'comment-box') {
      setComments(null);
    }
  }, [commentView])
  useEffect(() => {
    if (totalPage - page === 2) {
      scroll()
    }
  }, [offset, page, totalPage])



  async function scroll() {
    if (offset === 0) return;
    if (isLoaded) return;
    setIsLoaded(true)
    await getShortsList()
    setIsLoaded(false)
  }


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
    const res = await api.get('/board/shorts' + (offset !== 0 ? `/${offset}` : ''))
    let shortsBoxes = [];
    res?.forEach((element, idx) => {
      shortsBoxes = [...shortsBoxes, setShortsBox(element, shorts.length * 5 + idx)];
    });
    res && setShorts([...shorts, shortsBoxes])
    res && setOffset(res[res.length - 1].id)
    res && setTotalPage(totalPage + res.length);
    !res && offset === 0 && setShorts([(<div className='no-list'><p>업로드된 숏츠가 존재하지 않습니다.</p></div>)])
    !res && setOffset(0)
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
    section.style.overflowY = 'hidden'
    if (diff > 50) scrollUp(e);
    else if (diff < -50) scrollDown(e);
    else if (diff !== 0) reScroll(e);
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
      setPage(parseInt(e.currentTarget.className) + 1)
    }
  }

  function scrollDown(e) {
    if (e.currentTarget.previousSibling) {
      section.scrollTop = (parseInt(e.currentTarget.className) - 1) * height
      e.currentTarget.firstChild.firstChild.pause();
      e.currentTarget.previousSibling.firstChild.firstChild.muted = true;
      e.currentTarget.previousSibling.firstChild.firstChild.play();
      e.currentTarget.previousSibling.firstChild.firstChild.muted = false;
      setPage(parseInt(e.currentTarget.className) - 1)
    } else {
      section.scrollTop = parseInt(e.currentTarget.className) * height;
    }
  }

  let [isWheel, setWheel] = useState(false);
  function wheelScroll(e) {
    if (!isWheel) {
      setWheel(true);
      if (e.nativeEvent.deltaY > 1) {
        scrollUp(e);
      } else if (e.nativeEvent.deltaY < -1) {
        scrollDown(e);
      }
      setTimeout(() => {
        setWheel(false)
      }, 300);
    }
  }

  return (
    <>
      <div className="shorts-list-box" >
        {shorts}
      </div>
      <div className={commentView}>
        {comments}
      </div>
    </>
  );
}

export default ShortsList;