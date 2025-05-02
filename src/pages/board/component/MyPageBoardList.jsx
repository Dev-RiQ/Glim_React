import React, { useEffect, useState } from 'react';
import '../style/myPageBoardList.css';
import IconButton from '../../../components/IconButton';
import { faCirclePlay, faImage, faTag, } from '@fortawesome/free-solid-svg-icons';
import SearchList from '../../search/component/SearchList';

function MyPageBoardList(props) {
  const id = props.userId;
  const [checks, setChecks] = useState([true, '', '']);
  const [select, setSelect] = useState('selected-line check1');
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    getBoardList(1);
  }, [])

  function changeView(num) {
    let checkList = [];
    for (let i = 0; i < 3; i++) {
      if (i + 1 === num) {
        checkList = [...checkList, true];
      } else {
        checkList = [...checkList, ''];
      }
    }
    setSelect('selected-line check' + num);
    setChecks(checkList);
    getBoardList(num);
  }

  function getBoardList(num) {
    let type = "BASIC";
    if (num === 2) {
      type = "SHORTS"
    }
    let list = (<>
      <SearchList id={id} type={type} num={num} />
    </>)
    setBoardList(list);
  }

  return (
    <div className="mypage-board-list-box">
      <div className='my-board-btns'>
        <div className='my-board-btn-box' onClick={e => changeView(1)}>
          <IconButton icon={faImage} check={checks[0]} />
        </div>
        <div className='my-board-btn-box' onClick={e => changeView(2)}>
          <IconButton icon={faCirclePlay} check={checks[1]} />
        </div>
        <div className='my-board-btn-box' onClick={e => changeView(3)}>
          <IconButton icon={faTag} check={checks[2]} />
        </div>
      </div>
      <div className={select}><hr /></div>
      <div className='my-board-list'>
        {boardList}
      </div>
    </div>
  );
}

export default MyPageBoardList;
