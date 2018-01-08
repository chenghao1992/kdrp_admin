import { queryList } from '../services/performance'
import { parse } from 'qs'

export default {
  namespace: 'performance',
  state: {
    list: [],
    loading: true,
    pagination: {
      showTotal: total => `共 ${total} 条`,
      showQuickJumper: true,
      current: 1,
      total: 0,
    },
  },
  reducers: {
    querySuccess (state, action) {
      const { list, pagination } = action.payload
      return {
        ...state,
        list,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(queryList, parse(payload))
      if (data && data.status === 'success') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page,
          },
        })
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/report/performance') {
          dispatch({
            type: 'query',
            payload: { page: 1 },
          })
        }
      })
    },
  },
}
