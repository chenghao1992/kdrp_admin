import { batchPass, queryListAudit } from '../services/costAudit'
import { queryOrgTree } from '../services/common'
import { message } from 'antd'

import { parse } from 'qs'


import moment from 'moment'
const initDate = moment().subtract(1, 'months').format('YYYY-MM')
const initParam = {
  bill_month: initDate,
  agency_id: '',
  agency_code: '',
  user_mobile: '',
  username: '',
  status: '',
  page: 1,
  page_size: 20,
}
export default {
  namespace: 'costAudit',
  state: {
    orgTree: [],
    stateOption: [],
    loading: false,
    selectedRowKeys: [],
    list: [],
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
      agency_id: '',
      bill_month: initDate,
    },
    expand: true,
    isReset: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cost/costAudit') {
          initParam.resetFlag = true
          dispatch({ type: 'search', payload: initParam })
          dispatch({ type: 'queryOrgTree' })
        }
      })
    },
  },
  effects: {
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
    *queryOrgTree ({ payload }, { call, put }) {
      const data = yield call(queryOrgTree)
      if (data && data.status === 'success') {
        yield put({ type: 'queryOrgTreeSuccess', payload: data.data })

        const firstNode = []
        firstNode.push(data.data[0].value)
        yield put({ type: 'initOrgTreeValue', payload: firstNode })
      }
    },
    *queryList ({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const queryData = yield select(state => state.costAudit.queryParam)
      const data = yield call(queryListAudit, { ...queryData, ...payload })

      yield put({ type: 'setReset', payload: false })

      if (data && data.status === 'success') {
        yield put({ type: 'queryListSuccess', payload: {
          list: data.data,
          pagination: data.page,
        },
        })
      }
    },
    *batchAction ({
      payload,
    }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(batchPass, parse(payload))
      if (data && data.status === 'success') {
        message.success('操作成功！')
        yield put({
          type: 'queryList',
        })
      } else {
        yield put({
          type: 'queryList',
        })
      }
    },
    *changeSelectedRowKeys ({ payload }, { put }) {
      yield put({
        type: 'setSelectedRowKeys',
        payload,
      })
    },
  },
  reducers: {
    onToggle (state, action) {
      return { ...state, expand: action.payload }
    },
    queryOrgTreeSuccess (state, action) {
      return {
        ...state,
        orgTree: action.payload,
      }
    },
    queryListSuccess (state, action) {
      const { list, pagination } = action.payload
      return {
        ...state,
        list,
        loading: false,
        selectedRowKeys: [],
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
    batchPassSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        selectedRowKeys: [],
      }
    },
    showLoading (state) {
      return { ...state, loading: true }
    },
    initOrgTreeValue (state) {
      return {
        ...state,
        queryParam: {
          ...state.queryParam,
          orgTreeValue: [],
          agency_id: '',
        },
      }
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
    setSelectedRowKeys (state, action) {
      return {
        ...state,
        selectedRowKeys: action.payload,
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
