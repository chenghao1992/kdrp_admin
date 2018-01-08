/**
 * Created by xiaoys on 2017/11/28.
 */

export const grid2 = {
  lg: 12,
  xs: 24,
}

export const STAFF_SEARCH = [
  {
    list: [
      { label: '用户姓名', placeholder: '请输入用户姓名', key: 'name', type: 'Input' },
      { label: '手机号', placeholder: '请输入手机号', key: 'mobile', type: 'Input' },
    ],
  }, {
    list: [
      { label: '组织选择', placeholder: '请选择组织', key: 'agency_id', type: 'Cascader' },
    ],
  },
]

export const STAFF_INVEST = [
  {
    list: [
      { label: '组织选择', placeholder: '请选择组织', key: 'agency_id', type: 'Cascader' },
      { label: '创建时间', placeholder: ['开始时间', '结束时间'], key: 'start_end_time', type: 'RangePicker' },
    ],
  },
]
