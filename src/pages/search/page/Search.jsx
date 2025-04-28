import React from 'react';
import '../style/search.css';
import SearchList from '../component/SearchList';
import SearchInput from '../component/SearchInput';

function Search() {

  return (
    <div>
      <SearchInput />
      <SearchList />
    </div>
  );
}

export default Search;