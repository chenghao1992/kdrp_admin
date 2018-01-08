import { hashHistory } from 'dva/router'
import { addEditor, articlesDetail, columnList, editArticles } from '../services/maintainApp'
import { message } from 'antd'

export default {
  namespace: 'consultationArticleDetail',
  state: {
    fileList: [],
    imageUrl: '',
    changeEidts: '',
    list: [],
    articleDetails: {},
    codeList: {},
    uploadSpan: false,
    type: '',
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(location => {
        if (location.pathname === '/maintainApp/addArticle') {
          if (location.query.id) {
            dispatch({
              type: 'getDetail',
              payload: location.query.id,
            })
            dispatch({
              type: 'typeJson',
              payload: 'edit',
            })
          } else {
            dispatch({
              type: 'typeJson',
              payload: 'create',
            })
          }
          dispatch({
            type: 'columnList',
          })
        }
      })
    },
  },
  effects: {
    *create ({ payload }, { call }) {
      const data = yield call(addEditor, payload.data)
      if (data && data.status === 'success') {
        payload.reset()
        message.success('新增文章成功', 1)
        hashHistory.push('/maintainApp/consultationArticle')
      }
    },
    *edit ({ payload }, { call }) {
      const data = yield call(editArticles, payload.data)
      if (data && data.status === 'success') {
        payload.reset()
        message.success('修改文章成功', 1)
        hashHistory.push('/maintainApp/consultationArticle')
      }
    },
    *getDetail ({ payload }, { put, call }) {
      const data = yield call(articlesDetail, payload)
      if (data && data.status === 'success') {
        yield put({
          type: 'articleDetail',
          payload: data.data,
        })
        if (data.data.image_url) {
          const fileItem = [
            {
              uid: -1,
              name: data.data.image_url,
              status: 'done',
              url: data.data.image_url,
            },
          ]
          yield put({
            type: 'changeFileList',
            payload: fileItem,
          })
        }
      }
    },

    *columnList ({ payload }, { put, call }) {
      const data = yield call(columnList)
      if (data && data.status === 'success') {
        let list = []
        const datas = data.data
        for (let i = 0; i < datas.length; i ++) {
          const name = datas[i].name
          const id = datas[i].id
          list.push({ value: id, name })
        }
        yield put({
          type: 'culmnList',
          payload: list,
        })
      }
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
    culmnList (state, action) {
      return { ...state, codeList: action.payload }
    },
    spanStatus (state, action) {
      return { ...state, uploadSpan: action.payload }
    },
    changeFileList (state, action) {
      return { ...state, fileList: action.payload }
    },
    typeJson (state, action) {
      return { ...state, type: action.payload, articleDetails: {}, imageUrl: '' }
    },
  },
}
