import React, { useEffect, useState } from 'react';
import '../style/userList.css';
import { useLocation } from 'react-router-dom';
import test from '../../../assets/test/user1.jpg'
import UserImage from '../component/UserImage';

function UserList() {
  const location = useLocation()
  const [type, setType] = useState(location.state.type)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    moreUserList()
  }, [])

  function moreUserList() {
    let list = [{ "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    { "img": test, "name": "test1" },
    ]
    if (type === 'follower') {
      list = [...list]
    } else {
      list = [...list]
    }
    let showUserList = []
    list.forEach(element => {
      showUserList = [...showUserList, (
        <div className='show-user-box'>
          <div className='show-user-img'>
            <UserImage />
          </div>
          <div className='show-user-info'>
            <div className='show-user-nickname'>
              {element.name}
            </div>
            <div className='show-user-name'>
              {element.name}
            </div>
          </div>
        </div>
      )]
    })
    setUserList([...userList, showUserList])
  }

  return (
    <div className="user-list-box">
      {userList}
    </div>
  );
}

export default UserList;
