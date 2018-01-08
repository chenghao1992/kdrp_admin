import React, { PropTypes } from 'react'
import { Table, Modal } from 'antd'

const confirm = Modal.confirm

import styles from '../common_list.less'

function MechanStaffList ({ list, pagination, onPageChange, onEditItem, onDelete, loading }) {
  const handlClick = (record) => {
    onEditItem(record)
  }

  const handlDelete = (record) => {
    confirm({
      title: '确定删除该职工?',
      onOk () {
        onDelete(record.id)
      },
    })
  }

  const columns = [
    {
      title: '组织代码',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <span>{text}</span>,
    }, {
      title: '组织',
      dataIndex: 'full_path',
      key: 'full_path',
      render: (text) => <span>{text}</span>,
    }, {
      title: '用户姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => <span>{text}</span>,
    }, {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <div><a className={styles.common_margin_r20} onClick={() => handlClick(record)}>编辑</a><a onClick={() => handlDelete(record)}>删除</a></div>,
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
        rowKey={record => record.id}
      />
    </div>
  )
}

MechanStaffList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onEditItem: PropTypes.func,
  onSendItem: PropTypes.func,
  timeList: PropTypes.object,
  list: PropTypes.array,
  onDelete: PropTypes.func,
}

export default MechanStaffList
