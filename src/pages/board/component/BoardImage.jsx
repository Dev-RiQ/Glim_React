import React, { useEffect, useState } from 'react';
import '../style/boardImage.css';
import IconButton from '../../../components/IconButton';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function BoardImage(props) {
  const [page, movePage] = useState(0);
  const [count, setCount] = useState([]);
  const totalPage = 10;

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
      let list = []
      for (let i = 0; i < totalPage; i++) {
        const link = "http://place-hold.it/" + ((i + 1) % 3 + 1) * 240 + "x" + ((i + 2) % 3 + 1) * 660;
        list = [...list, <div key={i}>
          <img className="board-img" src={link} alt="BOARD_IMG" />
        </div>]
      }
      return list;
    }
    setImage(imageList());
  }, [])

  function scrollOne(e) {
    if (e.currentTarget.scrollLeft > page * window.innerWidth + 100
    ) {
      e.currentTarget.scrollLeft = (page + 1) * window.innerWidth;
      movePage(page + 1);
    } else if (e.currentTarget.scrollLeft < page * window.innerWidth - 100
    ) {
      e.currentTarget.scrollLeft = (page - 1) * window.innerWidth;
      movePage(page - 1);
    } else {
      e.currentTarget.scrollLeft = page * window.innerWidth;
    }
  }

  return (
    <div className='board-info-images'>
      <div className="file-box" onTouchEnd={e => scrollOne(e)}>
        {image}
      </div>
      <div className="file-count-list">
        {count}
      </div>
    </div>
  );
}

export default BoardImage;
