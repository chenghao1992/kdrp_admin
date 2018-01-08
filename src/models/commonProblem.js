import { saveProblems, problemDetail } from '../services/maintainApp'
import { hashHistory } from 'dva/router'

export default {
  namespace: 'commonProblem',
  state: {
    getProblems: '',
    saveProblem: {},
    changeContents: false,
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(location => {
        if (location.pathname === '/maintainApp/commonProblem') {
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
        let res = data.data
        if (!res.content) {
          yield put({
            type: 'changeContent',
            payload: false,
          })
          res.content = ''
        } else {
          yield put({
            type: 'changeContent',
            payload: true,
          })
        }
        console.log(res)
        yield put({
          type: 'saveProblems',
          payload: res,
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
