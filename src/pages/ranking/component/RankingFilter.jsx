import React, { useEffect, useState, } from 'react';
import '../style/rankingFilter.css';
import IconButton from '../../../components/IconButton';
import { faChevronDown, faClock, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import first from '../../../assets/images/1st.png'
import second from '../../../assets/images/2nd.png'
import third from '../../../assets/images/3rd.png'
import FilterBox from './FilterBox';

const periodes = ['realtime', 'day', 'week', 'month', 'year']
const types = ['BASIC', 'SHORTS']
const criterias = ['view', 'like']
const filters = ['type', 'criteria', 'period']

function RankingFilter(props) {
  const [openFilter, setOpenFilter] = useState(false)
  const [viewFilter, setViewFilter] = useState([])
  const [toggle, setToggle] = useState('toggle-btn')
  const [filterModal, setFilterModal] = useState('filter-view')

  useEffect(() => {
    if (openFilter) {
      setToggle('toggle-btn active')
      setFilterModal('filter-view active')
    } else {
      setToggle('toggle-btn')
      setFilterModal('filter-view')
    }
  }, [openFilter])

  useEffect(() => {
    getViewFilter()
  }, [props.period, props.type, props.criteria])

  function getViewFilter() {
    let filter = []
    filters.forEach(type => {
      filter = [...filter, setFilterBtnBox(type)]
    })
    setViewFilter(filter)
  }

  function setFilterBtnBox(filterType) {
    let tempBox
    if (filterType === 'period') {
      tempBox = <FilterBox type={periodes} getList={props.setPeriod} now={props.period} />
    } else if (filterType === 'type') {
      tempBox = <FilterBox type={types} getList={props.setType} now={props.type} />
    } else {
      tempBox = <FilterBox type={criterias} getList={props.setCriteria} now={props.criteria} />
    }
    return tempBox;
  }

  function resetFilterView() {
  }


  return (
    <div className="rank-filter" onClick={resetFilterView}>
      <div className={toggle} onClick={(() => setOpenFilter(!openFilter))}>
        <IconButton icon={faChevronDown} />
      </div>
      <div className={filterModal}>
        {viewFilter}
      </div>
    </div>
  );
}

export default RankingFilter;