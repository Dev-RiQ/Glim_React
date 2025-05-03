import React, { useEffect, useState } from 'react';
import '../style/ranking.css';
import RankingList from '../component/RankingList';
import RankingFilter from '../component/RankingFilter';
import api from '../../../utils/api';

function Ranking() {
  const [period, setPeriod] = useState('realtime')
  const [type, setType] = useState('BASIC')
  const [criteria, setCriteria] = useState('view')
  const [rankingPage, setRankingPage] = useState([])

  useEffect(() => {
    getRanking()
  }, [period, type, criteria])

  async function getRanking() {
    const body = {
      "period": period,
      "type": type,
      "criteria": criteria
    }
    const res = await api.post('/ranking-board/list', body)
    getRankingPage(res)
  }

  function getRankingPage(res) {
    setRankingPage((
      <div className='ranking-box'>
        <RankingFilter period={period} setPeriod={setPeriod} type={type} setType={setType} criteria={criteria} setCriteria={setCriteria} />
        <RankingList list={res} />
      </div>
    ));
  }

  return (
    <>
      {rankingPage}
    </>
  );
}

export default Ranking;