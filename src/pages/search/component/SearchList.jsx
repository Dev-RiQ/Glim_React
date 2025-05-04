import React, { useEffect, useState, } from 'react';
import '../style/searchList.css';
import SearchImg from './SearchImg';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

function SearchList(props) {
  const num = props?.num
  const [search, setSearchs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasData, setHasData] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setOffset(0)
    getSearchList(true)
  }, [num]);


  async function scroll(e) {
    if (offset === 0) return;
    const rect = e.currentTarget.getBoundingClientRect()
    if (rect.bottom < window.innerHeight) {
      if (isLoaded) return;
      setIsLoaded(true)
      await getSearchList()
      setIsLoaded(false)
    }
  }


  async function getSearchList(enter) {
    let res;
    const next = enter ? 0 : offset;
    if (!num) {
      res = await api.get('/board/search' + (next !== 0 ? `/${next}` : ''))
      !res && offset === 0 && setSearchs([(<div className='no-list'><p>추천 게시글이 존재하지 않습니다.</p></div>)])
    } else if (num === 1) {
      res = await api.get(`/board/my/${props.id}` + (next !== 0 ? `/${next}` : ''))
      !res && offset === 0 && setSearchs([(<div className='no-list'><p>작성한 게시글이 존재하지 않습니다.</p></div>)])
    } else if (num === 2) {
      res = await api.get(`/board/myShorts/${props.id}` + (next !== 0 ? `/${next}` : ''))
      !res && offset === 0 && setSearchs([(<div className='no-list'><p>작성한 게시글이 존재하지 않습니다.</p></div>)])
    } else if (num === 3) {
      res = await api.get(`/board/tag/${props.id}` + (next !== 0 ? `/${next}` : ''))
      !res && offset === 0 && setSearchs([(<div className='no-list'><p>태그된 게시글이 존재하지 않습니다.</p></div>)])
    }
    let searchBoxes = [];
    res?.forEach(element => {
      searchBoxes = [...searchBoxes, setSearchBox(element)];
    });
    res && setSearchs(searchBoxes)
    res && setOffset(res[res.length - 1].id)
    res && setHasData(true)
    !res && setOffset(0)
  }

  function movePage(id, type) {
    let uri = '/board/'
    if (type && type === 'SHORTS') {
      uri = '/shorts/'
    }
    navigate(`${uri}${id}`)
  }

  function setSearchBox(element) {
    return (
      <div key={element.id} onClick={() => movePage(element.id, element.type ? element.type : props?.type)}>
        <SearchImg link={element.img} type={element.type} />
      </div>
    )
  }

  return (
    <div className={`search-list-box ${!hasData ? 'none' : ''}`} onWheel={scroll} onTouchMove={scroll}>
      {search}
    </div>
  );
}

export default SearchList;