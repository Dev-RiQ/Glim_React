import React, { useEffect, useState, } from 'react';
import '../style/rankingList.css';
import testU from '../../../assets/test/user1.jpg'
import testB from '../../../assets/test/test2.jpg'
import RankingView from './RankingView';

function RankingList() {
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    getRanking()
  }, [])

  function getRanking() {
    let test = [
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 ..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
      { "boardId": 2, "userId": "1", "nickname": "test1", "userImg": testU, "link": testB, "content": "경치가 좋은 한적한 숲 속에서 여유로운 코히 한쟌..!", "viewCount": 180, "likeCount": 35 },
    ]
    let rankingList = [];
    test.forEach((element, idx) => {
      rankingList = [...rankingList, getRankBox(element, idx)]
    })
    setRanking(rankingList)
  }

  function getRankBox(element, idx) {
    return (<div>
      <RankingView data={element} rank={idx + 1} />
    </div>)
  }


  return (
    <div className="ranking-list-box">
      {ranking}
    </div>
  );
}

export default RankingList;