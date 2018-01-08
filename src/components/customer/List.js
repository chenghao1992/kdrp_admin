import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { DISTRIBUTION } from '../../utils/enums'


import styles from '../common_list.less'

function List ({ loading, dataSource, pagination, onSelectedRowChange, onTableChange, onDistribute, onRecovery, roles, selectedRowKeys }) {
  const isChannelMnger = roles.some((value) => {
    return value.key === 'channel_leader' && value.is_active
  })


  let columns = [{
    title: '组织代码',
    dataIndex: 'agency_code',
    key: 'agency_code',
  }, {
    title: '组织名称',
    dataIndex: 'agency_name',
    key: 'agency_name',
  }, {
    title: '兼职客服分配',
    dataIndex: 'service_status',
    key: 'service_status',
    render: (text) => {
      return DISTRIBUTION[text]
    },
  }, {
    title: '兼职客服姓名',
    dataIndex: 'service_name',
    key: 'service_name',
  }, {
    title: '兼职客服手机',
    dataIndex: 'service_mobile',
    key: 'service_mobile',
  }, {
    title: '客户姓名',
    dataIndex: 'customer_name',
    key: 'customer_name',
  }, {
    title: '手机号',
    dataIndex: 'customer_mobile',
    key: 'customer_mobile',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={onDistribute(record.customer_id)}>分配</a>
        <a onClick={onRecovery(record.customer_id)} className={styles.common_margin_l10}>回收</a>
      </span>
    ),
  }]

  if (isChannelMnger) {
    columns = [{
      title: '机构代码',
      dataIndex: 'channel_code',
      key: 'channel_code',
    }, {
      title: '机构名称',
      dataIndex: 'channel_name',
      key: 'channel_name',
    }].concat(columns)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      onSelectedRowChange(selectRowKeys)
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  }


  return (
    <div className={styles.normal}>
      <Table
        rowSelection={rowSelection}
        bordered
        onChange={onTableChange}
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.customer_id}
        pagination={{ pageSize: 20, ...pagination }}
        simple
      />
    </div>
  )
}
List.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onSelectedRowChange: PropTypes.func,
  onTableChange: PropTypes.func,
  onDistribute: PropTypes.func,
  onRecovery: PropTypes.func,
  roles: PropTypes.array,
  selectedRowKeys: PropTypes.array,
}


export default List
