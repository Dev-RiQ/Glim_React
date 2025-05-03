import { React, useEffect, useState } from 'react';
import "../style/storyList.css"
import UserStory from './UserStory';
import api from '../../../utils/api';

function StoryList(props) {
  const [stories, setStories] = useState(null);

  useEffect(() => {
    setStories(getStoryList())
  }, []);

  async function getStoryList() {
    let storyList = await api.get(`/follow/story`)
    let storyBoxes = [await setMyStory()];
    storyList?.forEach(element => {
      storyBoxes = [...storyBoxes, setStoryBox(element)];
    });
    return storyBoxes;
  }

  async function setMyStory() {
    const myInfo = await api.get('/auth/me')
    return (
      <div key={myInfo.nickname}>
        <UserStory id={myInfo.id} link={myInfo.img} name={myInfo.nickname} isMine={true} hasStory={myInfo.isStory} />
      </div>
    )
  }

  function setStoryBox(element) {
    return (
      <div key={element.id}>
        <UserStory id={element.userId} link={element.img} name={element.nickname} hasStory={true} />
      </div>
    )
  }

  function clickDrag(e) {
    console.log(e)
    console.log(e.target)
  }

  return (
    <div className="story-list-box" onDragStart={e => clickDrag(e)}>
      {stories}
    </div>
  )
};

export default StoryList;
