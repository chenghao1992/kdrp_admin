import React, { PropTypes } from 'react'
import { Table } from 'antd'
import styles from './list.less'
import { COST_STATUS } from '../../utils/enums'
import { formatMoney } from '../../utils/index'
// import { Link } from 'dva/router'
// import classnames from 'classnames'
// import TableBodyWrapper from '../common/TableBodyWrapper'

function detailList ({ loading, dataSource, pagination, onPageChange }) {
  const columns = [
    {
      title: '客户账号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '相关标的',
      dataIndex: 'loan_title',
      key: 'loan_title',
    }, {
      title: '服务费比例',
      dataIndex: 'rate',
      key: 'rate',
      render: (text) => <span>{text}%</span>,
    }, {
      title: '服务费金额',
      dataIndex: 'fee_amount',
      key: 'fee_amount',
      render: (text) => <span>
              {
                text === '-' ? <span>{text}</span> : <span>¥{formatMoney(text)}</span>
              }
              </span>,
    }, {
      title: '客户投标时间',
      dataIndex: 'invest_time',
      key: 'invest_time',
    }, {
      title: '标的放款时间',
      dataIndex: 'loan_time',
      key: 'loan_time',
    }, {
      title: '服务费流水生成时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '服务费发放时间',
      dataIndex: 'pay_time',
      key: 'pay_time',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{COST_STATUS[text]}</span>,
    },
  ]

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

detailList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  location: PropTypes.object,
}

export default detailList
