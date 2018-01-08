import { queryListSub, exportCustomerService } from '../services/commissionSub'

// import { parse } from 'qs'
import { rolesCode } from '../utils/helper'
import { trans2arr } from '../utils/index'
import moment from 'moment'
import { message } from 'antd'

const initDate = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}~${moment().format('YYYY-MM-DD')}`
const initQuery = {
  page: 1,
  page_size: 20,
  agency_id: '',
  start_end_time: initDate,
}
export default {
  namespace: 'commissionSub',
  state: {
    loading: false,
    list: [],
    pagination: {
      /* showSizeChanger: true,*/
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 20,
      total: 0,
    },
    queryParam: initQuery,
    expand: true,
    timeValue: [moment().subtract(1, 'days'), moment()],
    isReload: false,
    isReset: false,
    exportBtn: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/report/report_employee') {
          dispatch({ type: 'userRole' })
          if (location.query.agency_id !== undefined) {
            let qParam = location.query
            qParam.page = 1
            dispatch({ type: 'search', payload: qParam })
          } else {
            initQuery.resetFlag = true
            dispatch({ type: 'search', payload: initQuery })
          }
        }
      })
    },
  },
  effects: {
    *userRole ({ payload }, { put, select }) {
      // const queryData = yield select(state => state.app.user);
      const roles = yield select(state => state.app.roles)
      const d = rolesCode(roles)
      if (d === 'channel_master') {
        yield put({ type: 'exportBtnStatus', payload: { exportBtn: false } })
      } else {
        yield put({ type: 'exportBtnStatus', payload: { exportBtn: true } })
      }
    },
    *search ({ payload }, { put }) {
      if (payload.resetFlag !== undefined) {
        yield put({ type: 'setReset', payload: true })
        delete payload.resetFlag
      }
      /* yield put({type: 'setReload',payload: true});*/
      if (payload.start_end_time !== undefined && payload.start_end_time !== '') {
        const datetime = String(payload.start_end_time).split('~')
        yield put({
          type: 'changeDate',
          payload: {
            timeValue: [moment(datetime[0]), moment(datetime[1])],
            start_end_time: payload.start_end_time,
          },
        })
      }
      if (payload.agency_id !== undefined) {
        yield put({
          type: 'setQueryParam',
          payload,
        })
      }
      yield put({
        type: 'queryList',
      })
    },
    /** searchInit ({payload}, {call, put, select}) {
      const reloadFlag=yield  select(state => state.commissionSub.isReload)
      if(reloadFlag){
        window.location.reload()
      }else{
        yield put({
          type: 'queryList',
        })
      }
    },*/
    *queryList ({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const queryData = yield select(state => state.commissionSub.queryParam)
      const data = yield call(queryListSub, { ...queryData, ...payload })
      yield put({ type: 'setReset', payload: false })
      if (data && data.status === 'success') {
        const dataArr = trans2arr(data.data)
        yield put({
          type: 'queryListSuccess',
          payload: {
            list: dataArr,
            pagination: data.page,
          },
        })
      }
    },
    *btnExport ({ payload }, { call }) {
      const data = yield call(exportCustomerService, payload)
      if (data && data.status === 'success') {
        message.success('导出任务添加成功，点击任务进行下载和详情查看')
      }
    },
  },
  reducers: {
    exportBtnStatus (state, action) {
      return { ...state, ...action.payload }
    },
    onToggle (state, action) {
      return { ...state, expand: action.payload }
    },
    changeDate (state, action) {
      const { timeValue, start_end_time } = action.payload
      return {
        ...state,
        timeValue,
        queryParam: {
          ...state.queryParam,
          start_end_time,
        },
      }
    },
    showLoading (state) {
      return { ...state, loading: true }
    },
    queryListSuccess (state, action) {
      const { list, pagination } = action.payload
      return {
        ...state,
        list,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
    setQueryParam (state, action) {
      return {
        ...state,
        queryParam: {
          ...state.queryParam,
          ...action.payload,
        },
      }
    },
    setReload (state, action) {
      return {
        ...state,
        isReload: action.payload,
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
