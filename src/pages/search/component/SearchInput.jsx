import React, { useEffect, useState, } from 'react';
import '../style/searchInput.css';
import UserImage from '../../user/component/UserImage';
import IconButton from '../../../components/IconButton';
import { faCrown, faSearch } from '@fortawesome/free-solid-svg-icons';
import api from '../../../utils/api';

function SearchInput() {
  const [showSearchUsers, setShowSearchUsers] = useState([])

  async function insertUser(e) {
    if (!e.target.value) {
      setShowSearchUsers([])
      return
    }
    console.log(e.target.value)
    const searchList = await api.post('/auth/search', { "nickname": e.target.value })
    let testShow = []
    searchList?.forEach(element => {
      testShow = [...testShow, (
        <div className='show-search-user' onClick={() => window.location.href = '/myPage/' + element.userId} >
          <div className='search-user-img-box'>
            <UserImage link={element.img} hasStory={element.isStory} />
          </div>
          <div className='search-user-info-box'>
            <div>
              @{element.nickname}
            </div>
            <div>
              {element.name}
            </div>
          </div>
        </div>
      )]
    })
    setShowSearchUsers(testShow)
  }

  function goRanking() {
    window.location.href = '/ranking'
  }

  return (
    <div className="search-input-box">
      <div className='search-input-icon'>
        <IconButton icon={faSearch} />
      </div>
      <input className='search-input' type="text" spellCheck="false" placeholder='유저 검색' onChange={insertUser} />
      <div className='show-search-user-box'>
        {showSearchUsers}
      </div>
      <div onClick={goRanking}>
        <div className='ranking-btn'>
          <IconButton icon={faCrown} />
        </div>
        <div className='ranking-info'>
          랭킹 보기
        </div>
      </div>
    </div>
  );
}

export default SearchInput;