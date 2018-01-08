import { query } from '../services/selectSalesman'

export default {
  namespace: 'selectSalesmanAgc',
  state: {
    value: '',
    dataOrigin: [],
    dataReceiver: [],
  },
  reducers: {
    setValue (state, action) {
      return { ...state, ...action.payload }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    clearPerson (state) {
      return { ...state, dataOrigin: [], dataReceiver: [] }
    },
  },
  effects: {
    *query ({
      payload,
    }, { put, call }) {
      /* yield put({
       type: 'setValue',
       payload: payload
       });*/

      const data = yield call(query, payload)

      if (data && data.status === 'success') {
        if (payload.include_leave_employee) {
          yield put({
            type: 'querySuccess',
            payload: {
              dataOrigin: data.data,
            },
          })
        } else {
          yield put({
            type: 'querySuccess',
            payload: {
              dataReceiver: data.data,
            },
          })
        }
      }
    },
  },
  subscriptions: {},
}
