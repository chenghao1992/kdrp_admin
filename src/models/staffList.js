import { queryListAudit, create, update, sendItem } from '../services/satffList'
import { queryOrgTree } from '../services/common'

const defaultQuery = {
  name: '',
  mobile: '',
  status: '',
  agency_id: '',
  start_end_time: '',
  page: 1,
  page_size: 20,
}

export default {
  namespace: 'staffList',
  state: {
    orgTree: [],
    stateOption: [],
    queryParam: defaultQuery,
    selectedRowKeys: [],
    loading: false,
    list: [],
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },
    param: {},
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isResult: {},
    timeList: {},
    expand: true,
    isReset: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/staff/staffList') {
          defaultQuery.resetFlag = true
          dispatch({
            type: 'search',
            payload: defaultQuery,
          })
          dispatch({ type: 'queryOrgTree' })
        }
      })
    },
  },
  effects: {
    *queryOrgTree ({ payload }, { call, put }) {
      const data = yield call(queryOrgTree)
      if (data && data.status === 'success') {
        yield put({ type: 'queryOrgTreeSuccess', payload: data.data })
        /* const firstNode = [];
        firstNode.push(data.data[0]["value"]);
        yield put({type: 'initOrgTreeValue', payload: firstNode})*/
      }
    },
    *queryList ({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const queryData = yield select(state => state.staffList.queryParam)
      const data = yield call(queryListAudit, { ...queryData, ...payload })
      yield put({ type: 'setReset', payload: false })
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
    *search ({ payload }, { put }) {
      if (payload.resetFlag !== undefined) {
        yield put({ type: 'setReset', payload: true })
        delete payload.resetFlag
      } else {
        yield put({ type: 'setReset', payload: false })
      }
      yield put({
        type: 'setQueryParam',
        payload,
      })
      yield put({
        type: 'queryList',
      })
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(create, payload)
      if (data && data.status === 'success') {
        localStorage.setItem('get', 1)
        yield put({ type: 'hideModal' })
        const datas = yield call(queryListAudit)
        yield put({
          type: 'querySuccess',
          payload: {
            list: datas.data,
            pagination: {
              total: datas.page.total,
              current: datas.page.current,
            },
          },
        })
      } else if (data.status === 'error') {
        yield put({
          type: 'sendLoading',
        })
      }
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' })
      const id = yield select(({ staffList }) => staffList.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      // console.log('update');
      // console.log(payload)
      if (data && data.status === 'success') {
        yield put({ type: 'hideModal' })
        localStorage.setItem('get', 1)
        const queryListAuditData = yield call(queryListAudit)
        yield put({
          type: 'querySuccess',
          payload: {
            list: queryListAuditData.data,
            pagination: {
              total: queryListAuditData.page.total,
              current: queryListAuditData.page.current,
            },
          },
        })
      } else if (data.status === 'error') {
        yield put({
          type: 'sendLoading',
        })
      }
    },
    *sendItem ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const data = yield call(sendItem, payload)
      if (data && data.status === 'success') {
        yield put({
          type: 'sendLoading',
        })
      } else if (data.status === 'error') {
        yield put({
          type: 'sendLoading',
        })
      }
    },
  },
  reducers: {
    onToggle (state, action) {
      return { ...state, expand: action.payload }
    },
    showLoading (state) {
      return { ...state, loading: true }
    },
    sendLoading (state) {
      return { ...state, loading: false }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    /* changeTimer (state, action) {
       state.timeArr[action.index]={...action.payload};
       return { ...state}
    },*/
    queryOrgTreeSuccess (state, action) {
      return { ...state, orgTree: action.payload }
    },
    setQueryParam (state, action) {
      return {
        ...state,
        queryParam: {
          ...state.queryParam,
          ...action.payload,
        },
      }
    },
    querySuccess (state, action) {
      const { list, pagination } = action.payload
      return {
        ...state, list, loading: false,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
    queryListSuccess (state, action) {
      const { list, pagination, orgnid } = action.payload
      return {
        ...state, orgnid, list, loading: false,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
    initOrgTreeValue (state, action) {
      return {
        ...state,
        queryParam: {
          ...state.queryParam,
          orgTreeValue: action.payload,
        },
      }
    },
    changeID (state, action) {
      return {
        ...state,
        timeList: {
          ...state.timeList,
          ...action.payload,
          // ...state.timeList,
          // [action.payload]:{
          //   seconds:60,
          // }
        },
      }
    },
    setReset (state, action) {
      return {
        ...state,
        isReset: action.payload,
      }
    },
  },
}
