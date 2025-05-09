import React from 'react';
import '../style/searchImg.css';
import IconButton from '../../../components/IconButton';
import { faAd, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';

function SearchImg(props) {
  return (
    <div className="search-img-box">
      <div className='search-type-icon-box'>
        {props.type === "BASIC" ?
          <IconButton icon={faImage} />
          : props.type === "SHORTS" ?
            <IconButton icon={faVideo} />
            : <IconButton icon={faAd} />
        }
      </div>
      <img className='search-img' src={props.link} alt="SEARCH-IMG" width="100%" height="100%" decoding="async" loading="lazy" />
    </div>
  );
}

export default SearchImg;