import React, { useEffect, useState, } from 'react';
import '../style/searchList.css';
import SearchImg from './SearchImg';

function SearchList() {
  const [search, setSearchs] = useState([]);

  useEffect(() => {
    let searchList = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"
      , "test11", "test12", "test13", "test14", "test15", "test16", "test17", "test18"
      , "test21", "test22", "test23", "test24", "test25", "test26", "test27", "test28"
      , "test31", "test32", "test33", "test34", "test35", "test36", "test37", "test38"
    ];
    let searchBoxes = [];
    searchList.forEach(element => {
      searchBoxes = [...searchBoxes, setSearchBox(element)];
    });
    setSearchs(searchBoxes)
  }, []);

  function setSearchBox(element) {
    return (
      <div key={element}>
        <SearchImg link={element} name={element} />
      </div>
    )
  }

  return (
    <div className="search-list-box">
      {search}
    </div>
  );
}

export default SearchList;