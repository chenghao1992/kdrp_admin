import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { formatMoney } from '../../utils'
// import styles from '../common_list.less'


function MechanStaffInvestList ({ pagination, onPageChange, loading, list }) {
  const columns = [
    {
      title: '组织代码',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <span>{text}</span>,
    }, {
      title: '组织名称',
      dataIndex: 'full_path',
      key: 'full_path',
    }, {
      title: '职工姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => <span>{text}</span>,
    }, {
      title: '是否开户',
      dataIndex: 'is_pnr',
      key: 'is_pnr',
      render: (text) => {
        if (text) {
          return (
            <span>是</span>
          )
        }
        return (<span>否</span>)
      },
    }, {
      title: '是否投资',
      dataIndex: 'is_invest',
      key: 'is_invest',
      render: (text) => {
        if (text) {
          return (
            <span>是</span>
          )
        }
        return (<span>否</span>)
      },
    }, {
      title: '有效年化投资金额',
      dataIndex: 'invest_annual_amount',
      key: 'invest_annual_amount',
      render: (text) => <span>¥{formatMoney(text)}</span>,
    },
  ]

  return (
    <div>
      <Table
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={list}
        onChange={onPageChange}
        loading={loading}
        simple
        pagination={{ pageSize: 20, ...pagination }}
        rowKey={record => record.mobile}
      />
    </div>
  )
}

MechanStaffInvestList.propTypes = {
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  loading: PropTypes.bool,
  list: PropTypes.array,
}

export default MechanStaffInvestList
