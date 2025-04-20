import { React } from 'react';
import "../style/userImage.css"

function UserImage(props) {
  return (
    <div className="user-image">
      <button className="user-img-btn">
        <img className="user-img" src="http://place-hold.it/100x100" alt="USER_IMG" />
      </button>
    </div>
  )
};

export default UserImage;
