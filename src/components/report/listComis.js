import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { Link } from 'dva/router'
import styles from './list.less'
import { formatMoney, accAdd } from '../../utils/index'
// import classnames from 'classnames'

const { Column, ColumnGroup } = Table

function listComis ({ loading, dataSource, pagination, onPageChange, datetime }) {
  return (
    <div className={styles.report}>
      <Table
        bordered
        scroll={{ x: 1200 }}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
      >
        <ColumnGroup title="">
          <Column
            title="机构代码"
            dataIndex="code"
            key="code"
          />
          <Column
            title="机构名称"
            dataIndex="name"
            key="name"
            render={(text, record) => (
              <span>
                {record.is_bottom ?
                  <Link to={{ pathname: '/report/report_employee', query: { agency_id: record.id, start_end_time: datetime } }}>{text}</Link>
                  :
                  <Link to={{ pathname: '/report/report_finance', query: { agency_id: record.id, start_end_time: datetime } }}>{text}</Link>
                }
              </span>
            )}
          />
          <Column
            title="层级数"
            dataIndex="yesterday_child_deep"
            key="yesterday_child_deep"
          />
        </ColumnGroup>
        <ColumnGroup title="昨日时点值">
          <Column
            title="末级组织数"
            dataIndex="yesterday_bottom_cnt"
            key="yesterday_bottom_cnt"
          />
          <Column
            title="兼职客服人数"
            dataIndex="yesterday_employee_cnt"
            key="yesterday_employee_cnt"
          />
          <Column
            title="客户数"
            dataIndex="yesterday_customer_cnt"
            key="yesterday_customer_cnt"
          />
          <Column
            title="活跃客户数"
            dataIndex="yesterday_active_customer_cnt"
            key="yesterday_active_customer_cnt"
          />
          <Column
            title="机构新增服务费"
            dataIndex="yesterday_agency_fee_amount"
            key="yesterday_agency_fee_amount"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{text}</span> : <span>¥{formatMoney(text)}</span>
              }
              </span>
            )}
          />
          <Column
            title="个人新增服务费"
            dataIndex="yesterday_employee_fee_amount"
            key="yesterday_employee_fee_amount"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{text}</span> : <span>¥{formatMoney(text)}</span>
              }
              </span>
            )}
          />
          <Column
            title="新增服务费小计"
            dataIndex="yesterday_total_fee_amount"
            key="yesterday_total_fee_amount"
            render={function (text, record) {
              let aNum = record.yesterday_agency_fee_amount
              let bNum = record.yesterday_employee_fee_amount
              let tNum = 0
              if (bNum === '-' && aNum === '-') {
                tNum = '-'
              } else {
                if (aNum === '-' && bNum !== '-') {
                  aNum = 0
                }
                if (bNum === '-' && aNum !== '-') {
                  bNum = 0
                }
                tNum = `¥${formatMoney(accAdd(aNum, bNum))}`
              }
              return <span>{tNum}</span>
            }}
          />
        </ColumnGroup>
        <ColumnGroup title="区间值">
          <Column
            title="年化投资金额（机构客户部分）"
            dataIndex="range_invest_annual_amount"
            key="range_invest_annual_amount"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{text}</span> : <span>¥{formatMoney(text)}</span>
              }
              </span>
            )}
          />
          <Column
            title="机构服务费（机构客户部分）"
            dataIndex="range_agency_fee_amount"
            key="range_agency_fee_amount"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{text}</span> : <span>¥{formatMoney(text)}</span>
              }
              </span>
            )}
          />
          <Column
            title="兼职客服服务费"
            dataIndex="range_employee_fee_amount"
            key="range_employee_fee_amount"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{text}</span> : <span>¥{formatMoney(text)}</span>
              }
              </span>
            )}
          />
          <Column
            title="服务费合计"
            dataIndex="range_total_fee_amount"
            key="range_total_fee_amount"
            render={function (text, record) {
              let aNum = record.range_agency_fee_amount
              let bNum = record.range_employee_fee_amount
              let tNum = 0
              if (bNum === '-' && aNum === '-') {
                tNum = '-'
              } else {
                if (aNum === '-' && bNum !== '-') {
                  aNum = 0
                }
                if (bNum === '-' && aNum !== '-') {
                  bNum = 0
                }
                tNum = `¥${formatMoney(accAdd(aNum, bNum))}`
              }
              return <span>{tNum}</span>
            }}
          />
        </ColumnGroup>
      </Table>
    </div>
  )
}

listComis.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  location: PropTypes.object,
  datetime: PropTypes.string,
}

export default listComis
