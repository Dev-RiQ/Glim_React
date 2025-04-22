import React, { useEffect, useState } from 'react';
import '../style/myPageBoardList.css';
import IconButton from '../../../components/IconButton';
import { faCirclePlay, faImage, faTag, } from '@fortawesome/free-solid-svg-icons';
import SearchList from '../../search/component/SearchList';
import BoardList from '../page/BoardList';
import ShortsList from '../../shorts/component/ShortsList';

function MyPageBoardList(props) {
  const [checks, setChecks] = useState([true, '', '']);
  const [select, setSelect] = useState('selected-line check1');
  const [boardList, setBoardList] = useState(null);

  useEffect(() => {
    setBoardList(getBoardList(1));
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
    setBoardList(getBoardList(num));
  }

  function getBoardList(num) {
    let list = null;
    if (num === 1) {
      list = <div>
        <SearchList />
      </div>
    } else if (num === 2) {
      list = <div>
        <BoardList />
      </div>
    } else {
      list = <div>
        <ShortsList />
      </div>
    }
    return list;
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
