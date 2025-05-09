import React, { useEffect, useState } from 'react';
import '../style/boardComment.css';
import IconButton from '../../../components/IconButton';
import { faComment, faX } from '@fortawesome/free-solid-svg-icons';
import UserComment from './UserComment';
import api from '../../../utils/api';
import ShowToast from '../../main/hook/ShowToast';
import ReplyComment from './ReplyComment';

function BoardComment(props) {
  const data = props.data;
  const [commentList, setCommentList] = useState([])
  const [offset, setOffset] = useState(0)
  const [commentInput, setCommentInput] = useState('');
  const [replyId, setReplyId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [replyTarget, setReplyTarget] = useState(() => { })
  const [hasComment, setHasComment] = useState(false);
  const [myComment, setMyComment] = useState(null)

  useEffect(() => {
    getBoardList();
  }, []);

  async function scroll(e) {
    if (offset === 0) return;
    const rect = e.currentTarget.getBoundingClientRect()
    if (rect.bottom < window.innerHeight + 1000) {
      if (isLoaded) return;
      setIsLoaded(true)
      await getBoardList()
      setIsLoaded(false)
    }
  }

  async function getBoardList() {
    const res = await api.get(`/comment/${data.id}` + (offset !== 0 ? `/${offset}` : ''))
    let commentBoxes = [];
    if (commentList.length === 0) {
      commentBoxes = [...commentBoxes, setComment(data, false)]
      setMyComment(setComment(data, false))
    }
    res?.forEach(element => {
      commentBoxes = [...commentBoxes, setComment(element, true)];
    });
    res && setCommentList([...commentList, commentBoxes])
    res && setOffset(res[commentBoxes.length - 2].id)
    res && setHasComment(true)
    !res && offset === 0 && setCommentList([commentBoxes, (<div className='no-list'><p>작성된 댓글이 존재하지 않습니다.</p></div>)])
    !res && setOffset(0)
  }

  function setComment(element, isComment) {
    return (<div className='comment-user-box' key={element.id}>
      <UserComment data={element} isComment={isComment} addReply={addReply} />
    </div>)
  }

  function addReply(target, id, nickname, setReply, reply) {
    ShowToast('success', `@${nickname}님의 댓글에 답글 달기`)
    setReplyId(id)
    setReplyTarget(() => (e) => setReply([...reply, e]))
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
    console.log(replyTarget)
    const body = {
      "boardId": data.id,
      "content": commentInput,
      "replyId": replyId
    }
    const value = e.currentTarget;
    const res = await api.post('/comment', body);
    if (res) {
      value.previousSibling.value = ''
      if (replyTarget) {
        replyTarget(<ReplyComment data={res} />)
      } else {
        if (!hasComment) {
          setCommentList([myComment, setComment(res, true)])
          setHasComment(true);
        } else {
          setCommentList([...commentList, setComment(res, true)])
        }
      }
      setReplyId(0)
      setReplyTarget(() => { })
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
      <div className='comment-list-box' onWheel={scroll} onTouchMove={scroll}>
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
