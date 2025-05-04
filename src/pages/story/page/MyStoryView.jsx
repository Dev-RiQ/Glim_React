import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import '../style/myStoryView.css';
import SearchImg from '../../search/component/SearchImg';
import { useParams } from 'react-router-dom';
import StoryView from '../component/StoryView';

function MyStoryView() {
  const id = useParams().id;
  const [story, setStory] = useState([])

  useEffect(() => {
    getStory()
  }, [])

  function back() {
    window.history.back();
  }

  async function getStory() {
    const res = await api.get(`/story/view/${id}`)
    res && setStory(<StoryView data={res} endStoryView={back} />)
  }

  return (
    <div className='my-story'>
      {story}
    </div>
  );
}

export default MyStoryView;