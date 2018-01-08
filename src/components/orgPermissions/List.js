import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { Link } from 'dva/router'
import { COMPANY_STATUS } from '../../utils/enums'
import styles from './List.css'
// import moment from 'moment'

function List ({ loading, dataSource, pagination, onTableChange, handleAClick }) {
  const columns = [{
    title: '组织代码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '组织名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      return record.is_leaf ? text : (<a onClick={handleAClick(record.id)}>{text}</a>)
    },
  }, {
    title: '管理员姓名',
    dataIndex: 'manager_real_name',
    key: 'manager_real_name',
  }, {
    title: '管理员帐号',
    dataIndex: 'manager_username',
    key: 'manager_username',
  }, {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      return COMPANY_STATUS[text]
    },
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={{ pathname: '/company/companyInformation_m', query: { id: record.id } }}>
          查看
        </Link>
      </span>
    ),
  }]


  return (
    <div className={styles.normal}>
      <Table
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
  onTableChange: PropTypes.func,
  handleAClick: PropTypes.func,
}

export default List
