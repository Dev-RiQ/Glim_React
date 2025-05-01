import BoardComment from "../component/BoardComment";

function ShowComment(data, setCommentView) {

  return (
    <>
      <BoardComment data={data} setCommentView={setCommentView} />
    </>
  );
}

export default ShowComment;