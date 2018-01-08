import { query } from '../services/orgnizitionManage'

export default {
  namespace: 'selectOrgnizition',
  state: {
    options: [],
  },
  reducers: {
    querySuccess (state, action) {
      return { state, ...action.payload }
    },
  },
  effects: {
    *query ({
      payload,
    }, { put, call }) {
      const args = payload
      const data = yield call(query, args)

      if (data && data.status === 'success') {
        yield put({
          type: 'querySuccess',
          payload: {
            options: data.data,
          },
        })
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.query.queryOrgnizition === '1') {
          dispatch({
            type: 'query',
            payload: {
              id: location.query.id,
            },
          })
        }
      })
    },


  },
}
