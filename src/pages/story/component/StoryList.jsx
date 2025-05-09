import { React, useEffect, useState } from 'react';
import "../style/storyList.css"
import UserStory from './UserStory';
import api from '../../../utils/api';

function StoryList(props) {
  const [stories, setStories] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [pointer, setPointer] = useState(0);
  const [pointerAfter, setPointerAfter] = useState(0);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    getStoryList()

  }, []);

  async function getStoryList() {
    let storyList = await api.get(`/follow/story`)
    let storyBoxes = [await setMyStory()];
    storyList?.forEach(element => {
      storyBoxes = [...storyBoxes, setStoryBox(element)];
    });
    setStories(storyBoxes)
  }


  async function setMyStory() {
    const myInfo = await api.get('/auth/me')
    return (
      <div key={myInfo.nickname}>
        <UserStory id={myInfo.id} link={myInfo.img} name={myInfo.nickname} isMine={true} hasStory={myInfo.isStory} setIsView={setIsView} />
      </div>
    )
  }

  function setStoryBox(element) {
    return (
      <div key={element.userId}>
        <UserStory id={element.userId} link={element.img} name={element.nickname} hasStory={true} setIsView={setIsView} />
      </div>
    )
  }

  function click(e) {
    setPointer(e.clientX)
    setPointerAfter(e.clientX)
    setIsClick(true)
  }
  function clickOver(e) {
    if (isView) {
      setPointer(0)
      setPointerAfter(0)
      return;
    }
    setIsClick(false)
    setPointer(0)
    setPointerAfter(0)
  }
  function clickDrag(e) {
    if (isView) {
      setPointer(0)
      setPointerAfter(0)
      return;
    }
    if (isClick && pointer !== 0) {
      e.currentTarget.scrollLeft += pointer - pointerAfter;
      setPointerAfter(e.clientX)
    }
  }
  function storyShow(e) {
    setTimeout(() => {
      if (document.querySelector('.storyLine-box')) {
        setIsView(true)
      }
    }, 100);
  }

  return (
    <div className="story-list-box" onClick={storyShow} onMouseDown={e => click(e)} onMouseMove={e => clickDrag(e)} onMouseUp={e => clickOver(e)}>
      {stories}
    </div>
  )
};

export default StoryList;
