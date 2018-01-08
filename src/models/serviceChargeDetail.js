import { queryList } from '../services/serviceChargeDetail'

export default {
  namespace: 'serviceChargeDetail',
  state: {
    loading: false,
    list: [],
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    pagination: {
      /* showSizeChanger: true,*/
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },
    queryParam: {
      page: 1,
      page_size: 20,
      bill_uuid: '',
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/servicecharge/extraDetail') {
          dispatch({ type: 'search', payload: location.query })
        }
      })
    },
  },
  effects: {
    *search ({ payload }, { put }) {
      yield put({
        type: 'setQueryParam',
        payload,
      })
      yield put({
        type: 'queryList',
      })
    },
    *queryList ({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const queryData = yield select(state => state.serviceChargeDetail.queryParam)
      const data = yield call(queryList, { ...queryData, ...payload })
      if (data && data.status === 'success') {
        yield put({
          type: 'queryListSuccess',
          payload: {
            list: data.data,
            pagination: data.page,
          },
        })
      }
    },
  },
  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    setQueryParam (state, action) {
      return {
        ...state,
        queryParam: action.payload,
      }
    },
    queryListSuccess (state, action) {
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
}
