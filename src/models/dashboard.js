import { query, queryIncomeBar, detailperson } from '../services/dashboard'
import { queryUserInfo } from '../services/app'
import { parse } from 'qs'
import { rolesCode } from '../utils/index'

import img1 from '../../assets/user.png'

export default {
  namespace: 'dashboard',
  state: {
    loading: false,
    barCharts: { datas: [], days: [] },
    isloadBar: false,
    totalData: [],
    personText: {
      personagree: false,
      personUrl: '',
      personName: '',
    },
    changeHeightOfNumCard: true,
    personAgree: false,
    isChannelBusiness: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/dashboard' || location.pathname === '/') {
          dispatch({ type: 'reloadBarChart' })
          dispatch({ type: 'query', payload: location.query })
          dispatch({ type: 'detailperson' })
        }
      })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      let data = yield call(query, parse(payload))
      if (data.status === 'success') {
        yield put({ type: 'querySuccess', payload: { totalData: data.data } })
        if (data.data[0] && data.data[0].type === 'statistics' && data.data[0].args.data.length > 6) {
          yield put({
            type: 'changeHeightOfNumCard',
          })
        }
      }
    },
    *queryIncomeBar ({ payload }, { call, put }) {
      const data = yield call(queryIncomeBar, payload)
      if (data.status === 'success') {
        yield put({ type: 'queryBarSuccess', payload: { barCharts: data.data } })
      }
    },
    *detailperson ({ payload }, { call, put }) {
      // const listData = yield select(state => state.app)
      const data = yield call(queryUserInfo, { path: '/dashboard' })
      if (data.status === 'success') {
        const queryData = data.data
        yield put({
          type: 'personUrls',
          payload: {
            personUrl: queryData.user.avatar ? queryData.user.avatar : img1,
            personName: queryData.user.real_name,
            personId: queryData.user.id,
          },
        })

        if (queryData.roles.length > 0) {
          if (rolesCode(queryData.roles) === 'channel_business') {
            yield put({
              type: 'isChannelBusiness',
              payload: true,
            })
            const detailpersonData = yield call(detailperson)
            if (detailpersonData && detailpersonData.status === 'success') {
              yield put({
                type: 'personAgree',
                payload: {
                  personAgree: detailpersonData.data.personal_info.agreement_label,
                },
              })
            }
          } else {
            yield put({
              type: 'isChannelBusiness',
              payload: false,
            })
          }
        }
      }
    },
  },
  reducers: {
    isChannelBusiness (state, action) {
      return { ...state, isChannelBusiness: action.payload }
    },
    changeHeightOfNumCard (state) {
      return { ...state, changeHeightOfNumCard: false }
    },
    personAgree (state, action) {
      return { ...state, ...action.payload }
    },
    personUrls (state, action) {
      return { ...state, personText: action.payload }
    },
    querySuccess (state, action) {
      const { totalData } = action.payload
      return {
        ...state,
        totalData,
      }
    },
    reloadBarChart (state) {
      return {
        ...state,
        isloadBar: false,
      }
    },
    queryBarSuccess (state, action) {
      const { barCharts } = action.payload
      return {
        ...state,
        barCharts,
        isloadBar: true,
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true,
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false,
      }
    },
  },
}
