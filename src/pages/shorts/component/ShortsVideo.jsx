import React, { useEffect, useState } from 'react';
import '../style/shortsVideo.css';
import video1 from '../../../assets/test/video1.mp4';
import video2 from '../../../assets/test/video2.mp4';
import thumbnail from '../../../assets/test/test2.jpg'
function ShortsVideo(props) {
  const testlist = [video1, video2];
  const [link, setLink] = useState(null);

  useEffect(() => {
    setLink(testlist[parseInt(Math.random() * 1.9)]);
  }, [])

  function control(e) {
    if (e.target.paused) {
      e.target.play();
      e.target.muted = false;
    }
    else
      e.target.pause();
  }

  return (
    <div className="shorts-video-box">
      <video className='shorts-video' poster={thumbnail} src={link} playsInline loop width="100%" height="100%" decoding="async" loading="lazy" onClick={((e) => control(e))} />
    </div>
  );
}

export default ShortsVideo;