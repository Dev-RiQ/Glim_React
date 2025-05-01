import React, { useEffect, useState, } from 'react';
import '../style/shortsList.css';
import ShowComment from '../../board/hook/ShowComment';
import ShortsVideo from '../component/ShortsVideo';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function ShortsView(props) {
  const [shorts, setShorts] = useState([]);
  const [comments, setComments] = useState(null);
  const [commentView, setCommentView] = useState('comment-box')

  useEffect(() => {
    if (commentView === 'comment-box') {
      setComments(null);
    }
  }, [commentView])

  function shortsComment(e) {
    if (!shorts.commentable) {
      ShowToast('error', '댓글 사용이 중지된 게시글입니다.')
      return;
    }
    setComments(ShowComment(1, setCommentView))
    setCommentView('comment-box show')
    pauseVideo(e)
  }


  useEffect(() => {
    getShorts()
  }, []);

  async function getShorts() {
    const res = await api.get(`/board/shorts/${props.id}`)
    res && setShortsBox(res)
    res && setShorts(res)
  }

  function pauseVideo(e) {
    if (e.currentTarget.parentNode.parentNode.firstChild.played.length === 1) {
      e.currentTarget.parentNode.parentNode.firstChild.pause()
    }
  }

  function setShortsBox(element) {
    return (
      <div>
        <ShortsVideo data={element} shortsComment={shortsComment} />
      </div>
    )
  }

  return (
    <>
      <div className="shorts-list-box">
        {shorts}
      </div>
      <div className={commentView}>
        {comments}
      </div>
    </>
  );
}

export default ShortsView;