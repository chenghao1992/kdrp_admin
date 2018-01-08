import { query } from '../services/orgPermissions'
import { queryOrgTree } from '../services/common'

import { findPathInTree } from '../utils/index'

const defaultQuery = {
  status: '',
  idList: [],
  start_end_time: '',
  name: '',
  'manager.username': '',
  'manager.real_name': '',
  page: 1,
  page_size: 20,
}

export default {
  namespace: 'orgPermissionsLo',
  state: {
    list: [],
    loading: false,
    orgTree: [],
    query: defaultQuery,
    preQuery: {
      idList: [],
    },
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
    resetOrg (state) {
      return { ...state, resetOrg: true }
    },
    setOrg (state, action) {
      return {
        ...state,
        query: {
          ...state.query,
          idList: action.payload,
        },
      }
    },
    querySuccess (state, action) {
      const { list, pagination } = action.payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
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
    setPreQuery (state, action) {
      return {
        ...state,
        preQuery: action.payload,
      }
    },
    clearAllQuery (state) {
      return {
        ...state,
        query: [],
        preQuery: [],
        resetOrg: true,
      }
    },
    initIdList (state, action) {
      return {
        ...state,
        query: {
          ...state.query,
          idList: action.payload,
        },
      }
    },
    resetOrgTree (state) {
      return {
        ...state,
        query: {
          ...state.query,
          idList: [],
        },
        resetOrg: false,
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
      // const queryData = yield  select(state => state.orgPermissionsLo.query);
      const orgTree = yield select(state => state.orgPermissionsLo.orgTree)

      const path = findPathInTree(payload, orgTree, 'value')

      // queryData.idList=path;
      /* yield put({
       type: 'resetOrg'
       })*/
      yield put({
        type: 'setPreQuery',
        payload: {
          idList: path,
        },
      })
      /* yield put({
       type: 'query',
       })*/
    },
    *queryByPreQuery ({ payload }, { put, select }) {
      const queryData = yield select(state => state.orgPermissionsLo.query)
      const preQueryData = yield select(state => state.orgPermissionsLo.preQuery)
      yield put({
        type: 'setQuery',
        payload: {
          ...queryData,
          ...preQueryData,
        },
      })
      yield put({
        type: 'query',
      })
    },

    *query ({ payload }, { call, put, select }) {
      const queryData = yield select(state => state.orgPermissionsLo.query)
      queryData.id = queryData.idList && queryData.idList[queryData.idList.length - 1]

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
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page,
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

        const firstNode = []
        firstNode.push(data.data[0].value)
        // todo realy needed?
        /* yield put({
         type: 'initIdList',
         payload: firstNode
         })
         */
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/orgPermissions/orgPermission_lo') {
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
