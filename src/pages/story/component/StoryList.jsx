import { React, useEffect, useState } from 'react';
import "../style/storyList.css"
import UserStory from './UserStory';

function StoryList() {
  const [stories, setStories] = useState(null);

  useEffect(() => {
    let storyList = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"];
    let storyBoxes = [setMyStory()];
    storyList.forEach(element => {
      storyBoxes = [...storyBoxes, setStoryBox(element)];
    });
    setStories(storyBoxes)
  }, []);

  function setMyStory() {
    return (
      <div key="me">
        <UserStory link={1} name='me' isMine='true' />
      </div>
    )
  }

  function setStoryBox(element) {
    return (
      <div key={element}>
        <UserStory link={element} name={element} />
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
