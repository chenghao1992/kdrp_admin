import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'

import styles from './list.less'

import { COST_STATUS } from '../../utils/enums'
import { formatMoney } from '../../utils/index'


function listPay ({ loading, dataSource, pagination, onPageChange, onSelect, onAction }) {
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
    }, {
      title: '兼职客服手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '应发金额',
      dataIndex: 'accounting_amount',
      key: 'accounting_amount',
      render: (text) => (<span>{text ? <span>¥{formatMoney(text)}</span> : <span>¥0.00</span>}</span>),
    }, {
      title: '实发金额',
      dataIndex: 'actally_amount',
      key: 'actally_amount',
      render: (text, record) => {
        if (record.status === 'check_agreed') {
          return (<span>
                  <span>--</span>
                 </span>)
        }
        return (<span>
                <span>{text ? <span>¥{formatMoney(text)}</span> : <span>¥0.00</span>}</span>
               </span>)
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{COST_STATUS[text]}</span>,
    }, {
      title: '最后操作人',
      dataIndex: 'check_person_name',
      key: 'check_person_name',
    }, {
      title: '最后操作时间',
      dataIndex: 'update_time',
      key: 'update_time',
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <div>
            {record.status === 'check_agreed' ?
              <div>
                <Popconfirm title="发放?" onConfirm={() => onAction(record.id, 'pay_agreed')}>
                  &nbsp;<a>发放</a>&nbsp;
                </Popconfirm>
                <Popconfirm title="拒绝发放?" onConfirm={() => onAction(record.id, 'pay_refused')}>
                  &nbsp;<a>拒绝发放</a>&nbsp;
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

listPay.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  location: PropTypes.object,
  onSelect: PropTypes.object,
  onAction: PropTypes.func,
}

export default listPay
