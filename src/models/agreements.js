import { agreeText, detailes } from '../services/agreements'
import { hashHistory } from 'dva/router'

export default {
  namespace: 'agreements',
  state: {
    id: '',
    statusType: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/agreements') {
          dispatch({ type: 'getId' })
        }
      })
    },
  },
  effects: {
    *getId ({ payload }, { call, put }) {
      const data = yield call(detailes)
      if (data && data.status === 'success') {
        yield put({
          type: 'deposit',
          payload: {
            id: data.data.personal_info.id,
          },
        })
        yield put({
          type: 'changeBtn',
          payload: {
            statusType: data.data.personal_info.agreement_label,
          },
        })
      }
    },
    *agreeText ({ payload }, { call, put }) {
      console.log(payload)
      const data = yield call(agreeText, payload)
      if (data && data.status === 'success') {
        yield put({
          type: 'changeBtn',
          payload: {
            statusType: true,
          },
        })
        hashHistory.push('/dashboard')
      }
    },
  },
  reducers: {
    deposit (state, action) {
      return { ...state, ...action.payload }
    },
    changeBtn (state, action) {
      return { ...state, ...action.payload }
    },
  },
}

