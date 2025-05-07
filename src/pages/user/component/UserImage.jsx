import { React, useEffect, useState } from 'react';
import "../style/userImage.css"
import showStory from '../../story/hook/ShowStory';
import api from '../../../utils/api';

function UserImage(props) {
  const id = props.id;
  const [story, setStory] = useState(null);
  const [storyPage, setStoryPage] = useState(0);
  const [storyList, setStoryList] = useState([]);
  const [name, setName] = useState('story-view-box');

  function getStoryLine(list, pages) {
    let line = []
    for (let i = 0; i < list.length; i++) {
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

  function endStoryView() {
    setStory(null)
    setStoryList([])
    setName('story-view-box')
    setStoryPage(0)
    setTimeout(() => {
      if (props.setIsView) {
        props.setIsView(false)
      }
    }, 300);
  }

  async function showStoryView(e) {
    if (e.currentTarget.className.includes('has-story')) {
      const res = await api.get(`/story/${id}`)
      res && setStoryList(res)
      res && setStory(showStory(res[0], getStoryLine(res, 0), endStoryView))
      res && setStoryPage(0)
      res && setName(name + " show")
      !res && setTimeout(() => {
        (window.history.back())
      }, 500);
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
    setStory(showStory(storyList[storyPage - 1], getStoryLine(storyList, storyPage - 1), endStoryView))
  }

  function afterStory(e) {
    if (e.clientY < 60 || e.clientY > e.currentTarget.clientHeight - 60 || e.target.className === 'menu') return
    if (storyPage === storyList.length - 1) {
      setName('story-view-box')
      setTimeout(() => {
        setStory(null);
        if (props.setIsView) {
          props.setIsView(false)
        }
      }, 300);
      return
    }
    setStoryPage(storyPage + 1)
    setStory(showStory(storyList[storyPage + 1], getStoryLine(storyList, storyPage + 1), endStoryView))
  }

  function storyClickEvents(e) {
    if (e.target.parentNode.parentNode.parentNode.className === 'story-end' ||
      e.target.parentNode.parentNode.parentNode.parentNode.className === 'story-end'
    ) {
      setName('story-view-box')
      setTimeout(() => {
        setStory(null);
        if (props.setIsView) {
          props.setIsView(false)
        }
      }, 300);
      return;
    }
    if (e.pageX - window.innerWidth / 2 + e.target.clientWidth / 2 > e.target.clientWidth / 2) {
      afterStory(e)
    } else {
      beforeStory(e)
    }
  }

  return (
    <>
      <div className={
        props.hasStory ? 'user-image has-story' : 'user-image'
      } onClick={e => showStoryView(e, { id })}>
        <div className="user-img-btn">
          <img className='user-img' src={props.link} alt="USER_IMG" width="100%" height="100%" decoding="async" loading="lazy" />
        </div>
      </div>
      <div className={name} onClick={e => storyClickEvents(e)}>
        {story}
      </div>
    </>
  )
};

export default UserImage;
