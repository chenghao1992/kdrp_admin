import React, { PropTypes } from 'react'
import { Table, Modal } from 'antd'
import { getArticleUrl } from '../../utils/config'
import { Link } from 'dva/router'

// import styles from '../common_list.less'
const confirm = Modal.confirm

function ConsultationArticleList ({ dataSource, onDelete, onPageChange, pagination, loading, handleClick }) {
  const onDeletes = (id) => {
    confirm({
      title: '确定删除该文章?',
      onOk () {
        onDelete(id)
      },
    })
  }

  const columns = [
    {
      title: '序号',
      key: 'id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '栏目名称',
      dataIndex: 'catalog_name',
      key: 'catalog_name',
      render: (text) => <span>{text}</span>,
    }, {
      title: '文章名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link style={{ display: 'inline-block', marginRight: 20 }} to={{ pathname: '/maintainApp/showArticle', query: { id: record.id, username: record.username } }}>{text}</Link>,
    }, {
      title: '排列顺序',
      dataIndex: 'level',
      key: 'level',
      render: (text) => <span>{text}</span>,
    }, {
      title: '链接地址',
      dataIndex: 'catalog_slug',
      key: 'catalog_slug',
      render: (text, record) => <Link style={{ display: 'inline-block', marginRight: 20 }} to={{ pathname: '/maintainApp/showArticle', query: { id: record.id, username: record.username } }}>{`${getArticleUrl}/#/information/informationDetail?article_id=${record.id}`}</Link>,
    }, {
      title: '状态',
      dataIndex: 'display',
      key: 'display',
      width: 100,
      render: (text) => <span>{text ? '显示' : '隐藏'}</span>,
    }, {
      title: '操作人',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <span><p>{text}</p><p>{record.update_time}</p></span>,
    }, {
      title: '操作',
      key: 'operson',
      render: (text, record) =>
        <span>
          <Link style={{ display: 'inline-block', marginRight: 20 }} to={{ pathname: '/maintainApp/showArticle', query: { id: record.id, username: record.username } }}>查看</Link>
          <a style={{ display: 'inline-block', marginRight: 20 }} onClick={() => { handleClick(record.id) }}>编辑</a>
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

ConsultationArticleList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onEditItem: PropTypes.func,
  onDelete: PropTypes.func,
  onSee: PropTypes.func,
  handleClick: PropTypes.func,
}

export default ConsultationArticleList
