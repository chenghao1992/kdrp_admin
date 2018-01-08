import { mechanismStaffList, mechanismStaffImport, searchMechanismStaff, addMechanismStaff, modifyMechanismStaff, deleteMechanismStaff } from '../services/mechanismStaff'

import { queryOrgTree } from '../services/common'

import { message } from 'antd'

const defaultQuery = {
  agency_id: '',
  name: '',
  mobile: '',
  page: 1,
  page_size: 20,
  resetFlag: false,
}

export default {
  namespace: 'mechanismStaffMaintain',
  state: {
    loading: false,
    expand: true,
    fileList: [],
    uploadModalVisible: false,
    addStaffModalVisible: false,
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
    modalType: '',
    currentItem: {},
    onHandleStatus: false,
    data: [],
    regStatus: false,
    isReset: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/mechanismStaff/mechanismStaffMaintain') {
          defaultQuery.resetFlag = true
          dispatch({
            type: 'onSearch',
            payload: defaultQuery,
          })
          dispatch({ type: 'queryOrgTree' })
          dispatch({ type: 'clearAllQuery' })
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
      const queryData = yield select(state => state.mechanismStaffMaintain.queryParam)
      if (payload === 'add') {
        payload = { agency_id: '', name: '', mobile: '' }
        yield put({ type: 'setReset', payload: true })
      } else {
        yield put({ type: 'setReset', payload: false })
      }
      const data = yield call(mechanismStaffList, { ...queryData, ...payload })
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
    *handleAddOrEdit ({ payload }, { call, put }) {
      if (payload.modalTypes === 'newCreat') {
        yield put({
          type: 'addMechanismStaff',
          payload,
        })
      } else {
        const data = yield call(modifyMechanismStaff, { ...payload })
        if (data && data.status === 'success') {
          payload.resetFields()
          yield put({
            type: 'queryList',
          })
          yield put({
            type: 'changeAddStaffStatusModal',
            payload: {
              addStaffModalVisible: false,
            },
          })
        }
      }
    },
    *importStaff ({ payload }, { call, put }) {
      const data = yield call(mechanismStaffImport, { keys: payload })
      if (data && data.status === 'success') {
        message.success('导入客户数据正在执行，请稍后')
        yield put({
          type: 'changeModalStatus',
          payload: false,
        })
      }
    },
    *onDelete ({ payload }, { call, put }) {
      const data = yield call(deleteMechanismStaff, { ...payload })
      if (data && data.status === 'success') {
        yield put({
          type: 'queryList',
        })
      }
    },
    *onHandleSearch ({ payload }, { call, put }) {
      const params = { ...payload }
      const data = yield call(searchMechanismStaff, { ...params })
      if (data && data.status === 'success') {
        yield put({
          type: 'onHandleStatus',
          payload: {
            onHandleStatus: true,
          },
        })
        if (data.data.length > 0) {
          yield put({
            type: 'pushData',
            payload: data.data,
          })
        }
      }
    },
    *addMechanismStaff ({ payload }, { call, put }) {
      const num = payload.data.mobile.indexOf('-')
      payload.data.mobile = payload.data.mobile.slice(0, num)
      const data = yield call(addMechanismStaff, { ...payload.data })
      if (data && data.status === 'success') {
        payload.resetFields()
        yield put({
          type: 'queryList',
          payload: 'add',
        })
        yield put({
          type: 'changeAddStaffStatusModal',
          payload: {
            addStaffModalVisible: false,
          },
        })
      }
    },

  },
  reducers: {
    clearAllQuery (state) {
      return { ...state, regStatus: true }
    },
    showLoading (state, action) {
      return { ...state, ...action.payload }
    },
    pushData (state, action) {
      return { ...state, data: action.payload }
    },
    onHandleStatus (state, action) {
      return { ...state, ...action.payload }
    },
    showModal (state, action) {
      return { ...state, ...action.payload }
    },
    setQueryParam (state, action) {
      return { ...state, queryParam: { ...state.queryParam, ...action.payload } }
    },
    queryListSuccess (state, action) {
      const { list, pagination } = action.payload
      return { ...state, list, pagination: { ...state.pagination, ...pagination } }
    },
    queryOrgTreeSuccess (state, action) {
      return { ...state, orgTree: action.payload }
    },
    onToggle (state, action) {
      return { ...state, expand: action.payload }
    },
    changeModalStatus (state, action) {
      return { ...state, uploadModalVisible: action.payload }
    },
    changeAddStaffStatusModal (state, action) {
      return { ...state, ...action.payload }
    },
    setFileList (state, action) {
      return { ...state, fileList: action.payload }
    },
    setReset (state, action) {
      return { ...state, isReset: action.payload }
    },
  },
}
