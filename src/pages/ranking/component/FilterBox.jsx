import React, { useEffect, useState, } from 'react';
import '../style/filterBox.css';

function FilterBox(props) {
  const [filterView, setFilterView] = useState([])

  useEffect(() => {
    setBox()
  }, [props.now])

  function setViewName(element) {
    switch (element) {
      case 'BASIC': return '게시판'
      case 'SHORTS': return '숏츠'
      case 'view': return '조회수'
      case 'like': return '좋아요'
      case 'day': return '일간'
      case 'week': return '주간'
      case 'month': return '월간'
      case 'year': return '연간'
      default: return ''
    }
  }

  function setBox() {
    let filterBox = []
    props.type.forEach(element => {
      let btnActive = 'filter-btn'
      if (element === props.now) {
        btnActive += ' active'
      }
      filterBox = [...filterBox, (
        <div className={btnActive} onClick={() => props.getList(element)}>
          {setViewName(element)}
        </div>
      )]
    })
    setFilterView(filterBox)
  }

  return (
    <div className="rank-filter-box">
      {filterView}
    </div>
  );
}

export default FilterBox;