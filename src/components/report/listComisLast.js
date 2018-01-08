import React, { PropTypes } from 'react'
import { Table } from 'antd'
import styles from './list.less'
import { formatMoney } from '../../utils/index'
// import { Link } from 'dva/router'
// import classnames from 'classnames'

const { Column, ColumnGroup } = Table

function listComisLast ({ loading, dataSource }) {
  return (
    <div className={styles.report}>
      <Table
        bordered
        scroll={{ x: 1200 }}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        simple
        rowKey={record => record.id}
      >
        <ColumnGroup title="昨日时点值">
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
          />
          <Column
            title="投资笔数"
            dataIndex="range_invest_cnt"
            key="range_invest_cnt"
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
        </ColumnGroup>
      </Table>
    </div>
  )
}

listComisLast.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  location: PropTypes.object,
}

export default listComisLast
