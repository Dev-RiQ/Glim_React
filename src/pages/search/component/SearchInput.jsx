import React, { useEffect, useState, } from 'react';
import '../style/searchInput.css';
import UserImage from '../../user/component/UserImage';
import testimg from '../../../assets/test/user3.jpg'
import IconButton from '../../../components/IconButton';
import { faCommentAlt, faCrown, faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchInput() {
  const [showSearchUsers, setShowSearchUsers] = useState([])

  function insertUser(e) {
    if (!e.target.value) {
      setShowSearchUsers([])
      return
    }
    const testList = [{ "id": 1, "name": "test1", "img": testimg },
    { "id": 2, "name": "test2", "img": testimg },
    { "id": 3, "name": "test3", "img": testimg },
    { "id": 4, "name": "test4", "img": testimg },
    { "id": 4, "name": e.target.value, "img": testimg },
    ] //=>검색결과
    //search 유저 리스트 담아주기
    // 유저 클릭하면 id 저장하기(plusUser)
    let testShow = []
    testList.forEach(element => {
      console.log("name", element.name)
      testShow = [...testShow, (
        <div className='show-search-user' onClick={e => window.location.href = '/myPage/' + element.id} >
          <div className='search-user-img-box'>
            <UserImage />
          </div>
          <div>
            @{element.name}
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