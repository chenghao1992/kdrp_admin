import React, { PropTypes } from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'dva/router'
import { STATUS_TAG_COLOR } from '../../utils/enums'
import styles from './List.css'
// import moment from 'moment'

function List ({ loading, dataSource, pagination, onTableChange }) {
  const columns = [{
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  }, {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '任务类型',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: '完成时间',
    dataIndex: 'complete_time',
    key: 'complete_time',
  }, {
    title: '当前状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <Tag color={STATUS_TAG_COLOR[record.status]}>{record.status}</Tag>
    ),
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={{ pathname: '/task/taskDetail', query: { id: record.id } }}>
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
}

export default List
