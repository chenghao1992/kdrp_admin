import React, { PropTypes } from 'react'
import { connect } from 'dva'

import UserList from '../../components/report/listComisMain'
import Search from '../../components/report/search'
import Remarks from '../../components/report/reMarks'
import Btn from '../../components/report/exportButton'

import styles from '../../components/common_list.less'


function CommissionMain ({ location, dispatch, commissionMain }) {
  const { orgTree, orgTreeValue, queryParam, list, loading, pagination, expand, timeValue, isReset, exportBtn } = commissionMain

  const searchProps = {
    onSearch (data) {
      if (!loading) {
        let param = data
        param.page = 1
        param.page_size = pagination.pageSize
        if (param.agency_id.length > 0) {
          param.agency_id = param.agency_id[param.agency_id.length - 1]
        } else {
          param.agency_id = ''
        }
        dispatch({ type: 'commissionMain/search', payload: param })
      }
    },
    expand,
    onToggle (expand) {
      dispatch({
        type: 'commissionMain/onToggle',
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
      dispatch({type: 'commissionMain/changeDate', payload: timeData});
      dispatch({type: 'commissionMain/setReload',payload: true});*/
    },
    onAgencyOk (data) {
      console.log(data)
      /* const param={
        agency_id:data&data.length>1?data[data.length-1]:'',
        orgTreeValue:data?data:[]
      }
      dispatch({type: 'commissionMain/initOrgTreeValue',payload: param})
      dispatch({type: 'commissionMain/setReload',payload: true});*/
    },
    isReset,
    orgTree,
    orgTreeValue,
    timeValue,
  }

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    datetime: queryParam.start_end_time,
    onPageChange (page) {
      let data = queryParam
      data.page = page.current
      data.page_size = page.pageSize
      dispatch({ type: 'commissionMain/search', payload: data })
    },
  }

  const BtnProps = {
    onExport () {
      dispatch({
        type: 'commissionMain/btnExport',
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

CommissionMain.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  commissionMain: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ commissionMain }) => ({ commissionMain }))(CommissionMain)
