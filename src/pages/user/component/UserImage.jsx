import { React, useEffect, useState } from 'react';
import "../style/userImage.css"
import showStory from '../../story/hook/ShowStory';
import api from '../../../utils/api';

function UserImage(props) {

  const id = props.id;
  const [story, setStory] = useState(null);
  const [storyInfo, setStoryInfo] = useState(null);
  const [storyPage, setStoryPage] = useState(0);
  const [storyList, setStoryList] = useState([]);
  const [name, setName] = useState('story-view-box');

  useEffect(() => {
    getStory();
  }, [])

  useEffect(() => {
    setStoryInfo(storyList[storyPage])
  }, [storyPage])

  async function getStory() {
    const res = await api.get(`/story/${id}`)
    res && setStoryList(res)
  }

  function getStoryLine(pages) {
    let line = []
    for (let i = 0; i < storyList.length; i++) {
      let value = 0;
      if (pages >= i) value = 500;
      line = [...line,
      <div key={i}>
        <progress className="story-progress" min="0" max="500" value={value} />
      </div>
      ]
    }
    return line;
  }

  function showStoryView(e) {
    if (e.currentTarget.className.includes('has-story') && e.target.className === "user-img") {
      setStory(showStory(storyInfo, getStoryLine(0)))
      setStoryPage(0)
      setName(name + " show")
    }
  }

  function beforeStory(e) {
    if (e.clientY < 60 || e.clientY > e.currentTarget.clientHeight - 60 || e.target.className === 'menu') return
    if (storyPage === 0) {
      setName('story-view-box')
      setTimeout(() => {
        setStory(null);
      }, 300);
      return;
    }
    setStoryPage(storyPage - 1)
    setStory(showStory(storyList[storyPage - 1], getStoryLine(storyPage - 1)))
  }

  function afterStory(e) {
    if (e.clientY < 60 || e.clientY > e.currentTarget.clientHeight - 60 || e.target.className === 'menu') return
    if (storyPage === storyList.length - 1) {
      setName('story-view-box')
      setTimeout(() => {
        setStory(null);
      }, 300);
      return
    }
    setStoryPage(storyPage + 1)
    setStory(showStory(storyList[storyPage + 1], getStoryLine(storyPage + 1)))
  }

  function storyClickEvents(e) {
    if (e.target.parentNode.parentNode.parentNode.className === 'story-end' ||
      e.target.parentNode.parentNode.parentNode.parentNode.className === 'story-end'
    ) {
      setName('story-view-box')
      setTimeout(() => {
        setStory(null);
      }, 300);
      return;
    }
    if (e.pageX > e.target.clientWidth / 2) {
      afterStory(e)
    } else {
      beforeStory(e)
    }
  }

  return (
    <div className={
      props.hasStory ? 'user-image has-story' : 'user-image'
    } onClick={e => showStoryView(e, { id })}>
      <button className="user-img-btn">
        <img className='user-img' src={props.link} alt="USER_IMG" width="100%" height="100%" decoding="async" loading="lazy" />
      </button>
      <div className={name} onClick={e => storyClickEvents(e)}>
        {story}
      </div>
    </div>
  )
};

export default UserImage;
