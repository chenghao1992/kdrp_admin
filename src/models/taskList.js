import { query } from '../services/task'

const defaultQuery = {
  name: '',
  create_time: '',
  page: 1,
  page_size: 20,
}

export default {
  namespace: 'taskList',
  state: {
    list: [],
    query: defaultQuery,
    pagination: {
      /* showSizeChanger: true,*/
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  reducers: {

    querySuccess (state, action) {
      const { list, pagination } = action.payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
    clearAllQuery (state) {
      return {
        ...state,
        query: [],
        // preQuery: [],
      }
    },
    setQuery (state, action) {
      return {
        ...state,
        query: action.payload,
      }
    },
  },
  effects: {
    *search ({ payload }, { put }) {
      yield put({
        type: 'setQuery',
        payload,
      })
      yield put({
        type: 'query',
      })
    },

    *query ({ payload }, { call, put, select }) {
      const queryData = yield select(state => state.taskList.query)

      const realQuery = {
        ...queryData,
        ...payload,
      }

 /*     yield put({
        type: 'setQuery',
        payload: realQuery
      });*/

      const data = yield call(query, realQuery)

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
        if (location.pathname === '/task/taskList') {
          dispatch({
            type: 'clearAllQuery',
          })

          dispatch({
            type: 'query',
          })
        }
      })
    },
  },
}
