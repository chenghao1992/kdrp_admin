import { query, queryLeaders, distributeBm } from '../services/partner'
import { message } from 'antd'


export default {
  namespace: 'partner',
  state: {
    list: [],
    loading: false,
    pagination: {
      showTotal: total => `共 ${total} 条`,
      showQuickJumper: true,
      current: 1,
      total: null,
    },
    expand: true,
    leaders: [],
    currentLeaderId: '',
    currentChannelId: '',
    bmModalVisible: false,
    query: {},
  },
  reducers: {
    onToggle (state, action) {
      return { ...state, expand: action.payload }
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
    queryLeadersSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    setQuery (state, action) {
      return {
        ...state,
        query: action.payload,
      }
    },
    bMModelHide (state) {
      return {
        ...state,
        bmModalVisible: false,
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
    *query ({ payload }, { call, put, select }) {
      const queryData = yield select(state => state.partner.query)

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
    *queryDistributeBm ({ payload }, { call, put }) {
      const { currentLeaderId, currentChannelId } = payload

      const data = yield call(queryLeaders)

      if (data && data.status === 'success') {
        yield put({
          type: 'queryLeadersSuccess',
          payload: {
            leaders: data.data,
            currentLeaderId,
            currentChannelId,
            bmModalVisible: true,
          },
        })
      }
    },
    *distributeBm ({ payload }, { call, put, select }) {
      const currentChannelId = yield select(state => state.partner.currentChannelId)

      const { leaderId } = payload.data
      const { resetFields } = payload

      const data = yield call(distributeBm, { leader_id: leaderId, currentChannelId })

      if (data && data.status === 'success') {
        message.success('指定成功')

        yield put({
          type: 'query',
        })

        yield put({
          type: 'queryLeadersSuccess',
          payload: {
            bmModalVisible: false,
            currentLeaderId: '',
            leaders: [],
            currentChannelId: '',
          },
        })

        resetFields()
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/channel/partner') {
          dispatch({
            type: 'search',
            payload: location.query,
          })
        }
      })
    },
  },
}
