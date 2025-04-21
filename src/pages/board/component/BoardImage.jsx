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
          <img className="board-img" src={link} alt="BOARD_IMG" />
        </div>]
      }
      return list;
    }
    setImage(imageList());
  }, [])

  function scrollOne(e) {
    if (e.currentTarget.scrollLeft > page * window.innerWidth + 80) {
      e.currentTarget.scrollLeft = (page + 1) * window.innerWidth;
      movePage(page + 1);
    } else if (e.currentTarget.scrollLeft < page * window.innerWidth - 80) {
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
