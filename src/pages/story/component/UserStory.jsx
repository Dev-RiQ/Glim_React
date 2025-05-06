import { React, useEffect, useState } from 'react';
import "../style/userStory.css"
import UserImage from '../../user/component/UserImage';
import IconButton from '../../../components/IconButton';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function UserStory(props) {
  const [myStory, setMyStory] = useState([]);

  useEffect(() => {
    if (props.isMine) {
      setMyStory(
        <div className='add-story-btn' onClick={addStory}>
          <IconButton icon={faAdd} />
        </div>
      )
    }
  }, [])

  function addStory() {
    window.location.href = '/addStory'
  }

  return (
    <div className="story-box" onClick={props.showStoryView}>
      <div className="story-user-img">
        <UserImage id={props.id} link={props.link} hasStory={props.hasStory} setIsView={props.setIsView} />
      </div>
      <p className="story-user-name">{props.name}</p>
      {myStory}
    </div>
  )
};

export default UserStory;
