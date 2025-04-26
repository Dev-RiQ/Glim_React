import { React } from 'react';
import "../style/storyView.css"
import UserPortion from '../../user/component/UserPortion';
import dummy from '../../../assets/test/test6.jpg'
import IconButton from '../../../components/IconButton';
import { faHeart, faPaperPlane, faX } from '@fortawesome/free-solid-svg-icons';

function StoryView(props) {
  return (
    <>
      <img className="story-view-img" width="100%" height="100%" src={dummy} alt="story" />
      <div className="story-header">
        <div className="story-end" onClick={props.endStoryView}>
          <IconButton icon={faX} />
        </div>
        <div className="story-user-protion">
          <UserPortion />
        </div>
      </div>
      <div className="story-footer">
        <IconButton icon={faHeart} />
        <input className="story-reply-msg" type="text" />
        <IconButton icon={faPaperPlane} />
      </div>
    </>
  )
};

export default StoryView;
