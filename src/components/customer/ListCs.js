import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { Link } from 'dva/router'
import { BOOLEAN } from '../../utils/enums'
import styles from './List.css'

function List ({ loading, dataSource, pagination, onSelectedRowChange, onTableChange, onCommit, selectedRowKeys }) {
  const columns = [{
    title: '客户姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={{ pathname: '/customer/customerList_cs_detail', query: { id: record.id } }}>{text}</Link>,
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    title: '注册时间',
    dataIndex: 'register_time',
    key: 'register_time',
  }, {
    title: '最后一次登录时间',
    dataIndex: 'last_login',
    key: 'last_login',
  }, {
    title: '是否开户',
    dataIndex: 'is_pnr',
    key: 'is_pnr',
    render: (text) => {
      return BOOLEAN[text]
    },
  }, {
    title: '是否投资',
    dataIndex: 'is_invest',
    key: 'is_invest',
    render: (text) => {
      return BOOLEAN[text]
    },
  }, {
    title: '账户余额',
    dataIndex: 'available',
    key: 'available',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={onCommit(record.id)}>上交</a>
      </span>
    ),
  }]

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectRowKeys, selectedRows) => {
      console.log(`selectRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
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
        rowKey={record => record.id}
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
  onCommit: PropTypes.func,
  selectedRowKeys: PropTypes.array,
}

export default List
