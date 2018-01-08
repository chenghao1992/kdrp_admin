/**
 * Created by xiaoys on 2017/11/29.
 */
import { investReportPerson, treeLimit2, personExport } from '../services/reportStaff'
import { message } from 'antd'

export default {
  namespace: 'reportStaffPerson',
  state: {
    tree: [],
    list: [],
    searchCode: {},
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/report/report_staff_person') {
          dispatch({ type: 'treeLimit' })
          dispatch({ type: 'investList' })
        }
      })
    },
  },
  effects: {
    *treeLimit ({ payload }, { call, put }) {
      const data = yield call(treeLimit2)
      if (data && data.status === 'success') {
        yield put({
          type: 'treeList',
          payload: data.data,
        })
      }
    },
    *investList ({ payload }, { call, put }) {
      const data = yield call(investReportPerson, payload)
      if (data && data.status === 'success') {
        yield put({
          type: 'investLists',
          payload: data.data,
        })
      }
    },
    *search ({ payload }, { put }) {
      yield put({ type: 'searchCodes', payload })
      yield put({ type: 'investList', payload })
    },
    *onExport ({ payload }, { call }) {
      const data = yield call(personExport, payload)
      if (data && data.status === 'success') {
        message.success('导出任务添加成功，点击任务进行下载和详情查看')
      }
    },

  },
  reducers: {
    treeList (state, action) {
      return { ...state, tree: action.payload }
    },
    investLists (state, action) {
      return { ...state, list: action.payload }
    },
    searchCodes (state, action) {
      return { ...state, searchCode: action.payload }
    },
  },
}
