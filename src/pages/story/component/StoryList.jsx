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
    let storyList = await api.get(`/story`)
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
        <UserStory link={myInfo.img} name={myInfo.nickname} isMine={true} />
      </div>
    )
  }

  function setStoryBox(element) {
    return (
      <div key={element.id}>
        <UserStory link={element.img} name={element.nickname} />
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
