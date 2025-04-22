import React, { useEffect, useState } from 'react';
import '../style/boardImage.css';
import IconButton from '../../../components/IconButton';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import test1 from '../../../assets/test/test1.jpg';
import test2 from '../../../assets/test/test2.jpg';
import test3 from '../../../assets/test/test3.jpg';
import test4 from '../../../assets/test/test4.jpg';
import test5 from '../../../assets/test/test5.jpg';
import test6 from '../../../assets/test/test6.jpg';
import test7 from '../../../assets/test/test7.jpg';
import test8 from '../../../assets/test/test8.jpg';
import test9 from '../../../assets/test/test9.jpg';

function BoardImage(props) {
  const [page, movePage] = useState(0);
  const [count, setCount] = useState([]);
  const totalPage = 9;

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
    function imageList() {
      const testlist = [test1, test2, test3, test4, test5, test6, test7, test8, test9];
      let list = []
      for (let i = 0; i < totalPage; i++) {
        const link = testlist[i];
        list = [...list,
        <div key={i}>
          <img className="board-img" src={link} width="100%" height="100%" alt="BOARD_IMG" decoding="async" loading="lazy" />
        </div>]
      }
      return list;
    }
    setImage(imageList());
  }, [])

  let touchStart = 0;
  let touchEnd = 0;
  function onTouch(e) {
    if (e.touches)
      touchStart = e.touches[0].clientX;
    else
      touchStart = e.clientX;

  }

  function endTouch(e) {
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
      <div className="file-box" onMouseUp={e => endTouch(e)} onMouseDown={e => onTouch(e)} onTouchStart={e => onTouch(e)} onTouchEnd={e => endTouch(e)}>
        {image}
      </div>
      <div className="file-count-list">
        {count}
      </div>
    </div>
  );
}

export default BoardImage;
