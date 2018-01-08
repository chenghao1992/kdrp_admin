/**
 * Created by xiaoys on 2017/11/29.
 */
import { customerCode, contactList, contactButton, houseList, houseNew, houseEdit, carList, carNew, carEdit, remarkList, remarkNew, remarkTypes } from '../services/customerDetail'
import { message } from 'antd'

export default {
  namespace: 'customerListCsDetail',
  state: {
    code: {},
    contactList1: [],
    houseList1: [],
    carList1: [],
    remarkList1: [],
    remarkType: [],
    fileList: [],
    keys: [],
    codeHouse: {},
    codeCar: {},
    userId: '',
    newOrEdit: 1,
    isUploading: false,
    visibleHouse: false,
    visibleCar: false,
    contactLoading: false,
    remarkLoading: false,
    pagination: { showQuickJumper: true, showTotal: total => `共 ${total} 条`, current: 1, pageSize: 5, total: 0 },
    pagination1: { showQuickJumper: true, showTotal: total => `共 ${total} 条`, current: 1, pageSize: 5, total: 0 },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/customer/customerList_cs_detail') {
          dispatch({ type: 'customerCodes', payload: { customer_id: location.query.id } })
          dispatch({ type: 'contactLists', payload: { customer_id: location.query.id } })
          dispatch({ type: 'remarkTypes' })
        }
      })
    },
  },
  effects: {
    *customerCodes ({ payload }, { call, put }) {
      yield put({ type: 'saveId', payload })
      const data = yield call(customerCode, payload)
      if (data && data.status === 'success') {
        yield put({ type: 'saveCode', payload: data.data })
      }
    },
    *contactLists ({ payload }, { call, put }) {
      yield put({ type: 'listLoading', payload: { contactLoading: true } })
      const data = yield call(contactList, payload)
      if (data && data.status === 'success') {
        yield put({ type: 'saveContactList', payload: data.data.contacts })
        yield put({ type: 'queryListSuccess', payload: data.data.page })
        yield put({ type: 'listLoading', payload: { contactLoading: false } })
      }
    },
    *remarkTypes ({ payload }, { call, put }) {
      const data = yield call(remarkTypes)
      if (data && data.status === 'success') {
        yield put({ type: 'saveRemarkTypes', payload: data.data })
      }
    },
    *onOrOff ({ payload }, { call, put }) {
      const data = yield call(contactButton, payload)
      if (data) {
        yield put({ type: 'contactLists', payload: { customer_id: payload.customer_id } })
      }
    },
    *motalHouse ({ payload }, { call, put, select }) {
      const data = yield call(houseNew, payload.data)
      if (data && data.status === 'success') {
        message.success('新建成功')
        payload.reset()
        yield put({ type: 'changeVisible', payload: { visibleHouse: false } })
        const id = yield select(state => state.customerListCsDetail.userId)
        yield put({ type: 'houseLists', payload: id })
      }
    },
    *motalCar ({ payload }, { call, put, select }) {
      const data = yield call(carNew, payload.data)
      if (data && data.status === 'success') {
        message.success('新建成功')
        payload.reset()
        yield put({ type: 'changeVisible', payload: { visibleCar: false } })
        const id = yield select(state => state.customerListCsDetail.userId)
        yield put({ type: 'carLists', payload: id })
      }
    },
    *houseLists ({ payload }, { call, put }) {
      yield put({ type: 'listLoading', payload: { contactLoading: true } })
      const data = yield call(houseList, payload)
      if (data && data.status === 'success') {
        yield put({ type: 'saveHouseList', payload: data.data.houses })
        yield put({ type: 'queryListSuccess', payload: data.data.page })
        yield put({ type: 'listLoading', payload: { contactLoading: false } })
      }
    },
    *carLists ({ payload }, { call, put }) {
      yield put({ type: 'listLoading', payload: { contactLoading: true } })
      const data = yield call(carList, payload)
      if (data && data.status === 'success') {
        yield put({ type: 'saveCarList', payload: data.data.cars })
        yield put({ type: 'queryListSuccess', payload: data.data.page })
        yield put({ type: 'listLoading', payload: { contactLoading: false } })
      }
    },
    *editHouse ({ payload }, { call, put, select }) {
      const data = yield call(houseEdit, payload.data)
      if (data && data.status === 'success') {
        message.success('编辑成功')
        payload.reset()
        yield put({ type: 'changeVisible', payload: { visibleHouse: false, codeHouse: {} } })
        const id = yield select(state => state.customerListCsDetail.userId)
        yield put({ type: 'houseLists', payload: id })
      }
    },
    *editCar ({ payload }, { call, put, select }) {
      const data = yield call(carEdit, payload.data)
      if (data && data.status === 'success') {
        message.success('编辑成功')
        payload.reset()
        yield put({ type: 'changeVisible', payload: { visibleCar: false, codeCar: {} } })
        const id = yield select(state => state.customerListCsDetail.userId)
        yield put({ type: 'carLists', payload: id })
      }
    },
    *newRemarks ({ payload }, { call, put }) {
      const data = yield call(remarkNew, payload.data)
      if (data && data.status === 'success') {
        message.success('新增成功')
        payload.reset()
        yield put({ type: 'saveUpload', payload: { keys: [], fileList: [] } })
      }
    },
    *remarkLists ({ payload }, { call, put }) {
      yield put({ type: 'listLoading', payload: { remarkLoading: true } })
      const data = yield call(remarkList, payload)
      if (data && data.status === 'success') {
        yield put({ type: 'saveRemarkLists', payload: data.data.remarks })
        yield put({ type: 'queryListSuccess1', payload: data.data.page })
        yield put({ type: 'listLoading', payload: { remarkLoading: false } })
      }
    },
  },
  reducers: {
    queryListSuccess (state, action) {
      return { ...state, pagination: { ...state.pagination, ...action.payload } }
    },
    queryListSuccess1 (state, action) {
      return { ...state, pagination1: { ...state.pagination1, ...action.payload } }
    },
    changeVisible (state, action) {
      return { ...state, ... action.payload }
    },
    saveCode (state, action) {
      return { ...state, code: action.payload }
    },
    saveContactList (state, action) {
      return { ...state, contactList1: action.payload }
    },
    saveRemarkTypes (state, action) {
      return { ...state, remarkType: action.payload }
    },
    listLoading (state, action) {
      return { ...state, ...action.payload }
    },
    saveHouseList (state, action) {
      return { ...state, houseList1: action.payload }
    },
    handleHouseEdit (state, action) {
      return { ...state, visibleHouse: true, ...action.payload }
    },
    handleCarEdit (state, action) {
      return { ...state, visibleCar: true, ...action.payload }
    },
    saveId (state, action) {
      return { ...state, userId: action.payload }
    },
    saveCarList (state, action) {
      return { ...state, carList1: action.payload }
    },
    saveUpload (state, action) {
      return { ...state, ... action.payload }
    },
    saveKeys (state, action) {
      return { ...state, keys: action.payload }
    },
    saveRemarkLists (state, action) {
      return { ...state, remarkList1: action.payload }
    },
  },
}
