import React, { PropTypes } from 'react'
import { connect } from 'dva'

// import Search from '../../components/common/CommonSearch'
import StaffInvestSearch from '../../components/mechanismStaff/investSearch'
import GetDetail from '../../components/mechanismStaff/investGetDetailBtn'
import MechanStaffInvestList from '../../components/mechanismStaff/investList'
import styles from '../../components/common_list.less'

// import {STAFF_INVEST, grid2} from '../../components/mechanismStaff/SearchEnums'

function StaffInvestList ({ dispatch, staffInvestList }) {
  const { isReset, list, loading, expand, pagination, orgTree, timeValue, queryParam } = staffInvestList

  const staffInvestSearchProps = {
    timeValue,
    orgTree,
    expand,
    isReset,
    onToggle () {
      dispatch({
        type: 'staffInvestList/onToggle',
        payload: !expand,
      })
    },
    onSearch (data) {
      let param = data
      param.agency_id = param.agency_id ? param.agency_id[param.agency_id.length - 1] : ''
      param.page = 1
      param.page_size = pagination.pageSize
      dispatch({
        type: 'staffInvestList/onSearch',
        payload: param,
      })
    },
  }

  // const searchProps = {
  //   code: STAFF_INVEST,
  //   grid: grid2,
  //   CascaderList: orgTree,
  //   onSearch (param) {
  //     const rangeTime = param.start_end_time
  //     let dates
  //     if (rangeTime !== undefined) {
  //       dates = rangeTime.length > 0 ? `${rangeTime[0].format('YYYY-MM-DD')}~${rangeTime[1].format('YYYY-MM-DD')}` : ''
  //     } else {
  //       dates = ''
  //     }
  //     param.agency_id = param.agency_id ? param.agency_id[param.agency_id.length - 1] : ''
  //     param.page = 1
  //     param.page_size = pagination.pageSize
  //     dispatch({
  //       type: 'staffInvestList/onSearch',
  //       payload: param,
  //     })
  //   }
  // }

  const getDetailProps = {
    handleClick () {
      dispatch({
        type: 'staffInvestList/getDetil',
      })
    },
  }

  const mechanStaffInvestListProps = {
    loading,
    pagination,
    list,
    onPageChange (page) {
      console.log(page)
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'staffInvestList/onSearch', payload: data })
    },
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>职工投资</h1>
      {/* <Search {...searchProps}/>*/}
      <StaffInvestSearch {...staffInvestSearchProps} />
      <GetDetail {...getDetailProps} />
      <MechanStaffInvestList {...mechanStaffInvestListProps} />
    </div>
  )
}

StaffInvestList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  staffInvestList: PropTypes.object,
}


export default connect(({ staffInvestList }) => ({ staffInvestList }))(StaffInvestList)

