import React, { useEffect, useState } from 'react';
import '../style/ranking.css';
import RankingList from '../component/RankingList';
import RankingFilter from '../component/RankingFilter';

function Ranking() {
  const [period, setPeriod] = useState('day')
  const [type, setType] = useState('BASIC')
  const [criteria, setCriteria] = useState('view')
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    getRanking()
  }, [period, type, criteria])

  function getRanking() {
    console.log('필터변동 후 가져오기')
    setRanking([])
  }

  return (
    <div className='ranking-box'>
      <RankingFilter period={period} setPeriod={setPeriod} type={type} setType={setType} criteria={criteria} setCriteria={setCriteria} />
      <RankingList list={ranking} />
    </div>
  );
}

export default Ranking;