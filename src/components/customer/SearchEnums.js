/**
 * Created by xiaoys on 2017/11/8.
 */
import { AREAS } from '../../utils/areas'

export const grid2 = {
  lg: 12,
  xs: 24,
}

export const CUSTOMER_BD_SEARCH = [
  {
    list: [
      { label: '组织选择', placeholder: '请选择组织', key: 'agency.id', type: 'Cascader' },
      { label: '组织代码', placeholder: '请输入组织代码', key: 'agency.code', type: 'Input' },
    ],
  }, {
    list: [
      { label: '客户手机', placeholder: '请输入客户手机', key: 'mobile', type: 'Input' },
      { label: '客户姓名', placeholder: '请输入客户姓名', key: 'name', type: 'Input' },
    ],
  }, {
    list: [
      { label: '兼职客服手机', placeholder: '请输入兼职客服手机', key: 'service.mobile', type: 'Input' },
      { label: '兼职客服姓名', placeholder: '请输入兼职客服姓名', key: 'service.name', type: 'Input' },
    ],
  }, {
    list: [
      { label: '兼职客服有无', placeholder: '请选择', key: 'is_assort', type: 'Select' },
    ],
  },
]


export const NEW_HOUSE = [
  { label: '房产所在地', placeholder: '请输入房产所在地', key: 'address', type: 'Cascader', required: true, rules: 'justArray', options: AREAS },
  { label: '所在小区名称', placeholder: '请输入房产名称', key: 'community', type: 'Input', required: true, rules: 'name' },
  { label: '面积（平方米）', placeholder: '请输入房产面积', key: 'area', type: 'Input', required: true, rules: 'justNumber' },
  { label: '价值（万元）', placeholder: '请输入房产价值', key: 'value', type: 'Input', required: true, rules: 'justNumber' },
]

export const NEW_CAR = [
  { label: '车辆归属地', placeholder: '请输入车辆归属地', key: 'address', type: 'Cascader', required: true, rules: 'justArray', options: AREAS },
  { label: '车辆品牌', placeholder: '请输入车辆名称', key: 'brand', type: 'Input', required: true, rules: 'name' },
  { label: '车辆价值（万元）', placeholder: '请输入车辆价值', key: 'value', type: 'Input', required: true, rules: 'justNumber' },
  { label: '车牌号码', placeholder: '请输入车牌号码', key: 'number', type: 'Input', required: true, rules: 'justNumber' },
]
