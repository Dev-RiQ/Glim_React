import React, { useEffect, useState } from 'react';
import '../style/boardComment.css';
import IconButton from '../../../components/IconButton';
import { faComment, faX } from '@fortawesome/free-solid-svg-icons';
import UserComment from './UserComment';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';

function BoardComment(props) {
  const data = props.data;
  const [commentList, setCommentList] = useState([])
  const [offset, setOffset] = useState(0)
  const [replyOffset, setReplyOffset] = useState(0)
  const [commentInput, setCommentInput] = useState('');
  const [replyId, setReplyId] = useState(0);
  const [replyTarget, setReplyTarget] = useState(null);

  useEffect(() => {
    getBoardList();
  }, []);

  async function getBoardList() {
    const res = await api.get(`/comment/${data.id}` + (offset !== 0 ? `/${offset}` : ''))
    let commentBoxes = [];
    if (commentList.length === 0) {
      commentBoxes = [...commentBoxes, setComment(data, false)]
    }
    res?.forEach(element => {
      commentBoxes = [...commentBoxes, setComment(element, true)];
    });
    res && setCommentList([...commentList, commentBoxes])
    res && setOffset(offset + res[commentBoxes.length - 1].id)
  }

  function setComment(element, isComment) {
    return (<div className='comment-user-box' key={element.id}>
      <UserComment data={element} isComment={isComment} addReply={addReply} loadReply={loadReply} />
    </div>)
  }

  function addReply(target, id, nickname) {
    ShowToast('success', `@${nickname}님의 댓글에 답글 달기`)
    target.parentNode.parentNode.nextSibling.firstChild.focus()
    setReplyId(id)
  }
  async function loadReply(target, id) {
    const res = await api.get(`/comment/reply/${id}` + replyOffset !== 0 ? `/${replyOffset}` : '')
    res && (target.appendChild(res.forEach(element => setComment(element, true))))
    if (replyOffset === 0) {
      res && (target.parentNode.appendChild(<p onClick={() => loadReply(target, id)}>답글 더보기</p>))
    }
    res && setReplyOffset(res[res.length - 1].id)
    res && setReplyTarget(target)
  }

  function exitComment(e) {
    props.setCommentView('comment-box')
  }

  function getCommentInupt(e) {
    if (e.target.value.length > 255) {
      ShowToast('error', '댓글은 최대 255자까지 입력가능합니다.')
      e.target.value = e.target.value.substring(0, 255)
      return;
    }
    setCommentInput(e.target.value);
  }

  async function addComment(e) {
    const body = {
      "boardId": data.id,
      "content": commentInput,
      "replyId": replyId
    }
    const res = await api.post('/comment', body);
    if (res) {
      if (replyTarget) {
        (replyTarget.appendChild(setComment(res, true)))
      } else {
        setCommentList([...commentList, setComment(res, true)])
      }
      setReplyId(0)
      setReplyTarget(null)
      api.post('/tags/view', data.tags)
      api.post(`/boardView/${data.id}`)

    } else {
      ShowToast('error', '댓글 등록에 실패했습니다.')
    }
  }


  return (
    <div className="board-comment-box">
      <div className='comment-header'>
        <span className='comment-title'>댓글</span>
      </div>
      <div className='comment-close' onClick={e => exitComment(e)} >
        <IconButton icon={faX} />
      </div>
      <div className='comment-list-box'>
        {commentList}
      </div>
      <div className='comment-footer'>
        <input className='comment-input' type="text" spellCheck="false" placeholder='댓글을 입력하세요.' onChange={getCommentInupt} />
        <div className='comment-enter' onClick={e => addComment(e)}>
          <IconButton icon={faComment} />
        </div>
      </div>
    </div >
  );
}

export default BoardComment;
