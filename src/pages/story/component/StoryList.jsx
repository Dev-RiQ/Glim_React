import { React, useEffect, useState } from 'react';
import "../style/storyList.css"
import UserStory from './UserStory';

function StoryList() {
  const [stories, setStories] = useState(null);

  useEffect(() => {
    let storyList = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"];
    let storyBoxes = [];
    storyList.forEach(element => {
      storyBoxes = [...storyBoxes, setStoryBox(element)];
    });
    setStories(storyBoxes)
  }, []);

  function setStoryBox(element) {
    return (
      <div key={element}>
        <UserStory link={element} name={element} />
      </div>
    )
  }

  return (
    <div className="story-list-box">
      {stories}
    </div>
  )
};

export default StoryList;
