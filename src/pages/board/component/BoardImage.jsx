import React, { useEffect, useState } from 'react';
import '../style/boardImage.css';
import IconButton from '../../../components/IconButton';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function BoardImage(props) {
  const [page, movePage] = useState(0);
  const [count, setCount] = useState([]);
  const [totalPage, setTotalPage] = useState(props.imgs.length);
  const [touched, setTouched] = useState(false)
  const [touchLocX, setTouchLocX] = useState(0)
  const [touchLocY, setTouchLocY] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  useEffect(() => {
    function countPage() {
      let pageIcon = []
      for (let i = 0; i < totalPage; i++) {
        if (i === page)
          pageIcon = [...pageIcon, <IconButton key={i} icon={faCircle} check="true" />]
        else
          pageIcon = [...pageIcon, <IconButton key={i} icon={faCircle} check="false" />]
      }
      return pageIcon
    }
    setCount(countPage());
  }, [page]);

  const [image, setImage] = useState([]);

  useEffect(() => {
    imageList()
  }, [])

  function imageList() {
    let list = []
    for (let i = 0; i < totalPage; i++) {
      let link = props.imgs[i];
      list = [...list,
      <div key={i}>
        <img className="board-img" src={link} width="100%" height="100%" alt="BOARD_IMG" decoding="async" loading="lazy" />
      </div>]
    }
    setImage(list);
  }

  function setTouch(e) {
    if (touched &&
      ((e.touches[0].clientX - touchLocX < 20 && e.touches[0].clientX - touchLocX > -20)
        && ((e.touches[0].clientY - touchLocY < 20 && e.touches[0].clientY - touchLocY > -20)))
    ) {
      props.boardLike()
    }
    setTouchLocX(e.touches[0].clientX)
    setTouchLocY(e.touches[0].clientY)
    setTouched(true)
    setTimeout(() => {
      setTouchLocX(0)
      setTouchLocY(0)
      setTouched(false)
    }, 250);
  }

  function onTouch(e) {
    if (e.touches) {
      setTouchStart(e.touches[0].clientX);
      setTouch(e)
    }
    else
      setTouchStart(e.clientX);

  }

  function endTouch(e) {
    let touchEnd;
    if (e.touches)
      touchEnd = e.changedTouches[0].clientX;
    else
      touchEnd = e.clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) scrollRight(e);
    else if (diff < -50) scrollLeft(e);
    else reScroll(e);
  }

  function reScroll(e) {
    e.currentTarget.scrollLeft = page * e.currentTarget.firstChild.firstChild.width;
  }

  function scrollRight(e) {
    if (page === totalPage - 1) return;
    e.currentTarget.scrollLeft = (page + 1) * e.currentTarget.firstChild.firstChild.width;
    movePage(page + 1);
  }

  function scrollLeft(e) {
    if (page === 0) return;
    e.currentTarget.scrollLeft = (page - 1) * e.currentTarget.firstChild.firstChild.width;
    movePage(page - 1);
  }

  return (
    <div className='board-info-images'>
      <div className="file-box" onMouseUp={e => endTouch(e)} onMouseDown={e => onTouch(e)} onTouchStart={e => onTouch(e)} onTouchEnd={e => endTouch(e)} onDoubleClick={props.boardLike}>
        {image}
      </div>
      <div className="file-count-list">
        {count}
      </div>
    </div>
  );
}

export default BoardImage;
