import { staffInvestLists, staffExport } from '../services/mechanismStaff'
import { queryOrgTree } from '../services/common'
import { message } from 'antd'

import moment from 'moment'

const defaultQuery = {
  start_end_time: '',
  agency_id: '',
  page: 1,
  page_size: 20,
}

export default {
  namespace: 'staffInvestList',
  state: {
    loading: false,
    expand: true,
    queryParam: defaultQuery,
    orgTree: [],
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },
    list: [],
    isReset: false,
    timeValue: [moment(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`, 'YYYY/MM/DD'), moment()],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/mechanismStaff/staffInvestList') {
          defaultQuery.resetFlag = true
          dispatch({
            type: 'onSearch',
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
      }
    },
    *onSearch ({ payload }, { put }) {
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
    *queryList ({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading', payload: { loading: true } })
      const queryData = yield select(state => state.staffInvestList.queryParam)
      const data = yield call(staffInvestLists, { ...queryData, ...payload })
      yield put({ type: 'setReset', payload: false })
      if (data && data.status === 'success') {
        yield put({
          type: 'queryListSuccess',
          payload: {
            list: data.data,
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
    *getDetil ({ payload }, { call, select }) {
      const getNum = yield select(state => state.staffInvestList.queryParam)
      const params = {
        start_end_time: getNum.start_end_time,
        agency_id: getNum.agency_id,
      }
      const data = yield call(staffExport, { ...params })
      if (data && data.status === 'success') {
        message.success('导出任务添加成功，点击任务进行下载和详情查看')
      }
    },
  },
  reducers: {
    queryListSuccess (state, action) {
      const { list, pagination } = action.payload
      return { ...state, list, pagination: { ...state.pagination, ...pagination } }
    },
    showLoading (state, action) {
      return { ...state, ...action.payload }
    },
    queryOrgTreeSuccess (state, action) {
      return { ...state, orgTree: action.payload }
    },
    onToggle (state, action) {
      return { ...state, expand: action.payload }
    },
    setQueryParam (state, action) {
      return { ...state, queryParam: { ...state.queryParam, ...action.payload } }
    },
    setReset (state, action) {
      return { ...state, isReset: action.payload }
    },
  },
}

