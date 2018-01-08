import { addRule, editRule, deleteRule, query } from '../services/feeRule'

export default {
  namespace: 'feeRule',
  state: {
    channel_id: '',
    addRule: {
      show: false,
      data: {
        name: '',
      },
    },
    feeRules: [],
    channel: {},
  },
  reducers: {
    updateFeeRules (state, action) {
      return { ...state, feeRules: action.payload.feeRules }
    },
    addCancel (state) {
      return { ...state, addRule: { ...state.addRule, show: false } }
    },
    addRule (state) {
      return { ...state, addRule: { ...state.addRule, show: true } }
    },
    setId (state, action) {
      return { ...state, channel_id: action.payload.channel_id }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
  },
  effects: {
    *editOrView ({ payload }, { put, select }) {
      const ruleId = payload.ruleId
      const feeRules = yield select(state => state.feeRule.feeRules)

      for (let i = 0; i < feeRules.length; i++) {
        if (feeRules[i].id === ruleId) {
          feeRules[i].status = payload.type
          break
        }
      }

      yield put({
        type: 'updateFeeRules',
        payload: {
          feeRules,
        },
      })
    },

    *query ({ payload }, { call, put, select }) {
      if (payload) {
        yield put({
          type: 'setId',
          payload,
        })
      }
      const id = yield select(state => state.feeRule.channel_id)
      const data = yield call(query, { ...payload, channel_id: id })
      if (data && data.status === 'success') {
        const result = data.data
        const processData = {
          channel: result.channel,
        }
        processData.feeRules = result.fee_rules.map(d => {
          return {
            ...d,
            status: 'view',
          }
        })

        yield put({
          type: 'querySuccess',
          payload: processData,
        })
      }
    },

    *addRuleSync ({ payload }, { call, put, select }) {
      const id = yield select(state => state.feeRule.channel_id)
      const data = yield call(addRule, { ...payload, channel_id: id })

      if (data && data.status === 'success') {
        yield put({
          type: 'addCancel',
        })
        yield put({
          type: 'query',
        })
      }
    },

    *editRuleSync ({ payload }, { call, put, select }) {
      const id = yield select(state => state.feeRule.channel_id)
      const data = yield call(editRule, { ...payload, channel_id: id })
      if (data && data.status === 'success') {
        yield put({
          type: 'query',
        })
      }
    },

    *deleteRuleSync ({ payload }, { call, put, select }) {
      const id = yield select(state => state.feeRule.channel_id)
      const data = yield call(deleteRule, { ...payload, channel_id: id })
      if (data && data.status === 'success') {
        yield put({
          type: 'query',
        })
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        // 进入页面，通过query.id查询渠道信息，将id存入state
        if (location.pathname === '/channel/feeRule') {
          dispatch({
            type: 'query',
            payload: {
              channel_id: location.query.id,
            },
          })
        }
      })
    },
  },
}
