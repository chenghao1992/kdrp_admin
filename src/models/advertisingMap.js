import { addMap, mapList, editMap } from '../services/maintainApp'

const defaultQuery = {
  page: 1,
  page_size: 20,
  resetFlag: false,
}
export default {
  namespace: 'advertisingMap',
  state: {
    loading: false,
    addVisible: false,
    type: '',
    fileList: [],
    imgUrl: '',
    listMaps: [],
    item: {},
    queryParam: defaultQuery,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/maintainApp/advertisingMap') {
          dispatch({
            type: 'mapList',
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
    *mapList ({ payload }, { call, put }) {
      console.log(payload)
      yield put({ type: 'showLoading', payload: { loading: true } })
      const data = yield call(mapList, payload)
      if (data && data.status === 'success') {
        console.log(data.data)
        yield put({
          type: 'listMap',
          payload: data.data,
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
      const data = yield call(addMap, payload.data)
      if (data && data.status === 'success') {
        payload.reset()
        yield put({
          type: 'addVisible',
          payload: false,
        })
        yield put({
          type: 'imgUrls',
          payload: '',
        })
        yield put({
          type: 'setFileListNum',
          payload: [],
        })
        yield put({
          type: 'mapList',
          payload: defaultQuery,
        })
      }
    },
    *edit ({ payload }, { call, put }) {
      const data = yield call(editMap, payload.data)
      if (data && data.status === 'success') {
        payload.reset()
        yield put({
          type: 'addVisible',
          payload: false,
        })
        yield put({
          type: 'mapList',
          payload: defaultQuery,
        })
      }
    },
  },
  reducers: {
    addVisible (state, action) {
      return { ...state, addVisible: action.payload }
    },
    changeStatus (state, action) {
      return { ...state, type: action.payload, fileList: [] }
    },
    setFileListNum (state, action) {
      return { ...state, fileList: action.payload }
    },
    imgUrls (state, action) {
      return { ...state, imgUrl: action.payload }
    },
    listMap (state, action) {
      return { ...state, listMaps: action.payload }
    },
    onEdit (state, action) {
      return { ...state, addVisible: true, item: action.payload.data, type: 'edit', fileList: action.payload.fileItem }
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
