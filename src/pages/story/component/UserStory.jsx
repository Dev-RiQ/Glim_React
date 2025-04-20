import { React } from 'react';
import "../style/userStory.css"
import UserImage from '../../user/component/UserImage';

function UserStory(props) {
  return (
    <div className="story-box">
      <div className="story-user-img">
        <UserImage link={props.link} />
      </div>
      <p>{props.name}</p>
    </div>
  )
};

export default UserStory;
