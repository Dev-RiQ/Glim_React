import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import '../style/myStory.css';
import SearchImg from '../../search/component/SearchImg';

function MyStory() {
  const [story, setStory] = useState([])
  const [offset, setOffset] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSaveList()
  }, [])

  async function scroll(e) {
    if (offset === 0) return;
    const rect = e.currentTarget.getBoundingClientRect()
    if (rect.bottom < window.innerHeight + 500) {
      if (isLoaded) return;
      setIsLoaded(true)
      await getSaveList()
      setIsLoaded(false)
    }
  }

  async function getSaveList() {
    const res = await api.get('/story/my' + (offset !== 0 ? `/${offset}` : ''))
    let storyList = []
    res?.forEach(element => {
      storyList = [...storyList, setSaveBox(element)]
    })
    res && setStory(storyList);
    res && setOffset(res[res.length - 1].id + offset);
    !res && offset === 0 && setStory([(<div className='no-list'><p>업로드한 스토리가 존재하지 않습니다.</p></div>)])
    !res && setOffset(0)
  }

  function setSaveBox(element) {
    return (
      <div key={element.id} onClick={() => window.location.href = `/story/${element.id}`}>
        <SearchImg link={element.img} type='BASIC' />
      </div>
    )
  }
  return (
    <div className='my-story-box' onWheel={scroll} onTouchMove={scroll}>
      {story}
    </div>
  );
}

export default MyStory;