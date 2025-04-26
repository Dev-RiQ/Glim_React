import BoardComment from "../component/BoardComment";

function ShowComment(boardInfo, setCommentView) {

  return (
    <>
      <BoardComment info={boardInfo} setCommentView={setCommentView} />
    </>
  );
}

export default ShowComment;