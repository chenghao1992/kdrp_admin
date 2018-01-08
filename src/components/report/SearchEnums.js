/**
 * Created by xiaoys on 2017/11/29.
 */
export const grid2 = {
  lg: 12,
  xs: 24,
}

export const REPORT_STAFF_PERSON = [
  {
    list: [
      { label: '组织', placeholder: '请选择组织', key: 'agency_id', type: 'Cascader' },
      { label: '查询日期', placeholder: ['开始时间', '结束时间'], key: 'start_end_time', type: 'RangePicker' },
    ],
  },
]

export const REPORT_STAFF_ORGANIZATION = [
  {
    list: [
      { label: '组织', placeholder: '请选择组织', key: 'agency_id', type: 'Cascader' },
      { label: '查询日期', placeholder: ['开始时间', '结束时间'], key: 'start_end_time', type: 'RangePicker' },
    ],
  },
]
