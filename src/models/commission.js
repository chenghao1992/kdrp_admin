import { exportFinance, queryList } from '../services/commission'
import { queryOrgTree } from '../services/common'

import { message } from 'antd'
// import { parse } from 'qs'
import { findPathInTree, trans2arr } from '../utils/index'
import moment from 'moment'


const initDate = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}~${moment().format('YYYY-MM-DD')}`
const initQuery = {
  page: 1,
  page_size: 20,
  agency_id: '',
  start_end_time: initDate,
}

export default {
  namespace: 'commission',
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
    orgTree: [],
    orgTreeValue: [],
    queryParam: initQuery,
    expand: true,
    timeValue: [moment().subtract(1, 'days'), moment()],
    isReload: false,
    isReset: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/report/report_finance') {
          if (location.query.agency_id !== undefined) {
            let qParam = location.query
            qParam.resetFlag = true
            qParam.page = 1
            dispatch({ type: 'search', payload: qParam })
          } else {
            initQuery.resetFlag = true
            dispatch({ type: 'search', payload: initQuery })
          }
          console.log(location.query)
          dispatch({ type: 'queryOrgTree', payload: location.query })
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
    /* searchInit ({payload}, {call, put, select}) {
      const reloadFlag=yield  select(state => state.commission.isReload)
      if(reloadFlag){
        window.location.reload()
      }else{
        yield put({
          type: 'queryList',
        })
      }
    },*/
    *queryOrgTree ({ payload }, { call, put, select }) {
      const data = yield call(queryOrgTree)
      if (data && data.status === 'success') {
        yield put({ type: 'queryOrgTreeSuccess', payload: data.data })

        const queryData = yield select(state => state.commission.queryParam)
        const agencyID = queryData.agency_id
        if (payload.agency_id === undefined && agencyID === '') {
          const params = {
            agency_id: '',
            orgTreeValue: [],
          }
          yield put({ type: 'initOrgTreeValue', payload: params })
        } else {
          let agencyId = ''
          if (payload.agency_id !== undefined) {
            agencyId = payload.agency_id
          } else {
            agencyId = agencyID
          }
          const firstNode = findPathInTree(agencyId, data.data, 'value')
          const param = {
            agency_id: agencyId,
            orgTreeValue: firstNode,
          }
          yield put({ type: 'initOrgTreeValue', payload: param })
        }
      }
    },
    *queryList ({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const queryData = yield select(state => state.commission.queryParam)
      const data = yield call(queryList, { ...queryData, ...payload })

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
      const data = yield call(exportFinance, payload)
      if (data && data.status === 'success') {
        message.success('导出任务添加成功，点击任务进行下载和详情查看')
      }
    },
  },
  reducers: {
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
    queryOrgTreeSuccess (state, action) {
      return {
        ...state,
        orgTree: action.payload,
      }
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
    initOrgTreeValue (state, action) {
      const { agency_id, orgTreeValue } = action.payload
      return {
        ...state,
        orgTreeValue,
        queryParam: {
          ...state.queryParam,
          agency_id,
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
