import React, { PropTypes } from 'react'
import { connect } from 'dva'

import UserList from '../../components/report/listComisSub'
import Search from '../../components/report/searchSub'
import Remarks from '../../components/report/reMarks'
import Btn from '../../components/report/exportButton'

import styles from '../../components/common_list.less'


function CommissionSub ({ location, dispatch, commissionSub }) {
  const { queryParam, list, loading, pagination, expand, timeValue, isReset, exportBtn } = commissionSub

  const searchProps = {
    onSearch (data) {
      if (!loading) {
        let param = data
        param.page = 1
        param.page_size = pagination.pageSize
        param.agency_id = queryParam.agency_id
        dispatch({ type: 'commissionSub/search', payload: param })
      }
    },
    expand,
    onToggle (expand) {
      dispatch({
        type: 'commissionSub/onToggle',
        payload: !expand,
      })
    },
    onDateOk (data) {
      console.log(data)
      /* let dates=data.length>0?(data[0].format('YYYY-MM-DD') + "~" + data[1].format('YYYY-MM-DD')):''
       let timeData={
       timeValue:data,
       start_end_time:dates
       }
       dispatch({type: 'commission/changeDate', payload: timeData});*/
    },
    timeValue,
    isReset,
  }

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      data.agency_id = queryParam.agency_id
      dispatch({ type: 'commissionSub/search', payload: data })
    },
  }

  const BtnProps = {
    onExport () {
      dispatch({
        type: 'commissionSub/btnExport',
        payload: queryParam,
      })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>服务费</h1>
      <Search {...searchProps} />
      <br />
      {
        exportBtn ? <Btn {...BtnProps} /> : ''
      }
      <br />
      <UserList {...userListProps} />
      <br />
      <Remarks />
    </div>
  )
}

CommissionSub.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  commissionSub: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ commissionSub }) => ({ commissionSub }))(CommissionSub)

