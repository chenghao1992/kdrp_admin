import { columnList, addColumn, editColumn, deleteColumn } from '../services/maintainApp'

const defaultQuery = {
  page: 1,
  page_size: 20,
}

export default {
  namespace: 'consultationColumn',
  state: {
    loading: false,
    addVisible: false,
    queryParam: defaultQuery,
    type: '',
    list: [],
    motalItem: {},
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },

  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(location => {
        if (location.pathname === '/maintainApp/consultationColumn') {
          dispatch({
            type: 'columnList',
            payload: {
              page: 1,
              page_size: 20,
              resetFlag: false,
            },
          })
        }
      })
    },
  },
  effects: {
    *columnList ({ payload }, { call, put }) {
      yield put({ type: 'showLoading', payload: { loading: true } })
      const data = yield call(columnList, payload)
      if (data && data.status === 'success') {
        let datas = data.data
        for (let i = 0; i < datas.length; i ++) {
          if (!datas[i].article_count) {
            datas[i].article_count = 0
          }
        }
        yield put({
          type: 'list',
          payload: datas,
        })

        yield put({
          type: 'queryListSuccess',
          payload: {
            pagination: data.page,
          },
        })

        yield put({
          type: 'showLoading',
          payload: {
            loading: false,
          },
        })
      }
    },
    *create ({ payload }, { call, put }) {
      console.log(payload)
      const data = yield call(addColumn, payload.datas)
      if (data && data.status === 'success') {
        payload.reset()
        yield put({
          type: 'addVisible',
          payload: false,
        })
        yield put({
          type: 'columnList',
        })
      }
    },
    *onDelete ({ payload }, { call, put }) {
      const data = yield call(deleteColumn, payload)
      if (data && data.status === 'success') {
        yield put({
          type: 'columnList',
        })
      }
    },
    *edit ({ payload }, { call, put }) {
      console.log(payload)
      const data = yield call(editColumn, payload.datas)
      if (data && data.status === 'success') {
        payload.reset()
        yield put({
          type: 'addVisible',
          payload: false,
        })
        yield put({
          type: 'columnList',
        })
      }
    },
  },
  reducers: {
    addVisible (state, action) {
      return { ...state, addVisible: action.payload }
    },
    changeStatus (state, action) {
      return { ...state, type: action.payload }
    },
    list (state, action) {
      return { ...state, list: action.payload }
    },
    onEdit (state, action) {
      return { ...state, addVisible: true, motalItem: action.payload }
    },
    showLoading (state, action) {
      return { ...state, ...action.payload }
    },
    queryListSuccess (state, action) {
      const { pagination } = action.payload
      return { ...state, pagination: { ...state.pagination, ...pagination } }
    },
  },
}
