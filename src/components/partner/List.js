import React, { PropTypes } from 'react'
import { Table } from 'antd'
import { Link } from 'dva/router'
import moment from 'moment'
import { COMPANY_STATUS } from '../../utils/enums'
import XFilterByRoles from '../common/xFilterByRoles'

import styles from './List.css'


function List ({ activeRole, loading, dataSource, pagination, onTableChange, onBmClick }) {
  let columns = [{
    title: '机构代码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '机构名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '业务联系人姓名',
    dataIndex: 'contact_name',
    key: 'contact_name',
  }, {
    title: '业务联系人手机',
    dataIndex: 'contact_mobile',
    key: 'contact_mobile',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      return COMPANY_STATUS[text]
    },
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <XFilterByRoles activeRole={activeRole} allowedRoles={['channel_master', 'channel_leader']}>
          <span>
            <Link to={{ pathname: '/company/companyInformation_m', query: { id: record.agency_id } }}>
              查看公司详情
            </Link><br />
          </span>
        </XFilterByRoles>

        <XFilterByRoles activeRole={activeRole} allowedRoles={['channel_leader']}>
          <span>
           <Link to={{ pathname: '/channel/feeRule', query: { id: record.id } }}>
              设定服务费规则
           </Link><br />
          </span>
        </XFilterByRoles>

         <XFilterByRoles activeRole={activeRole} allowedRoles={['channel_leader']}>
           <span>
          {record.editable ?
            <Link to={{ pathname: '/organization/manage', query: { id: record.id, queryOrgnizition: 1 } }}>
              设置组织架构
            </Link> : null}
             <br />
          </span>
        </XFilterByRoles>

        <XFilterByRoles activeRole={activeRole} allowedRoles={['channel_master']}>
          {record.status === 'init' || record.status === 'running' ?
            <a onClick={onBmClick({ currentLeaderId: record.leader_id, currentChannelId: record.id })}>指定商务经理</a> : null}
        </XFilterByRoles>

      </span>
    ),
  }]

  if (activeRole === 'channel_master') {
    columns.splice(4, 0, ...[{
      title: '商务经理',
      dataIndex: 'leader_name',
      key: 'leader_name',
      render: (text) => {
        return text || '无'
      },
    }])
  }


  const data = dataSource.map((value) => {
    return {
      ...value,
      contact_name: value.contact.name,
      contact_mobile: value.contact.mobile,
      agreement_duration: `${moment(value.agreement.start_time).format('YYYY-MM-DD')}至${moment(value.agreement.end_time).format('YYYY-MM-DD')}`,
    }
  })


  return (
    <div className={styles.normal}>
      <Table
        bordered
        onChange={onTableChange}
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={record => record.id}
        pagination={{ pageSize: 20, ...pagination }}
        simple
      />
    </div>
  )
}

List.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onTableChange: PropTypes.func,
  activeRole: PropTypes.string,
  onBmClick: PropTypes.func,
}

export default List
