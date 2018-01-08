import React, { PropTypes } from 'react'
import { Table, Modal } from 'antd'
import { getDomainName } from '../../utils/config'
// import styles from '../common_list.less'
// import classnames from 'classnames'
// import TableBodyWrapper from '../common/TableBodyWrapper'

const confirm = Modal.confirm

function consultationColumnList ({ loading, dataSource, onDelete, onEdit, onPageChange, pagination }) {
  const onDeletes = (id) => {
    confirm({
      title: '确定删除该栏目?',
      onOk () {
        onDelete(id)
      },
    })
  }

  const columns = [
    {
      title: '序号',
      key: 'number',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '排列顺序',
      dataIndex: 'level',
      key: 'level',
      render: (text) => <span>{text}</span>,
    }, {
      title: '文章数量',
      dataIndex: 'article_count',
      key: 'article_count',
      render: (text) => <span>{text}</span>,
    }, {
      title: '链接地址',
      dataIndex: 'slug',
      key: 'slug',
      render: (text) => <span>{`${getDomainName}/${text}`}</span>,
    }, {
      title: '状态',
      dataIndex: 'display',
      key: 'display',
      render: (text) => <span>{text ? '显示' : '隐藏'}</span>,
    }, {
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) =>
        <span>
          <a style={{ display: 'inline-block', marginRight: 20 }} onClick={() => { onEdit(record) }}>编辑</a>
          <a onClick={() => { onDeletes(record.id) }}>删除</a>
        </span>,
    },
  ]

  return (
    <div>
      <Table
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={{ pageSize: 20, ...pagination }}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

consultationColumnList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  timeList: PropTypes.object,
}

export default consultationColumnList
