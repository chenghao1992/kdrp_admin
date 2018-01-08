/**
 * Created by xiaoys on 2017/11/8.
 */
import React from 'react'
import { Badge } from 'antd'

export const CUSTOMER_BD_LIST = [
  { title: '创建时间', dataIndex: 'create_time', key: 'create_time', render: (text) => <span>{text}</span> },
  { title: '客户姓名', dataIndex: 'name', key: 'name ', render: (text) => <span>{text}</span> },
  { title: '客户手机号', dataIndex: 'mobile', key: 'mobile', render: (text) => <span>{text}</span> },
  { title: '组织代码', dataIndex: 'agency_code', key: 'agency_code', render: (text) => <span>{text || '--'}</span> },
  { title: '组织名称', dataIndex: 'agency_name', key: 'agency_name', render: (text) => <span>{text || '--'}</span> },
  { title: '兼职客服姓名', dataIndex: 'service_name', key: 'service_name', render: (text) => <span>{text || '--'}</span> },
  { title: '兼职客服手机', dataIndex: 'service_mobile', key: 'service_mobile', render: (text) => <span>{text || '--'}</span> },
  { title: '兼职客服分配状态', dataIndex: 'is_assort', key: 'is_assort', render: (text) => <span><Badge status={text ? 'success' : 'warning'} />{text ? '已分配' : '未分配'}</span> },
]


export const CUSTOMER_DETAIL_LIST2 = [
  { title: '序号', render: (text, record, index) => <span>{index + 1}</span> },
  { title: '房产名称', dataIndex: 'community', key: 'community ', render: (text) => <span>{text}</span> },
  { title: '房产所在地', dataIndex: 'address', key: 'address', render: (text) => <span>{text}</span> },
  { title: '房产面积（平方米）', dataIndex: 'area', key: 'area', render: (text) => <span>{text || '--'}</span> },
  { title: '房产价值（万元）', dataIndex: 'value', key: 'value', render: (text) => <span>{text || '--'}</span> },
  { title: '最后操作人', dataIndex: 'last_operation_username', key: 'last_operation_username', render: (text) => <span>{text || '--'}</span> },
  { title: '最后操作时间', dataIndex: 'update_time', key: 'update_time', render: (text) => <span>{text || '--'}</span> },
]

export const CUSTOMER_DETAIL_LIST3 = [
  { title: '序号', render: (text, record, index) => <span>{index + 1}</span> },
  { title: '车牌号', dataIndex: 'number', key: 'number ', render: (text) => <span>{text}</span> },
  { title: '车辆归属地', dataIndex: 'address', key: 'address', render: (text) => <span>{text}</span> },
  { title: '车辆品牌', dataIndex: 'brand', key: 'brand', render: (text) => <span>{text || '--'}</span> },
  { title: '车辆价值（万元）', dataIndex: 'value', key: 'value', render: (text) => <span>{text || '--'}</span> },
  { title: '最后操作人', dataIndex: 'last_operation_username', key: 'last_operation_username', render: (text) => <span>{text || '--'}</span> },
  { title: '最后操作时间', dataIndex: 'update_time', key: 'update_time', render: (text) => <span>{text || '--'}</span> },
]

export const CUSTOMER_DETAIL_LIST4 = [
  { title: '备注时间', dataIndex: 'create_time', key: 'create_time ', render: (text) => <span>{text}</span> },
  { title: '备注人组织', dataIndex: 'staff_agency', key: 'staff_agency', render: (text) => <span>{text}</span> },
  { title: '备注人', dataIndex: 'staff_name', key: 'staff_name', render: (text) => <span>{text || '--'}</span> },
  { title: '备注类型', dataIndex: 'remark_type', key: 'remark_type', render: (text) => <span>{text || '--'}</span> },
  { title: '备注信息', dataIndex: 'content', key: 'content', render: (text) => <span>{text || '--'}</span> },
  { title: '附件', dataIndex: 'attchments', key: 'attchments', render: (text, record) =>
    <span>
      {
        record.attachments.map((item, index) => {
          return (
            <a href={item.href} key={index} target="_blank">{item.name}</a>
          )
        })
      }
    </span>,
  },
]
