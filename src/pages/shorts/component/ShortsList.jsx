import React, { useEffect, useState, } from 'react';
import '../style/shortsList.css';
import ShortsVideo from './ShortsVideo';

function ShortsList() {
  const [shorts, setShorts] = useState([]);


  useEffect(() => {
    let shortsList = ["test1", "test2", "test3", "test4", "test5"
    ];
    let shortsBoxes = [];
    shortsList.forEach(element => {
      shortsBoxes = [...shortsBoxes, setShortsBox(element)];
    });
    setShorts(shortsBoxes)
  }, []);

  function setShortsBox(element) {
    return (
      <div key={element}>
        <ShortsVideo link={element} name={element} />
      </div>
    )
  }

  const [page, movePage] = useState(0);
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
    else reScroll();
  }

  const section = document.querySelector('section');
  const height = window.innerHeight - 50;
  function reScroll() {
    section.scrollTop = page * height;
  }

  function scrollUp(e) {
    if (e.target.parentNode.parentNode.nextSibling) {
      section.scrollTop = (page + 1) * height
      e.target.pause();
      e.target.parentNode.parentNode.nextSibling.firstChild.firstChild.muted = true;
      e.target.parentNode.parentNode.nextSibling.firstChild.firstChild.play();
      e.target.parentNode.parentNode.nextSibling.firstChild.firstChild.muted = false;
      movePage(page + 1);
    }
    else {
      movePage(0);
    }
    section.style.overflowY = 'hidden'
    setTimeout(() => {
      section.style.overflowY = 'scroll'
    }, 100);
  }

  function scrollDown(e) {
    if (e.target.parentNode.parentNode.previousSibling) {
      section.scrollTop = (page - 1) * height
      e.target.pause();
      e.target.parentNode.parentNode.previousSibling.firstChild.firstChild.muted = true;
      e.target.parentNode.parentNode.previousSibling.firstChild.firstChild.play();
      e.target.parentNode.parentNode.previousSibling.firstChild.firstChild.muted = false;
      movePage(page - 1);
    } else {
      section.scrollTop = page * height;
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
    <div className="shorts-list-box" onWheel={e => wheelScroll(e)} onMouseUp={e => endTouch(e)} onMouseDown={e => onTouch(e)} onTouchStart={e => onTouch(e)} onTouchEnd={e => endTouch(e)}>
      {shorts}
    </div>
  );
}

export default ShortsList;