import React, { useEffect, useState } from 'react';
import '../style/boardImage.css';
import IconButton from '../../../components/IconButton';
import { faCircle, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

function MusicPlay(props) {
  const [musicStatus, setMusicStatus] = useState(<IconButton icon={faPlay} />)
  const [musicPlay, setMusicPlay] = useState([])

  useEffect(() => {
    if (musicPlay.length > 0) {
      if (musicPlay[0].paused) {
        musicPlay[0].play()
        setMusicStatus(<IconButton icon={faPause} />)
      } else {
        musicPlay[0].pause()
        musicPlay[0].currentTime = 0;
        setMusicStatus(<IconButton icon={faPlay} />)
      }
    }
  }, [musicPlay])

  function playMusic(e) {
    setMusicPlay([e.currentTarget.firstChild])
  }

  return (
    <div className='music-play-box' onClick={playMusic}>
      <audio src={props.music} />
      {musicStatus}
    </div>
  );
}

export default MusicPlay;
