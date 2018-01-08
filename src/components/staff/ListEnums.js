/**
 * Created by xiaoys on 2017/11/28.
 */
import React from 'react'
import { STAFFLIST_ROLES, STAFFLIST_STATUS_ALL } from '../../utils/enums'
import { Link } from 'dva/router'

export const STAFF_LIST = [
  { title: '员工姓名', dataIndex: 'name', key: 'name', render: (text, record) => <Link to={{ pathname: '/personal/personalInfo', query: { userId: record.id } }}>{text}</Link> },
  { title: '手机号', dataIndex: 'mobile', key: 'mobile' },
  { title: '角色', dataIndex: 'role_name', key: 'role_name', render: (text) => <span>{STAFFLIST_ROLES[text]}</span> },
  { title: '归属组织', dataIndex: 'agency_name', key: 'agency_name', render: (text) => <span>{text}</span> },
  { title: '状态', dataIndex: 'status', key: 'status', render: (text) => <span>{STAFFLIST_STATUS_ALL[text]}</span> },

]
