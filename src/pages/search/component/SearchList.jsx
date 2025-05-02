import React, { useEffect, useState, } from 'react';
import '../style/searchList.css';
import SearchImg from './SearchImg';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

function SearchList(props) {
  const num = props?.num
  const [search, setSearchs] = useState([]);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    setOffset(0)
    setSearchs(getSearchList(true))
  }, [num]);

  async function getSearchList(enter) {
    let res;
    const next = enter ? 0 : offset;
    if (!num) {
      res = await api.get('/board/search' + (next !== 0 ? `/${next}` : ''))
    } else if (num === 1) {
      res = await api.get(`/board/my/${props.id}` + (next !== 0 ? `/${next}` : ''))
    } else if (num === 2) {
      res = await api.get(`/board/myShorts/${props.id}` + (next !== 0 ? `/${next}` : ''))
    } else if (num === 3) {
      res = await api.get(`/board/tag/${props.id}` + (next !== 0 ? `/${next}` : ''))
    }
    let searchBoxes = [];
    res?.forEach(element => {
      searchBoxes = [...searchBoxes, setSearchBox(element)];
    });
    res && setOffset(res[res.length - 1].id)
    return searchBoxes
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
    <div className="search-list-box">
      {search}
    </div>
  );
}

export default SearchList;