import { queryCs, commit } from '../services/customerMng'


import { message } from 'antd'


export default {
  namespace: 'customerListCs',
  state: {
    commitModalVisible: false,
    list: [],
    loading: false,
    orgTree: [],
    query: {
      'agency.idList': [],

    },
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
    batchCommit (state) {
      return {
        ...state,
        commitModalVisible: true,
      }
    },

    commit (state, action) {
      return {
        ...state,
        selectedRowKeys: action.payload.selectedRowKeys,
        commitModalVisible: true,
      }
    },

    commitModelHide (state) {
      return {
        ...state,
        commitModalVisible: false,
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
      const queryData = yield select(state => state.customerListCs.query)
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
      const queryData = yield select(state => state.customerListCs.query)
      queryData['agency.id'] = queryData['agency.idList'] && queryData['agency.idList'][queryData['agency.idList'].length - 1]

      const realQuery = {
        ...queryData,
        ...payload,
      }

      yield put({
        type: 'setQuery',
        payload: realQuery,
      })

      const data = yield call(queryCs, realQuery)

      if (data && data.status === 'success') {
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

    *commitAsync ({ payload }, { call, put, select }) {
      const selectedRowKeys = yield select(state => state.customerListCs.selectedRowKeys)
      const data = yield call(commit, { customer_ids: selectedRowKeys })
      if (data && data.status === 'success') {
        message.success('上交成功')
        yield put({
          type: 'query',
        })
        yield put({
          type: 'commitModelHide',
        })
      }
    },

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/customer/customerList_cs') {
          dispatch({
            type: 'clearAllQuery',
          })
        }
      })
    },
  },
}
