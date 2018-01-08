import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import { Link } from 'dva/router'
import styles from '../../components/common_list.less'
import { COMPANY_STATUS } from '../../utils/enums'

import Remarks from '../../components/report/reMarks'


function Performance ({ dispatch, performance }) {
  const { list, loading, pagination } = performance

  const performanceListProps = {
    dataSource: list,
    loading,
    pagination,
  }

  const columns = [{
    title: '机构代码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '机构名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '商务经理',
    dataIndex: 'leader_name',
    key: 'leader_name',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      return COMPANY_STATUS[text]
    },
  }, {
    title: '报表',
    key: 'report',
    render: (text, { id }) => (
      <span>
        <Link to={{ pathname: '/dashboard', query: { agency_id: id } }}>Dashboard</Link>
        <span className="ant-divider" />
        <Link to={{ pathname: '/report/report_agency', query: { agency_id: id } }}>服务费报表</Link>
      </span>
    ),
  }]

  const pageChange = function (page) {
    let payload = {}
    payload.page = page.current
    payload.page_size = page.pageSize
    dispatch({ type: 'performance/query', payload })
  }

  return (
    <div className="content-inner">
      <h1 className={styles.common_header_h1}>业绩报表</h1>
      <Table
        bordered
        rowKey="id"
        columns={columns}
        onChange={pageChange}
        {...performanceListProps}
      />
      <br />
      <Remarks />
    </div>
  )
}

Performance.propTypes = {
  dispatch: PropTypes.func,
  performance: PropTypes.object,
}

export default connect(({ performance }) => ({ performance }))(Performance)
