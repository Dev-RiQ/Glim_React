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
    setSearchs(getSearchList())
  }, []);

  async function getSearchList() {
    let res;
    if (!num) {
      res = await api.get('/board/search' + offset !== 0 ? +`/${offset}` : '')
    } else if (num === 1) {
      res = await api.get(`/board/my/${props.id}` + offset !== 0 ? +`/${offset}` : '')
    } else if (num === 2) {
      res = await api.get(`/board/myShorts/${props.id}` + offset !== 0 ? +`/${offset}` : '')
    } else if (num === 3) {
      res = await api.get(`/board/tag/${props.id}` + offset !== 0 ? +`/${offset}` : '')
    }
    let searchBoxes = [];
    res?.forEach(element => {
      searchBoxes = [...searchBoxes, setSearchBox(element)];
    });
    setOffset(res[res.length - 1].id)
    return searchBoxes
  }

  function movePage(id, type) {
    let uri = '/board/'
    if (type && type === 'SHORTS') {
      uri += 'shorts/'
    }
    navigate(uri + id)
  }

  function setSearchBox(element) {
    return (
      <div key={element.id} onClick={movePage(element.id, element.type ? element.type : props?.type)}>
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