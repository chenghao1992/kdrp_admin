import { create } from '../services/partner'
import { message } from 'antd'
import { hashHistory } from 'dva/router'

export default {
  namespace: 'partnerAdd',
  state: {},
  reducers: {},
  effects: {
    *create ({ payload }, { call }) {
      const data = yield call(create, payload)
      if (data && data.status === 'success') {
        message.success('新增机构成功')
        hashHistory.push('/channel/partner')
      }
    },
  },
  subscriptions: {},
}
