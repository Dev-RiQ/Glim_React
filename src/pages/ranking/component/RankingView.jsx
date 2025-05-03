import React, { useEffect, useState, } from 'react';
import '../style/rankingView.css';
import IconButton from '../../../components/IconButton';
import { faClock, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import first from '../../../assets/images/1st.png'
import second from '../../../assets/images/2nd.png'
import third from '../../../assets/images/3rd.png'

function RankingView(props) {
  const data = props.data;
  const [rankBox, setRankBox] = useState('rank-box')

  useEffect(() => {
    if (props.rank === 1) {
      setRankBox(rankBox + ' first')
    } else if (props.rank === 2) {
      setRankBox(rankBox + ' second')
    } else if (props.rank === 3) {
      setRankBox(rankBox + ' third')
    }
  }, [])


  return (
    <div className="rank" onClick={() => window.location.href = '/board/1'}>
      <div className={rankBox}>
        <div className='rank-no'>
          {props.rank === 1 ? <>{props.rank}<img className='rank-medal' src={first} alt="1st" width="40px" height="40px" decoding="async" loading="lazy" /></> :
            <>{props.rank === 2 ? <>{props.rank}<img className='rank-medal' src={second} alt="2nd" width="40px" height="40px" decoding="async" loading="lazy" /></> :
              <>{props.rank === 3 ? <>{props.rank}<img className='rank-medal' src={third} alt="3rd" width="40px" height="40px" decoding="async" loading="lazy" /></> :
                <>{props.rank}</>}</>}</>}
        </div>
        <div className='rank-board-img'>
          <img src={data.contentImgUrl} alt="rank-image" />
        </div>
        <div className='rank-info'>
          <div className='rank-board-content'>
            {data.content}
          </div>
          <div className='count-box'>
            <div className='rank-count-box'>
              <IconButton icon={faEye} />
              {data.viewCount}
            </div>
            <div className='rank-count-box'>
              <IconButton icon={faHeart} />
              {data.likeCount}
            </div>
            <div className='rank-count-box'>
              <IconButton icon={faClock} />
              {'3일 전'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingView;