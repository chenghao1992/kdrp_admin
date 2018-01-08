import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { Link } from 'dva/router'
import styles from './list.less'
import { COST_STATUS } from '../../utils/enums'
// import { formatMoney } from '../../utils/index'
// import classnames from 'classnames'
// import TableBodyWrapper from '../common/TableBodyWrapper'

function list ({ loading, dataSource, pagination, onPageChange }) {
  const columns = [
    {
      title: '月份',
      dataIndex: 'bill_month',
      key: 'bill_month',
      render (text, record) {
        return <Link to={{ pathname: '/servicecharge/extraDetail', query: { bill_uuid: record.id } }}>{text}</Link>
      },
    }, {
      title: '待结算服务费',
      dataIndex: 'accrued_amount',
      key: 'accrued_amount',
      render: (text, record) => {
        if (record.status === 'checking' || record.status === 'check_refused') {
          return (<span>--</span>)
        }
        return (<span>--</span>)
      },
    }, {
      title: '已结算待发放服务费',
      dataIndex: 'accounting_amount',
      key: 'accounting_amount',
      render: (text, record) => {
        const recordStatus = ['check_agreed', 'pay_agreed', 'pay_refused', 'pay_fail']
        if (recordStatus.indexOf(record.status) === -1) {
          return (<span>--</span>)
        }
        return (<span>--</span>)
      },
    }, {
      title: '已发放服务费',
      dataIndex: 'actally_amount',
      key: 'actally_amount',
      render: (text, record) => {
        if (record.status === 'pay_success') {
          return (<span>--</span>)
        }
        return (<span>--</span>)
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{COST_STATUS[text]}</span>,
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render (text, record) {
        return <Link to={{ pathname: '/servicecharge/extraDetail', query: { bill_uuid: record.id } }}>查看明细</Link>
      },
    },
  ]

  console.log(dataSource)

  return (
    <div className={styles.normal}>
      <Table
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  location: PropTypes.object,
}

export default list
