import { React, useEffect, useState } from 'react';
import "../style/storyList.css"
import UserStory from './UserStory';
import api from '../../../utils/api';

function StoryList(props) {
  const [stories, setStories] = useState(null);
  const [isClick, setIsClick] = useState(false);
  const [pointer, setPointer] = useState(0);
  const [pointerAfter, setPointerAfter] = useState(0);

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

  function click(e) {
    setPointer(e.clientX)
    setIsClick(true)
  }
  function clickOver(e) {
    setIsClick(false)
    e.currentTarget.scrollLeft += pointer - pointerAfter;
    setPointer(0)
    setPointerAfter(0)
  }
  function clickDrag(e) {
    if (isClick) {
      setPointerAfter(e.clientX)
    }
  }

  return (
    <div className="story-list-box" onMouseDown={e => click(e)} onMouseMove={e => clickDrag(e)} onMouseUp={e => clickOver(e)}>
      {stories}
    </div>
  )
};

export default StoryList;
