/**
 * Created by xiaoys on 2017/11/29.
 */
import { contactNew, contactEdit, contactDetail, contactTypes } from '../services/customerDetail'
import { hashHistory } from 'dva/router'
import { message } from 'antd'

export default {
  namespace: 'customerListCsNew',
  state: {
    contactTyped: [],
    userId: '',
    codes: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/customer/customerList_cs_new') {
          if (location.query.status !== '1') {
            dispatch({ type: 'contactDetails', payload: { contact_id: location.query.contactId } })
          }
          dispatch({ type: 'saveId', payload: location.query.id })
          dispatch({ type: 'contactType' })
        }
      })
    },
  },
  effects: {
    *contactDetails ({ payload }, { call, put }) {
      const data = yield call(contactDetail, payload)
      if (data && data.status === 'success') {
        let code = data.data
        yield put({ type: 'saveCode', payload: code })
      }
    },
    *contactType ({ payload }, { call, put }) {
      const data = yield call(contactTypes)
      if (data && data.status === 'success') {
        yield put({ type: 'contactTypeList', payload: data.data })
      }
    },
    *newContact ({ payload }, { call, select }) {
      const data = yield call(contactNew, payload.data)
      if (data && data.status === 'success') {
        message.success('新建成功')
        payload.reset()
        const id = yield select(state => state.customerListCsNew.userId)
        hashHistory.push(`/customer/customerList_cs_detail?id=${id}`)
      }
    },
    *editContact ({ payload }, { call, put, select }) {
      const data = yield call(contactEdit, payload)
      if (data && data.status === 'success') {
        message.success('编辑成功')
        const id = yield select(state => state.customerListCsNew.userId)
        hashHistory.push(`/customer/customerList_cs_detail?id=${id}`)
        yield put({ type: 'saveCode', payload: {} })
      }
    },
  },
  reducers: {
    contactTypeList (state, action) {
      return { ...state, contactTyped: action.payload }
    },
    saveId (state, action) {
      return { ...state, userId: action.payload }
    },
    saveCode (state, action) {
      return { ...state, codes: action.payload }
    },
  },
}
