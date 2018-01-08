/**
 * Created by xiaoys on 2017/11/8.
 */
import { queryOrgTree } from '../services/common'
import { customerBdList, employee, assort } from '../services/customerBd'

import { message } from 'antd'

export default {
  namespace: 'customerListBd',
  state: {
    selectedRowKeys: [],
    orgTree: [],
    list: [],
    data: [],
    keys: [],
    searchCodes: {},
    errorP: false,
    loading: false,
    visible: false,
    onHandleStatus: false,
    radios: 0,
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
        if (location.pathname === '/customer/customerList_bd') {
          dispatch({ type: 'List' })
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
    *List ({ payload }, { call, put }) {
      yield put({ type: 'changeLoading', payload: true })
      const data = yield call(customerBdList, payload)
      if (data && data.status === 'success') {
        yield put({
          type: 'saveList',
          payload: data,
        })
        yield put({
          type: 'changeLoading',
          payload: false,
        })
      }
    },
    *onSearch ({ payload }, { put }) {
      yield put({ type: 'searchCode', payload })
      yield put({ type: 'List', payload })
    },
    *assorts ({ payload }, { call, put, select }) {
      let dataCode
      const list = yield select(state => state.customerListBd.selectedRowKeys)
      if (!list.length) {
        const data = yield select(state => state.customerListBd.keys)
        dataCode = { ...payload.data, pre_customer_ids: [data] }
      } else {
        const selectKeys = yield select(state => state.customerListBd.selectedRowKeys)
        dataCode = { ...payload.data, pre_customer_ids: selectKeys }
      }
      const data = yield call(assort, dataCode)
      if (data && data.status === 'success') {
        yield put({ type: 'changeMotal', payload: { modal: false } })
        message.success('分配成功！')
        payload.reset()
        yield put({ type: 'onErrorP', payload: false })
        yield put({ type: 'initData' })
        yield put({ type: 'setSelectedRowKeys', payload: [] })
      }
      yield put({ type: 'List' })
    },
    *onHandleSearch ({ payload }, { call, put }) {
      const params = { ...payload }
      const data = yield call(employee, { ...params })
      if (data && data.status === 'success') {
        if (data.data.length > 0) {
          yield put({
            type: 'pushData',
            payload: data.data,
          })
        }
      }
    },
  },
  reducers: {
    queryOrgTreeSuccess (state, action) {
      return { ...state, orgTree: action.payload }
    },
    saveList (state, action) {
      return { ...state, list: action.payload.data, pagination: { ...state.pagination, ...action.payload.page } }
    },
    changeMotal (state, action) {
      return { ...state, visible: action.payload.modal, keys: action.payload.keys }
    },
    pushData (state, action) {
      return { ...state, data: action.payload }
    },
    initData (state) {
      return { ...state, data: [], keys: [] }
    },
    setSelectedRowKeys (state, action) {
      return { ...state, selectedRowKeys: action.payload }
    },
    searchCode (state, action) {
      return { ...state, searchCodes: action.payload }
    },
    changeLoading (state, action) {
      return { ...state, loading: action.payload }
    },
    onErrorP (state, action) {
      return { ...state, errorP: action.payload }
    },
    changeRadios (state, action) {
      return { ...state, ...action.payload }
    },
  },
}
