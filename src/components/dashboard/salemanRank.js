import React, { PropTypes } from 'react'
import { Table, Progress } from 'antd'
import styles from './orgnrank.less'
// import { color } from '../../utils'

function SalemanRank ({ data }) {
  let totalmoney = 1

  // const headers = [
  //   { title: '姓名', dataIndex: 'name' },
  //   { title: '本月服务费', dataIndex: 'value' },
  // ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      className: styles.name,
    }, {
      title: '本月服务费',
      dataIndex: 'money',
      className: styles.money,
    }, {
      title: '',
      dataIndex: 'percent',
      render (text, record, i) {
        if (i === 0) {
          totalmoney = record.money
        }
        return (<div style={{ width: 100 }}><Progress percent={(record.money / totalmoney) * 100} showInfo={false} strokeWidth={10} /></div>)
      },
    },
  ]
  return (
    <div className={styles.orgnrank}>
      <Table pagination={false} showHeader columns={columns} rowKey={(record, key) => key} dataSource={data} />
    </div>
  )
}

SalemanRank.propTypes = {
  data: PropTypes.array,
}

export default SalemanRank
