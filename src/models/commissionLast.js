import { queryListLast } from '../services/commissionLast'

import { trans2arr } from '../utils/index'
import moment from 'moment'
const initDate = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}~${moment().format('YYYY-MM-DD')}`
const initQuery = {
  start_end_time: initDate,
}
export default {
  namespace: 'commissionLast',
  state: {
    loading: false,
    list: [],
    queryParam: {
      start_end_time: initDate,
    },
    expand: true,
    isReset: false,
    timeValue: [moment().subtract(1, 'days'), moment()],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/report/report_person') {
          initQuery.resetFlag = true
          dispatch({ type: 'search', payload: initQuery })
        }
      })
    },
  },
  effects: {
    *search ({ payload }, { put }) {
      if (payload.resetFlag !== undefined) {
        yield put({ type: 'setReset', payload: true })
        delete payload.resetFlag
      }
      yield put({
        type: 'setQueryParam',
        payload,
      })
      yield put({
        type: 'queryList',
      })
    },
    *queryList ({
      payload,
    }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const queryData = yield select(state => state.commissionLast.queryParam)
      const data = yield call(queryListLast, { ...queryData, ...payload })
      yield put({ type: 'setReset', payload: false })
      if (data && data.status === 'success') {
        const dataArr = trans2arr([data.data])
        yield put({
          type: 'queryListSuccess',
          payload: {
            list: dataArr,
          },
        })
      }
    },
  },
  reducers: {
    onToggle (state, action) {
      return { ...state, expand: action.payload }
    },
    showLoading (state) {
      return { ...state, loading: true }
    },
    queryListSuccess (state, action) {
      const { list } = action.payload
      return {
        ...state,
        list,
        loading: false,
      }
    },
    setQueryParam (state, action) {
      return {
        ...state,
        queryParam: action.payload,
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
