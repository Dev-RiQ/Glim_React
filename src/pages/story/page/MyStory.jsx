import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import SearchImg from '../../search/component/SearchImg';

function MyStory() {
  const [story, setStory] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    getSaveList()
  }, [])

  async function getSaveList() {
    const res = await api.get('/story/my' + (offset !== 0 ? `/${offset}` : ''))
    let storyList = []
    res?.forEach(element => {
      storyList = [...storyList, setSaveBox(element)]
    })
    res && setStory(storyList);
    res && setOffset(res[res.length - 1] + offset);
  }

  function setSaveBox(element) {
    return (
      <div key={element.id} onClick={() => window.location.href = `/story/${element.id}`}>
        <SearchImg link={element.img} />
      </div>
    )
  }
  return (
    <>
      {story}
    </>
  );
}

export default MyStory;