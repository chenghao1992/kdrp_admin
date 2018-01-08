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
      { label: '员工姓名', placeholder: '请输入员工姓名', key: 'name', type: 'Input' },
      { label: '手机号', placeholder: '请输入手机号', key: 'mobile', type: 'Input' },
    ],
  }, {
    list: [
      { label: '状态', placeholder: '请选择状态', key: 'status', type: 'Select' },
      { label: '组织', placeholder: '请选择组织', key: 'agency_id', type: 'Cascader' },
    ],
  }, {
    list: [
      { label: '创建时间', placeholder: ['开始时间', '结束时间'], key: 'start_end_time', type: 'RangePicker' },
    ],
  },
]
