import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import styles from './list.less'
import { COST_STATUS } from '../../utils/enums'
import { formatMoney } from '../../utils/index'


function listAudit ({ loading, dataSource, pagination, onPageChange, onSelect, onAction }) {
  const columns = [
    {
      title: '费用归属月份',
      dataIndex: 'bill_month',
      key: 'bill_month',
    }, {
      title: '机构名称',
      dataIndex: 'agency_name',
      key: 'agency_name',
    }, {
      title: '兼职客服姓名',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span>{text}</span>,
    }, {
      title: '兼职客服手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => <span>{text}</span>,
    }, {
      title: '当月计提金额',
      dataIndex: 'accrued_amount',
      key: 'accrued_amount',
      render: (text) => <span>
              {text ? <span>¥{formatMoney(text)}</span> : <span>¥0.00</span>}
              </span>,
    }, {
      title: '当月核算金额',
      dataIndex: 'accounting_amount',
      key: 'accounting_amount',
      render: (text, record) => <span>
              {
                record.status === 'checking' ? <span>--</span> : <span>{text ? <span>¥{formatMoney(text)}</span> : <span>¥0.00</span>}</span>
              }
              </span>,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{COST_STATUS[text]}</span>,
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <div>
            {record.status === 'checking' ?
              <div>
                <Popconfirm title="通过?" onConfirm={() => onAction(record.id, 'check_agreed')}>
                  &nbsp;<a>通过</a>&nbsp;
                </Popconfirm>
                <Popconfirm title="不通过?" onConfirm={() => onAction(record.id, 'check_refused')}>
                  &nbsp;<a>不通过</a>&nbsp;
                </Popconfirm>
              </div>
              : ''}
          </div>
        )
      },
    },
  ]

  return (
    <div className={styles.normal}>
      <Table
        rowSelection={onSelect}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

listAudit.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  location: PropTypes.object,
  onSelect: PropTypes.object,
  onAction: PropTypes.func,
}


export default listAudit
