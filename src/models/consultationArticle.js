import { hashHistory } from 'dva/router'
import { articlesList, deleteArticles } from '../services/maintainApp'

const defaultQuery = {
  page: 1,
  page_size: 20,
  resetFlag: false,
}

export default {
  namespace: 'consultationArticle',
  state: {
    loading: false,
    fileList: [],
    imageUrl: '',
    changeEidts: '',
    list: [],
    articleDetails: {},
    queryParam: defaultQuery,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(location => {
        if (location.pathname === '/maintainApp/consultationArticle') {
          dispatch({
            type: 'articlesList',
            payload: {
              page: 1,
              page_size: 20,
              resetFlag: false,
            },
          })
        }
      })
    },
  },
  effects: {
    *articlesList ({ payload }, { put, call }) {
      yield put({ type: 'showLoading', payload: { loading: true } })
      const data = yield call(articlesList, payload)
      if (data && data.status === 'success') {
        const datas = data.data
        for (let i = 0; i < datas.length; i ++) {
          if (!datas[i].catalog_name) {
            datas[i].catalog_name = ''
          }
          if (!datas[i].catalog_slug) {
            datas[i].catalog_slug = ''
          }
        }
        yield put({
          type: 'queryListSuccess',
          payload: {
            pagination: data.page,
          },
        })

        yield put({
          type: 'changeList',
          payload: datas,
        })
        yield put({
          type: 'showLoading',
          payload: {
            loading: false,
          },
        })
      }
    },
    *onDelete ({ payload }, { put, call }) {
      const data = yield call(deleteArticles, payload)
      if (data && data.status === 'success') {
        yield put({
          type: 'articlesList',
          payload: defaultQuery,
        })
      }
    },
    *gotoDetail ({ payload }, { put }) {
      yield put({
        type: 'consultationArticleDetail/articlesDetail',
        payload,
      })
      setTimeout(() => {
        hashHistory.push(`/maintainApp/addArticle?id=${payload}`)
      }, 300)
    },
  },
  reducers: {
    setFileListNum (state, action) {
      return { ...state, fileList: action.payload }
    },
    changeImage (state, action) {
      return { ...state, imageUrl: action.payload }
    },
    changeEidt (state, action) {
      return { ...state, changeEidts: action.payload }
    },
    changeList (state, action) {
      return { ...state, list: action.payload }
    },
    articleDetail (state, action) {
      return { ...state, articleDetails: action.payload }
    },
    queryListSuccess (state, action) {
      const { pagination } = action.payload
      return { ...state, pagination: { ...state.pagination, ...pagination } }
    },
    showLoading (state, action) {
      return { ...state, ...action.payload }
    },
  },
}
