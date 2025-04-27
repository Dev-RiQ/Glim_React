import React, { useEffect, useState, } from 'react';
import '../style/shortsList.css';
import ShowComment from '../../board/hook/ShowComment';
import ShortsVideo from '../component/ShortsVideo';

function ShortsView() {
  const [shorts, setShorts] = useState([]);
  const [comments, setComments] = useState(null);
  const [commentView, setCommentView] = useState('comment-box')

  useEffect(() => {
    if (commentView === 'comment-box') {
      setComments(null);
    }
  }, [commentView])

  function shortsComment(e) {
    setComments(ShowComment(1, setCommentView))
    setCommentView('comment-box show')
    pauseVideo(e)
  }


  useEffect(() => {
    let shortsList = ["test1"
    ];
    let shortsBoxes = [];
    shortsList.forEach((element, idx) => {
      shortsBoxes = [...shortsBoxes, setShortsBox(element, idx)];
    });
    setShorts(shortsBoxes)
  }, []);

  function pauseVideo(e) {
    if (e.currentTarget.parentNode.parentNode.firstChild.played.length === 1) {
      e.currentTarget.parentNode.parentNode.firstChild.pause()
    }
  }

  function setShortsBox(element, idx) {
    return (
      <div className={idx} key={idx}>
        <ShortsVideo link={element} name={element} shortsComment={shortsComment} />
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