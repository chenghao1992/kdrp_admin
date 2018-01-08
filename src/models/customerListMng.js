import { query, assort, retrieve, redistribute, importCustomer } from '../services/customerMng'
import { queryOrgTree } from '../services/common'

import { message } from 'antd'

const defaultQuery = {
  'agency.idList': [],
  'agency.code': '',
  'agency.name': '',
  'service.mobile': '',
  'service.name': '',
  'customer.service_status': '',
  'customer.name': '',
  'customer.mobile': '',
  page: 1,
  page_size: 20,
}


export default {
  namespace: 'customerListMng',
  state: {
    uploadModalVisible: false,
    distributeModalVisible: false,
    recoveryModalVisible: false,
    redistributeModalVisible: false,
    list: [],
    loading: false,
    orgTree: [],
    query: defaultQuery,
    selectedRowKeys: [],
    pagination: {
      /* showSizeChanger: true,*/
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    expand: true,
    resetOrg: false,
    uploadFilenames: [],
    fileList: [],
  },
  reducers: {
    onToggle (state, action) {
      return { ...state, expand: action.payload }
    },
    querySuccess (state, action) {
      const { list, pagination, selectedRowKeys } = action.payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        selectedRowKeys,
      }
    },
    queryOrgTreeSuccess (state, action) {
      return {
        ...state,
        orgTree: action.payload,
      }
    },
    setQuery (state, action) {
      return {
        ...state,
        query: action.payload,
      }
    },
    setSelectedRowKeys (state, action) {
      return {
        ...state,
        selectedRowKeys: action.payload.selectedRowKeys,
      }
    },
    initIdList (state, action) {
      return {
        ...state,
        query: {
          ...state.query,
          'agency.idList': action.payload,
        },
      }
    },
    batchDistribute (state) {
      return {
        ...state,
        distributeModalVisible: true,
      }
    },
    batchRecovery (state) {
      return {
        ...state,
        recoveryModalVisible: true,
      }
    },
    distribute (state, action) {
      return {
        ...state,
        selectedRowKeys: action.payload.selectedRowKeys,
        distributeModalVisible: true,
      }
    },
    recovery (state, action) {
      return {
        ...state,
        selectedRowKeys: action.payload.selectedRowKeys,
        recoveryModalVisible: true,

      }
    },
    redistribute (state) {
      return {
        ...state,
        redistributeModalVisible: true,
      }
    },
    upload (state) {
      return {
        ...state,
        uploadModalVisible: true,
      }
    },
    distributeModelHide (state) {
      return {
        ...state,
        distributeModalVisible: false,
      }
    },
    uploadModelHide (state) {
      return {
        ...state,
        uploadModalVisible: false,
        fileList: [],
      }
    },
    recoveryModelHide (state) {
      return {
        ...state,
        recoveryModalVisible: false,
      }
    },
    redistributeModelHide (state) {
      return {
        ...state,
        redistributeModalVisible: false,
      }
    },
    putFilenames (state, action) {
      return {
        ...state,
        uploadFilenames: action.payload,
      }
    },
    setFileList (state, action) {
      return {
        ...state,
        fileList: action.payload,
      }
    },
    resetOrgTree (state) {
      return {
        ...state,
        query: {
          ...state.query,
          'agency.idList': [],

        },
        resetOrg: false,
      }
    },

    clearAllQuery (state) {
      return {
        ...state,
        query: [],
        // preQuery: [],
        resetOrg: true,
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
    *changeOrg ({ payload }, { put, select }) {
      const queryData = yield select(state => state.customerListMng.query)
      queryData['agency.idList'].push(payload)

      yield put({
        type: 'setQuery',
        payload: queryData,
      })
      yield put({
        type: 'query',
      })
    },

    *query ({ payload }, { call, put, select }) {
      const queryData = yield select(state => state.customerListMng.query)
      queryData['agency.id'] = queryData['agency.idList'] && queryData['agency.idList'][queryData['agency.idList'].length - 1]
      const realQuery = {
        ...queryData,
        ...payload,
      }

      yield put({
        type: 'setQuery',
        payload: realQuery,
      })

      const data = yield call(query, realQuery)

      if (data && data.status === 'success') {
        console.log(data)
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page,
            selectedRowKeys: [],
          },
        })
      }
    },
    *queryOrgTree ({ payload }, { call, put }) {
      const data = yield call(queryOrgTree)
      if (data && data.status === 'success') {
        yield put({
          type: 'queryOrgTreeSuccess',
          payload: data.data,
        })
        // TODO 注释掉,组织树为空的时候,会报错
        // const firstNode = []
        // firstNode.push(data.data[0].value)

        /* //todo realy needed?
         yield put({
         type: 'initIdList',
         payload: firstNode
         })*/
      }
    },
    *distributeAsync ({ payload }, { call, put, select }) {
      const selectedRowKeys = yield select(state => state.customerListMng.selectedRowKeys)
      const data = yield call(assort, { ...payload, customer_ids: selectedRowKeys })
      if (data && data.status === 'success') {
        message.success('分配成功')
        yield put({
          type: 'query',
        })
        yield put({
          type: 'distributeModelHide',
        })
      }
    },
    *recoveryAsync ({ payload }, { call, put, select }) {
      const selectedRowKeys = yield select(state => state.customerListMng.selectedRowKeys)
      const data = yield call(retrieve, { ...payload, customer_ids: selectedRowKeys })
      if (data && data.status === 'success') {
        message.success('回收成功')
        yield put({
          type: 'query',
        })
        yield put({
          type: 'recoveryModelHide',
        })
      }
    },
    *redistributeAsync ({ payload }, { call, put }) {
      const data = yield call(redistribute, payload)
      if (data && data.status === 'success') {
        message.success('转移成功')
        yield put({
          type: 'query',
        })
        yield put({
          type: 'redistributeModelHide',
        })
      }
    },
    *importCustomer ({ payload }, { call, put }) {
      // const uploadFilenames = yield  select(state => state.customerListMng.uploadFilenames);

      const data = yield call(importCustomer, { keys: payload })
      if (data && data.status === 'success') {
        message.success('导入客户数据正在执行，请稍后')

        // todo hide的时候目测要清除model内的已上传列表
        yield put({
          type: 'uploadModelHide',
        })
      }
    },

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/customer/customerList_mng') {
          dispatch({
            type: 'clearAllQuery',
          })

          dispatch({
            type: 'queryOrgTree',
          })
        }
      })
    },
  },
}
