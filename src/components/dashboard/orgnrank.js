import React, { PropTypes } from 'react'
import { Table, Progress } from 'antd'
import styles from './orgnrank.less'
import { formatMoney } from '../../utils/index'
// import { color } from '../../utils'

function OrgnRank ({ data, header, changeHeightOfNumCard, highterStatus }) {
  let totalvalue = 1

  const colum = [
    {
      title: '',
      dataIndex: 'percent',
      render (text, record, i) {
        if (i === 0) {
          totalvalue = record.value
        }
        return (<div style={{ width: 100 }}><Progress percent={(record.value / totalvalue) * 100} showInfo={false} strokeWidth={10} /></div>)
      },
    },
  ]
  /* 服务费固定第二位 金额格式化*/
  for (let i = 0; i < header.length; i++) {
    header[i].width = 100
    header[i].render = function (text, record) {
      if (record.current) {
        return <span style={{ color: '#d897eb' }}>{text}</span>
      }
      return <span>{text}</span>
    }
  }
  if (header.length > 2) {
    header[2].render = function (text, record) {
      if (record.current) {
        return <span style={{ color: '#d897eb' }}>¥&nbsp;{formatMoney(text)}</span>
      }
      return <span>¥&nbsp;{formatMoney(text)}</span>
    }
  } else {
    header[1].render = function (text) {
      return <span>¥&nbsp;{formatMoney(text)}</span>
    }
  }


  const columns = [...header, ...colum]
  console.log(columns)
  console.log(data)
  return (
    <div>
      {
        highterStatus === 3 ?
          <div className={styles.orgnrank3}>
            <Table size="small" pagination={false} showHeader columns={columns} rowKey={(record, key) => key} dataSource={data} scroll={{ y: changeHeightOfNumCard ? 280 : 380 }} />
          </div> :
          <div className={highterStatus === 1 ? styles.orgnrank1 : styles.orgnrank2}>
            <Table size="small" pagination={false} showHeader columns={columns} rowKey={(record, key) => key} dataSource={data} scroll={{ y: changeHeightOfNumCard ? 280 : 380 }} />
          </div>
      }

    </div>

  )
}

OrgnRank.propTypes = {
  data: PropTypes.array,
  header: PropTypes.array,
  changeHeightOfNumCard: PropTypes.bool,
  scrollRank: PropTypes.number,
  highterStatus: PropTypes.number,
}

export default OrgnRank
