import React, { useEffect, useState } from 'react';
import BoardMiddle from './BoardMiddle';
import UserPortion from '../../user/component/UserPortion';
import BoardContent from './BoardContent';
import BoardImage from './BoardImage';
import ShowComment from '../hook/ShowComment';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function BoardInfo(props) {
  const data = props.data;
  const [comments, setComments] = useState(null);
  const [commentView, setCommentView] = useState('comment-box')
  const [subTitle, setSubTitle] = useState('')
  const [isLike, setIsLike] = useState(data?.isLike)
  const [target, setTarget] = useState(null)

  useEffect(() => {
    if (data?.isAd) {
      setSubTitle(`광고`)
    } else if (data?.bgm?.title) {
      setSubTitle(`♬ ${data.bgm.title}-${data.bgm.artist}`)
    } else if (data?.location) {
      setSubTitle(`${data.location}`)
    }
  }, [])

  useEffect(() => {
    if (commentView === 'comment-box') {
      setComments(null);
    } else {
      target?.pause()
    }
  }, [commentView])

  function boardComment(e) {
    if (!data.commentable) {
      ShowToast('error', '댓글 사용이 중지된 게시글입니다.')
      return;
    }
    setComments(ShowComment(data, setCommentView))
    setCommentView('comment-box show')

  }

  async function boardLike() {
    const res = isLike ? await api.delete(`/boardLike/${data.id}`)
      : await api.post(`/boardLike/${data.id}`)
    if (!isLike) {
      api.post('/tags/view', data.tags)
      api.post(`/boardView/${data.id}`)
    }
    res && setIsLike(!isLike)
  }

  function musicStart(e) {
    if (e.currentTarget.firstChild.toString().includes('Audio') && !comments) {
      if (e.currentTarget.firstChild.paused) {
        e.currentTarget.firstChild.volume = 0.3
        e.currentTarget.firstChild.play()
      }
    }
  }
  function musicPlaying(e) {
    const target = e.currentTarget;
    setTarget(target);
    const interval = setInterval(() => {
      const rect = target.parentNode.getBoundingClientRect()
      if (rect.top < -200 || rect.top > 500) {
        target.pause()
        clearInterval(interval);
      }
    }, 100);
  }

  return (
    <div className="board-box" onTouchStart={musicStart} onWheel={musicStart}>
      {data.bgm ?
        <audio src={data.bgm.fileName} loop onPlaying={musicPlaying} />
        : <></>}
      <UserPortion user={data?.user} subTitle={subTitle} type={'board'} />
      <BoardImage imgs={data?.img} boardLike={boardLike} />
      <BoardMiddle data={data} isLike={isLike} boardLike={boardLike} boardComment={boardComment} comments={comments} commentView={commentView} />
      <BoardContent data={data} boardComment={boardComment} />
    </div>
  );
}

export default BoardInfo;
