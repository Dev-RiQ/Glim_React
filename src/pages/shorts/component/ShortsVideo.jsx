import React, { useEffect, useState } from 'react';
import '../style/shortsVideo.css';
import video1 from '../../../assets/test/video1.mp4';
import video2 from '../../../assets/test/video2.mp4';
import thumbnail from '../../../assets/test/test2.jpg'
import IconButton from '../../../components/IconButton';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import UserPortion from '../../user/component/UserPortion';
function ShortsVideo(props) {
  const testlist = [video1, video2];
  const [link, setLink] = useState(null);
  const [time, setTime] = useState(0);
  const [video, setVideo] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [interval, setTimeInterval] = useState(null);

  useEffect(() => {
    setLink(testlist[parseInt(Math.random() * 1.9)]);
  }, [])

  let touchEnd = 0;
  let totalLength = 0;

  function onTouch(e) {
    if (!e.currentTarget.parentNode.parentNode.firstChild.paused) {
      e.currentTarget.parentNode.parentNode.firstChild.pause();
    }
  }

  function endTouch(e) {
    if (e.currentTarget.parentNode.parentNode.firstChild.paused) {
      if (e.touches)
        touchEnd = e.changedTouches[0].clientX;
      else
        touchEnd = e.clientX;
      setTime(videoDuration * (touchEnd / e.currentTarget.clientWidth));
      totalLength = videoDuration * (touchEnd / e.currentTarget.clientWidth);
      setVideo(e.currentTarget.parentNode.parentNode.firstChild);
      setTimeout(() => {
        video.play();
        video.currentTime = totalLength;
      }, 10);
    }
  }

  function control(e) {
    if (e.target?.paused) {
      e.target.play();
      e.target.muted = false;
    }
    else
      e.target.pause();
  }

  function videoPlay(e) {
    setVideo(e.target)
    setVideoDuration(e.target.duration)
    const tempInterval = setInterval(() => {
      setTime(100 * (e.target.currentTime / e.target.duration))
    }, 100)
    setTimeInterval(tempInterval);
  }
  function videoPause(e) {
    clearInterval(interval)
    setTimeInterval(null);
  }

  return (
    <div className="shorts-video-box">
      <video className='shorts-video' poster={thumbnail} src={link} playsInline loop width="100%" height="100%" decoding="async" loading="lazy" onClick={((e) => control(e))} onPlay={e => videoPlay(e)} onPause={e => videoPause(e)} />
      <div className='shorts-info-box'>
        <div className='shorts-user-box'>
          <UserPortion />
        </div>
        <div className='shorts-content-box'>
          <p className='shorts-content'>릴스다 이말이야~</p>
        </div>
        <div className='shorts-controller' onMouseUp={e => endTouch(e)} onMouseDown={e => onTouch(e)} onTouchStart={e => onTouch(e)} onTouchEnd={e => endTouch(e)}>
          <progress min="0" value={time} max="100" />
        </div>
      </div>
      <div className='shorts-button-box'>
        <div>
          <IconButton icon={faHeart} />
          <p>9.9만</p>
        </div>
        <div>
          <IconButton icon={faComment} />
          <p>9.9만</p>
        </div>
        <div>
          <IconButton icon={faShare} />
          <p>9.9만</p>
        </div>
      </div>
    </div>
  );
}

export default ShortsVideo;