/**
 * Created by xiaoys on 2017/11/29.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import styles from '../../components/common_list.less'

import Search from '../../components/common/CommonSearch'
import ExportBtn from '../../components/report/exportButton'
import List from '../../components/common/CommonList'
import Remarks from '../../components/report/reMarks'

import { grid2, REPORT_STAFF_ORGANIZATION } from '../../components/report/SearchEnums'
import { STAFF_QRGANIZATION } from '../../components/report/ListEnums'

function ReportStaffOrganization ({ dispatch, reportStaffOrganization }) {
  const { pagination, tree, list, searchCode } = reportStaffOrganization

  console.log(list)

  const btnProps = {
    onExport () {
      dispatch({
        type: 'reportStaffOrganization/onExport',
        payload: searchCode,
      })
    },
  }

  const searchProps = {
    code: REPORT_STAFF_ORGANIZATION,
    grid: grid2,
    CascaderList: tree,
    onSearch (params) {
      const rangeTime = params.start_end_time
      let dates
      if (rangeTime !== undefined) {
        dates = rangeTime.length > 0 ? `${rangeTime[0].format('YYYY-MM-DD')}~${rangeTime[1].format('YYYY-MM-DD')}` : ''
      } else {
        dates = ''
      }
      params.start_end_time = dates
      params.agency_id = params.agency_id ? params.agency_id[params.agency_id.length - 1] : ''
      dispatch({
        type: 'reportStaffOrganization/search',
        payload: params,
      })
    },
  }

  const lsitProps = {
    commonLists: list,
    loading: false,
    pagination,
    rowKeys: 'id',
    columns: STAFF_QRGANIZATION,
    onPageChange (page) {
      let data = searchCode
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'reportStaffOrganization/investList', payload: data })
    },
  }


  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>职工投资统计-按组织</h1>
      <Search {...searchProps} />
      <ExportBtn {...btnProps} />
      <List {...lsitProps} />
      <br />
      <Remarks />
    </div>
  )
}

ReportStaffOrganization.propTypes = {
  reportStaffOrganization: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}


export default connect(({ reportStaffOrganization }) => ({ reportStaffOrganization }))(ReportStaffOrganization)
