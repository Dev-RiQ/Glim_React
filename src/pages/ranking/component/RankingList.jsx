import React, { useEffect, useState, } from 'react';
import '../style/rankingList.css';
import RankingView from './RankingView';

function RankingList(props) {
  const [ranking, setRanking] = useState()

  useEffect(() => {
    getRanking()
  }, [props.list])

  function getRanking() {
    let rankingList = [];
    props.list?.forEach((element, idx) => {
      rankingList = [...rankingList, getRankBox(element, idx)]
    })
    if (!props.list) {
      setRanking([(<div className='no-list'><p>랭킹 게시글 정보가 존재하지 않습니다.</p></div>)])
    } else {
      setRanking(rankingList)
    }
  }

  function getRankBox(element, idx) {
    return (<div>
      <RankingView data={element} rank={idx + 1} type={props.type} />
    </div>)
  }


  return (
    <div className="ranking-list-box">
      {ranking}
    </div>
  );
}

export default RankingList;