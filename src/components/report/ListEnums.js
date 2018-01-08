/**
 * Created by xiaoys on 2017/11/29.
 */
import React from 'react'
import { formatMoney } from '../../utils/helper'

export const STAFF_PERSON = [
  { title: '机构代码', dataIndex: 'top_code', key: 'top_code', render: (text) => <span>{text}</span> },
  { title: '组织代码', dataIndex: 'code', key: 'code', render: (text) => <span>{text}</span> },
  { title: '组织名称', dataIndex: 'agency_name', key: 'agency_name', render: (text) => <span>{text}</span> },
  { title: '职工姓名', dataIndex: 'name', key: 'name', render: (text) => <span>{text}</span> },
  { title: '职工手机号', dataIndex: 'mobile', key: 'mobile', render: (text) => <span>{text}</span> },
  { title: '投资笔数', dataIndex: 'invest_cnt', key: 'invest_cnt', render: (text) => <span>{text}</span> },
  { title: '投资金额', dataIndex: 'invest_amount', key: 'invest_amount', render: (text) => <span>¥{formatMoney(text)}</span> },
  { title: '年化投资金额', dataIndex: 'invest_annual_amount', key: 'invest_annual_amount', render: (text) => <span>¥{formatMoney(text)}</span> },
]

export const STAFF_QRGANIZATION = [
  { title: '机构代码', dataIndex: 'top_code', key: 'top_code', render: (text) => <span>{text}</span> },
  { title: '组织代码', dataIndex: 'code', key: 'code', render: (text) => <span>{text}</span> },
  { title: '组织名称', dataIndex: 'agency_name', key: 'agency_name', render: (text) => <span>{text}</span> },
  { title: '职工人数', dataIndex: 'staff_cnt', key: 'staff_cnt', render: (text) => <span>{text}</span> },
  { title: '有效职工人数', dataIndex: 'valid_staff_cnt', key: 'valid_staff_cnt', render: (text) => <span>{text}</span> },
  { title: '投资笔数', dataIndex: 'invest_cnt', key: 'invest_cnt', render: (text) => <span>{text}</span> },
  { title: '投资金额', dataIndex: 'invest_amount', key: 'invest_amount', render: (text) => <span>¥{formatMoney(text)}</span> },
  { title: '年化投资金额', dataIndex: 'invest_annual_amount', key: 'invest_annual_amount', render: (text) => <span>¥{formatMoney(text)}</span> },
]
