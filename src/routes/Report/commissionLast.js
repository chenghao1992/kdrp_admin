import React, { PropTypes } from 'react'
import { connect } from 'dva'

import UserList from '../../components/report/listComisLast'
import Search from '../../components/report/searchSub'
import Remarks from '../../components/report/reMarks'

import styles from '../../components/common_list.less'


function CommissionLast ({ location, dispatch, commissionLast }) {
  const { list, loading, expand, isReset, timeValue } = commissionLast

  const searchProps = {
    onSearch (data) {
      if (!loading) {
        let param = data
        dispatch({ type: 'commissionLast/search', payload: param })
      }
    },
    expand,
    timeValue,
    onToggle (expand) {
      dispatch({
        type: 'commissionLast/onToggle',
        payload: !expand,
      })
    },
    onDateOk (data) {
      console.log(data)
    },
    isReset,
  }

  const userListProps = {
    dataSource: list,
    loading,
    location,
    /* pagination: pagination,
    onPageChange (page) {
      const { query, pathname } = location
      let data=queryParam
      data.page=page.current
      data.page_size=page.pageSize
      dispatch({type: 'commissionLast/search', payload: data});
    }*/
  }


  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>服务费</h1>
      <Search {...searchProps} />
      <br />
      <UserList {...userListProps} />
      <br />
      <Remarks />
    </div>
  )
}

CommissionLast.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  commissionLast: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ commissionLast }) => ({ commissionLast }))(CommissionLast)
