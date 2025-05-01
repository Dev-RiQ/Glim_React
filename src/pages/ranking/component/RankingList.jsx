import React, { useEffect, useState, } from 'react';
import '../style/rankingList.css';
import RankingView from './RankingView';

function RankingList(props) {
  const [ranking, setRanking] = useState(props.list)

  useEffect(() => {
    getRanking()
  }, [props.list])

  function getRanking() {
    let rankingList = [];
    props.list.forEach((element, idx) => {
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