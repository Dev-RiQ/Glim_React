import { React } from 'react';
import "../style/userImage.css"
import user1 from '../../../assets/test/user1.jpg'
import user2 from '../../../assets/test/user2.jpg'
import user3 from '../../../assets/test/user3.jpg'

function UserImage(props) {
  let rd = user1;
  if (Math.random() > 0.66) rd = user2;
  else if (Math.random() < 0.33) rd = user3;

  return (
    <div className="user-image">
      <button className="user-img-btn">
        <img className="user-img" src={rd} alt="USER_IMG" />
      </button>
    </div>
  )
};

export default UserImage;
