import { articlesDetail } from '../services/maintainApp'

export default {
  namespace: 'showArticle',
  state: {
    getDetailList: {},
    codes: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/maintainApp/showArticle') {
          dispatch({
            type: 'clearData',
            payload: {},
          })
          dispatch({
            type: 'articlesDetail',
            payload: location.query.id,
          })
          dispatch({
            type: 'code',
            payload: {
              username: location.query.username,
            },
          })
        }
      })
    },
  },
  effects: {
    *articlesDetail ({ payload }, { call, put }) {
      const data = yield call(articlesDetail, payload)
      if (data && data.status === 'success') {
        yield put({
          type: 'getDetail',
          payload: data.data,
        })
      }
    },
  },
  reducers: {
    getDetail (state, action) {
      return { ...state, getDetailList: action.payload }
    },
    code (state, action) {
      return { ...state, codes: action.payload }
    },
    clearData (state, action) {
      return { ...state, getDetailList: action.payload }
    },
  },
}

