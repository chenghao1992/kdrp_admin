import { saveProblems, problemDetail } from '../services/maintainApp'
import { hashHistory } from 'dva/router'

export default {
  namespace: 'commonProblemEdit',
  state: {
    getProblems: '',
    saveProblem: {},
    changeContents: false,
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(location => {
        if (location.pathname === '/maintainApp/commonProblemAdd') {
          dispatch({
            type: 'problemDetail',
          })
        }
      })
    },
  },
  effects: {
    *problemDetail ({ payload }, { put, call }) {
      const data = yield call(problemDetail, payload)
      if (data && data.status === 'success') {
        console.log(data.data)
        if (!data.data.content) {
          yield put({
            type: 'changeContent',
            payload: false,
          })
          data.data.content = ''
        } else {
          yield put({
            type: 'changeContent',
            payload: true,
          })
        }
        yield put({
          type: 'saveProblems',
          payload: data.data,
        })
      }
    },
    *save ({ payload }, { call }) {
      const data = yield call(saveProblems, payload)
      if (data && data.status === 'success') {
        hashHistory.push('/maintainApp/commonProblem')
      }
    },
  },
  reducers: {
    getProblem (state, action) {
      return { ...state, getProblems: action.payload }
    },
    saveProblems (state, action) {
      return { ...state, saveProblem: action.payload }
    },
    changeContent (state, action) {
      return { ...state, changeContents: action.payload }
    },
  },
}
