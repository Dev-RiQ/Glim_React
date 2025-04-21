import React from 'react';
import '../style/searchImg.css';
import test1 from '../../../assets/test/test1.jpg';
import test2 from '../../../assets/test/test2.jpg';
import test3 from '../../../assets/test/test3.jpg';
import test4 from '../../../assets/test/test4.jpg';
import test5 from '../../../assets/test/test5.jpg';
import test6 from '../../../assets/test/test6.jpg';
import test7 from '../../../assets/test/test7.jpg';
import test8 from '../../../assets/test/test8.jpg';
import test9 from '../../../assets/test/test9.jpg';
function SearchImg(props) {
  const testlist = [test1, test2, test3, test4, test5, test6, test7, test8, test9];
  let link = testlist[parseInt(Math.random() * 8.9)];
  return (
    <div className="search-img-box">
      <img className='search-img' src={link} alt="SEARCH-IMG" />
    </div>
  );
}

export default SearchImg;