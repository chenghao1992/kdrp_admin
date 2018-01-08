import { query } from '../services/selectSalesman'

export default {
  namespace: 'selectSalesman',
  state: {
    value: '',
    data: [],
  },
  reducers: {
    setValue (state, action) {
      return { ...state, ...action.payload }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
  },
  effects: {
    *query ({
      payload,
    }, { put, call }) {
      yield put({
        type: 'setValue',
        payload,
      })
      const args = {
        content: payload.value,
      }
      const data = yield call(query, args)
      if (data && data.status === 'success') {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.data,
          },
        })
      }
    },
  },
  subscriptions: {},
}
