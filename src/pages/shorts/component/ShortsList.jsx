import React, { useEffect, useState, } from 'react';
import '../style/shortsList.css';
import ShortsVideo from './ShortsVideo';
import IconButton from '../../../components/IconButton';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

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
    setTimeout(() => {
      document.querySelector('.shorts-list-box').firstChild.firstChild.firstChild.play();
    }, 100)
  }, []);

  function setShortsBox(element) {
    return (
      <div key={element}>
        <ShortsVideo link={element} name={element} />
      </div>
    )
  }

  const [page, movePage] = useState(0);

  function scrollOne(e) {
    const section = document.querySelector('section');
    const height = window.innerHeight - 100;
    if (section.scrollTop > page * height + 10) {
      section.scrollTop = (page + 1) * height
      e.target.pause();
      e.target.parentNode.parentNode.nextSibling.firstChild.firstChild.play();
      movePage(page + 1);
    } else if (section.scrollTop < page * height - 10) {
      section.scrollTop = (page - 1) * height
      e.target.pause();
      e.target.parentNode.parentNode.previousSibling.firstChild.firstChild.play();
      movePage(page - 1);
    } else {
      section.scrollTop = page * height;
    }
  }

  return (
    <div className="shorts-list-box" onTouchEnd={e => scrollOne(e)}>
      {shorts}
    </div>
  );
}

export default ShortsList;