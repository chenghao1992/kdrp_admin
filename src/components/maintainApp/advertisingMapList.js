import React, { PropTypes } from 'react'
import { Table } from 'antd'

function AdvertisingMapList ({ dataSource, onEdit, pagination, onPageChange, loading }) {
  const columns = [
    {
      title: '序号',
      dataIndex: 'number',
      key: 'number',
      render: (text, record, index) => <span>{index + 1}</span>,
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    }, {
      title: '图片',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text) => <a href={text} target="_blank">{text}</a>,
    }, {
      title: '链接地址',
      dataIndex: 'image_url_address',
      key: 'image_url_address',
      render: (text) => <span>{text}</span>,
    }, {
      title: '状态',
      dataIndex: 'display',
      key: 'display',
      render: (text) => <span>{text ? '显示' : '隐藏'}</span>,
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) =>
        <span>
          <a style={{ display: 'inline-block', marginRight: 20 }} onClick={() => { onEdit(record) }}>编辑</a>
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

AdvertisingMapList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  timeList: PropTypes.object,
}

export default AdvertisingMapList
