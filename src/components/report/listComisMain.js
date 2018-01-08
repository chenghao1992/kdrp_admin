import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { Link } from 'dva/router'
import styles from './list.less'
import { formatMoney } from '../../utils/index'
// import classnames from 'classnames'

const { Column, ColumnGroup } = Table

function listComisMain ({ loading, dataSource, pagination, onPageChange, datetime }) {
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
                  <Link to={{ pathname: '/report/report_agency', query: { agency_id: record.id, start_end_time: datetime } }}>{text}</Link>
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
            title="有效客户数"
            dataIndex="yesterday_valid_customer_cnt"
            key="yesterday_valid_customer_cnt"
          />
          <Column
            title="活跃客户数"
            dataIndex="yesterday_active_customer_cnt"
            key="yesterday_active_customer_cnt"
          />
          <Column
            title="账户余额总额"
            dataIndex="yesterday_available"
            key="yesterday_available"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{text}</span> : <span>¥{formatMoney(text)}</span>
              }
              </span>
            )}
          />
        </ColumnGroup>
        <ColumnGroup title="区间值">
          <Column
            title="投资客户数"
            dataIndex="range_invest_user_cnt"
            key="range_invest_user_cnt"
            render={(text) => (
              <span>{text}</span>
            )}
          />
          <Column
            title="投资笔数"
            dataIndex="range_invest_cnt"
            key="range_invest_cnt"
            render={(text) => (
              <span>{text}</span>
            )}
          />
          <Column
            title="投资金额"
            dataIndex="range_invest_amount"
            key="range_invest_amount"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{text}</span> : <span>¥{formatMoney(text)}</span>
              }
              </span>
            )}
          />
          <Column
            title="年化投资金额"
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
            title="机构服务费"
            dataIndex="agency_fee_amount"
            key="agency_fee_amount"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{text}</span> : <span>{text}</span>
              }
              </span>
            )}
          />
          <Column
            title="个人服务费"
            dataIndex="employee_fee_amount"
            key="employee_fee_amount"
            render={(text) => (
              <span>
              {
                text === '-' ? <span>{2}</span> : <span>¥{(2)}</span>
              }
              </span>
            )}
          />
        </ColumnGroup>
      </Table>
    </div>
  )
}

listComisMain.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  location: PropTypes.object,
  datetime: PropTypes.string,
}

export default listComisMain
