import { queryDetail, queryList } from '../services/task'

export default {
  namespace: 'taskDetail',
  state: {
    id: '',
    details: {
      complete_time: null,
      create_time: '',
      id: '',
      name: '',
      progress: 0,
      status: '',
      type: '',
    },
    isExportStaff: false,
    getExportTable: [],
    extend_fields: [],
    fail_records: [],
    success_records: [],
    success_pagination: {
      /* showSizeChanger: true,*/
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    fail_pagination: {
      /* showSizeChanger: true,*/
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  reducers: {
    getExportTable (state, action) {
      return {
        ...state,
        getExportTable: action.payload,
      }
    },
    isExportStaff (state, action) {
      return {
        ...state,
        isExportStaff: action.payload,
      }
    },
    querySuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    querySuccessListSuccess (state, action) {
      const { success_records } = action.payload
      const successPagination = action.payload.success_pagination

      return {
        ...state,
        success_records,
        success_pagination: {
          ...state.success_pagination,
          ...successPagination,
        },
      }
    },
    queryFailListSuccess (state, action) {
      const { fail_records } = action.payload
      const failPagination = action.payload.fail_pagination

      return {
        ...state,
        fail_records,
        fail_pagination: {
          ...state.fail_pagination,
          ...failPagination,
        },
      }
    },
  },
  effects: {
    *queryInfo ({ payload }, { call, put }) {
      const data = yield call(queryDetail, payload)
      if (data && data.status === 'success') {
        if (data.data.details.type === '导出任务') {
          yield put({
            type: 'isExportStaff',
            payload: true,
          })
          yield put({
            type: 'getExportTable',
            payload: data.data.extend_fields,
          })
        } else {
          yield put({
            type: 'isExportStaff',
            payload: false,
          })
        }

        yield put({
          type: 'querySuccess',
          payload: {
            details: data.data.details,
            extend_fields: data.data.extend_fields,
            id: payload.id,
          },
        })
      }
    },
    *querySuccessList ({ payload }, { call, put, select }) {
      const id = yield select(state => state.taskDetail.id)

      const data = yield call(queryList, { type: 'success', id, ...payload })

      if (data && data.status === 'success') {
        yield put({
          type: 'querySuccessListSuccess',
          payload: {
            success_records: data.data.records,
            success_pagination: data.page,
          },
        })
      }
    },
    *queryFailList ({ payload }, { call, put, select }) {
      const id = yield select(state => state.taskDetail.id)

      const data = yield call(queryList, { type: 'fail', id, ...payload })

      if (data && data.status === 'success') {
        yield put({
          type: 'queryFailListSuccess',
          payload: {
            fail_records: data.data.records,
            fail_pagination: data.page,
          },
        })
      }
    },


  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/task/taskDetail') {
          dispatch({
            type: 'queryInfo',
            payload: {
              id: location.query.id,
            },
          })
          dispatch({
            type: 'querySuccessList',
            payload: {
              id: location.query.id,
            },
          })
          dispatch({
            type: 'queryFailList',
            payload: {
              id: location.query.id,
            },
          })
        }
      })
    },
  },
}
