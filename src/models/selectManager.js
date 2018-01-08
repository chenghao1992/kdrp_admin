import { query } from '../services/selectManager'
// 组织架构－选择管理员
export default {
  namespace: 'selectManager',
  state: {
    value: '',
    data: [],
  },
  reducers: {
    setValue (state, action) {
      return { ...state, ...action.payload }
    },
    clearMngData (state) {
      return { ...state, data: [] }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
  },
  effects: {
    *query ({
      payload,
    }, { put, call, select }) {
      const selectedKeys = yield select(state => state.organiztionManage.selectedKeys)

      /* yield put({
        type: 'setValue',
        payload: {
          value:payload
        }
      });*/
      const args = {
        content: payload,
        agency_id: selectedKeys[0],
      }
      const data = yield call(query, args)
      if (data && data.status === 'success') {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.data,
          },
        })
      } else {
        // todo 出错应该有一个统一的返回
      }
    },
  },
  subscriptions: {},
}
