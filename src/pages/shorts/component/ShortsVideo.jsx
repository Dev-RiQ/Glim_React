import React, { useState } from 'react';
import '../style/shortsVideo.css';
import IconButton from '../../../components/IconButton';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import UserPortion from '../../user/component/UserPortion';
import api from '../../../utils/api';

function ShortsVideo(props) {
  const data = props.data;
  const [time, setTime] = useState(0);
  const [video, setVideo] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [interval, setTimeInterval] = useState(null);
  const [isLike, setIsLike] = useState(data?.isLike)

  let touchEnd = 0;
  let totalLength = 0;

  function onTouch(e) {
    if (!e.currentTarget?.parentNode?.parentNode?.firstChild?.paused) {
      e.currentTarget.parentNode.parentNode.firstChild.pause();
    }
  }

  function endTouch(e) {
    if (e.currentTarget?.parentNode?.parentNode?.firstChild?.paused) {
      if (e.touches)
        touchEnd = e.changedTouches[0].clientX - window.innerWidth / 2 + e.target.clientWidth / 2;
      else
        touchEnd = e.clientX - window.innerWidth / 2 + e.target.clientWidth / 2;
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
    if (e.target.className !== 'shorts-video') return;
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

  async function likeShorts() {
    const res = isLike ? await api.delete(`/boardLike/${data.id}`)
      : await api.post(`/boardLike/${data.id}`)
    if (res && isLike) {
      api.post('/tags/view', data.tags)
      api.post(`/boardView/${data.id}`)
    }
    res && setIsLike(!isLike)
    res && (data.likeCount = parseInt(data.likeCount) + (isLike ? -1 : 1))
  }

  return (
    <>
      {props.pre ?
        <div className="shorts-video-box">
          <video className='shorts-video' src={props.video} playsInline loop width="100%" height="100%" decoding="async" loading="lazy" onClick={((e) => control(e))} onPlay={e => videoPlay(e)} onPause={e => videoPause(e)} />
        </div>
        : <div className="shorts-video-box">
          <video className='shorts-video' poster={data?.img[1]} src={data?.img[0]} playsInline loop width="100%" height="100%" decoding="async" loading="lazy" onClick={((e) => control(e))} onPlay={e => videoPlay(e)} onPause={e => videoPause(e)} />
          <div className='shorts-info-box'>
            <div className='shorts-user-box'>
              <UserPortion user={data.user} id={data.id} subTitle={data.createdAt} type={'board'} />
            </div>
            <div className='shorts-content-box'>
              <p className='shorts-content'>{data.content}</p>
            </div>
            <div className='shorts-controller' onMouseUp={e => endTouch(e)} onMouseDown={e => onTouch(e)} onTouchStart={e => onTouch(e)} onTouchEnd={e => endTouch(e)}>
              <progress min="0" value={time} max="100" />
            </div>
          </div>
          <div className='shorts-button-box'>
            <div onClick={likeShorts}>
              {isLike ?
                <IconButton icon={faHeart} check="like" />
                : <IconButton icon={faHeart} />
              }
              <p>{data.viewLikes ?
                data.likeCount
                : '좋아요'
              }</p>
            </div>
            <div onClick={e => props.shortsComment(e, data)}>
              <IconButton icon={faComment} />
              <p>{data.commentable ?
                data.commentCount
                : '댓글 중지'
              }</p>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ShortsVideo;