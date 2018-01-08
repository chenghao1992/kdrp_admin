import { updateBasic, updateContact, updateFinance, updateAddress, changeCompanyState, query, updateAvatar } from '../services/company'
import { message } from 'antd'
import { uploadSrc } from '../utils/config'

export default {
  namespace: 'company',
  state: {
    id: '', // id通过进入页面后，从query返回的数据里取；
    status: '',
    basic: {
      status: 'edit', // edit,view
    },
    contact: {
      status: 'edit', // edit,view
    },
    financial: {
      status: 'edit', // edit,view
    },
    address: {
      status: 'edit', // edit,view
    },
    medias: {
      status: 'edit', // edit,view
    },
    isUploading: false,
    fileList: [],
    addStatusOfImg: false,
    avatarUrl: '',
  },
  reducers: {
    edit (state, action) {
      return { ...state, [action.payload.module]: { ...state[action.payload.module], status: 'edit' } }
    },
    view (state, action) {
      return { ...state, [action.payload.module]: { ...state[action.payload.module], status: 'view' } }
    },
    setId (state, action) {
      return { ...state, id: action.payload.id }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    uploading (state, action) {
      return { ...state, ...action.payload }
    },
    setFileListNum (state, action) {
      return { ...state, fileList: action.payload }
    },
    addStatusOfImg (state, action) {
      return { ...state, addStatusOfImg: action.payload }
    },
    uploadImg (state, action) {
      return { ...state, ...action.payload }
    },
  },
  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'setId',
        payload,
      })
      const data = yield call(query, payload)
      if (data && data.status === 'success') {
        const result = data.data
        const processData = {
          id: result.base_info.id,
          level: result.base_info.level,
          status: result.status,
          avatarUrl: result.base_info.avatar,
          basic: {
            ...result.base_info,
            status: result.base_info ? 'view' : 'edit',
          },
          contact: {
            ...result.contact,
            status: result.contact ? 'view' : 'edit',
          },
          financial: {
            ...result.finance,
            status: result.finance ? 'view' : 'edit',
          },
          address: {
            ...result.address,
            status: result.address ? 'view' : 'edit',
          },
        }

        yield put({
          type: 'querySuccess',
          payload: processData,
        })
      }
    },
    *updateBasic ({ payload }, { call, put, select }) {
      const id = yield select(state => state.company.id)
      const d = yield select(state => state.company.basic)

      const data = yield call(updateBasic, { ...payload, id })
      if (data && data.status === 'success') {
        message.success('修改基本信息成功')

        yield put({
          type: 'querySuccess',
          payload: {
            basic: {
              ...d,
              status: 'view',
              ...data.data,
            },
          },
        })
      }
    },
    *updateContact ({ payload }, { call, put, select }) {
      const id = yield select(state => state.company.id)
      const d = yield select(state => state.company.contact)

      const data = yield call(updateContact, { ...payload, id })
      if (data && data.status === 'success') {
        message.success('修改联系人信息成功')

        yield put({
          type: 'querySuccess',
          payload: {
            contact: {
              ...d,
              status: 'view',
              ...data.data,
            },
          },
        })
      }
    },
    *updateFinance ({ payload }, { call, put, select }) {
      const id = yield select(state => state.company.id)
      const d = yield select(state => state.company.financial)

      const data = yield call(updateFinance, { ...payload, id })
      if (data && data.status === 'success') {
        message.success('修改财务信息成功')

        yield put({
          type: 'querySuccess',
          payload: {
            financial: {
              ...d,
              status: 'view',
              ...data.data,
            },
          },
        })
      }
    },
    *updateAddress ({ payload }, { call, put, select }) {
      const id = yield select(state => state.company.id)
      const d = yield select(state => state.company.address)

      const data = yield call(updateAddress, { ...payload, id })
      if (data && data.status === 'success') {
        message.success('修改地址信息成功')

        yield put({
          type: 'querySuccess',
          payload: {
            address: {
              ...d,
              status: 'view',
              ...data.data,
            },
          },
        })
      }
    },
    // 状态接口
    *changeCompanyState ({ payload }, { call, put, select }) {
      const id = yield select(state => state.company.id)

      const data = yield call(changeCompanyState, { ...payload, id })
      if (data && data.status === 'success') {
        message.success('操作成功')

        yield put({
          type: 'querySuccess',
          payload: {
            status: data.data.status,
          },
        })
      }
    },
    *imgUploads ({ payload }, { call, put, select }) {
      const id = yield select(state => state.company.id)
      const data = yield call(updateAvatar, { ...payload, id })
      yield put({
        type: 'uploading',
        payload: {
          isUploading: false,
        },
      })
      const lastUrl = `${uploadSrc}/${payload.key}`
      if (data && data.status === 'success') {
        yield put({
          type: 'uploadImg',
          payload: {
            avatarUrl: lastUrl,
          },
        })
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        // 进入页面，通过query.id查询公司信息，将id存入state，根据返回的信息设置state里面各个模块的status状态和data的值
        if (location.pathname === '/company/companyInformation_m' || location.pathname === '/company/companyInformation_bm') {
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
