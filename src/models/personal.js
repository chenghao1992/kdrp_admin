import { initData, changePwd, savePersonalIfo, changePhone, changeEmail, subChangeArea, changePersonalStatus, bindAccount, imgUploads, getBindingText, refreshAccount, refreshOpenAccount } from '../services/personal'
import { getMsgCode } from '../services/forgotPassword'
import { queryUserInfo } from '../services/app'
import { uploadSrc } from '../utils/config'

import { parse } from 'qs'
import { message, notification } from 'antd'
export default {
  namespace: 'personal',
  state: {
    personal_info: {},
    safety_verfi: {},
    agency_info: [],
    kaisa_account_info: {},
    address_info: {
      home_address: {},
      work_address: {},
    },    // 如果不初始化里面的属性  多次刷新页面会报错

    modalVisible: false, // 控制第二块中模态框的显示状态
    changName: 'phone', // 控制第二块中输入框的类型
    timer: {     // 绑定账号计时器
      text: '获取验证码',
      seconds: 60,
      isDisabled: false,
      start: false,
    },
    editStatu: 'view', // 控制第四块中按钮的状态切换
    timer_phone: {     // 更换手机号计时器
      text: '获取验证码',
      seconds: 60,
      isDisabled: false,
    },
    fistChunk: {
      status: 'view', // edit,view
    },
    secondChunk: {},
    imageCaptchaUrl: 'api/captcha_code/',
    flag: false,
    flag_phone: false,
    personUrl: '',
    isUploading: false,
    fileList: [],
    addStatusOfImg: false,
    getKaisafaxAccountInfo: {},
    getKaisafaxCode: {
      codeStatus: '',
      getCodeOfKaisafax: '',
    },
    stopRefresh: true,
    stopRefreshOpenAccount: true,
    modalVisibleOfCode: true,
    inputNewNumber: false,
    edit_status:false
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/personal/personalInfo') {
          localStorage.setItem('userId', location.query.userId)
          dispatch({ type: 'initData', payload: location.query })
        } else if (location.pathname === '/personal/changePwd') {
          // 查询当前用户是不是已经冻结
          dispatch({ type: 'queryUserInfo', payload: { path: location.pathname } })
          dispatch({ type: 'getPicUrl' })
        }
      })
    },
  },
  effects: {
    *initData ({ payload }, { call, put }) {
      // call用于异步请求
      const data = yield call(initData, parse(payload))
      if (data && data.status === 'success') {
        if (data.data.kaisa_account_info == null) {
          yield put({
            type: 'changeAccount',
            payload: {
              bindingAccount: false,
            },
          })
        } else {
          yield put({
            type: 'changeAccount',
            payload: {
              ...data.data.kaisa_account_info,
              bindingAccount: true,
            },
          })
        }

        const personUrls = data.data.personal_info.avatar ? data.data.personal_info.avatar : ''

        yield put({
          type: 'uploadImg',
          payload: { personUrl: personUrls },
        })

        yield put({
          type: 'initDataSuccess',
          payload: { personaI_info: data.data },
        })
      }
    },
    *getMsgCode ({ params }, { call, put }) {
      const data = yield call(getMsgCode, parse(params))
      if (data && data.status === 'success') {
        yield put({
          type: 'getMsgCodeSuccess',
          payload: {},
        })
      }
    },
    *getMsgCode_phone ({ params }, { call, put }) {
      const data = yield call(getMsgCode, parse(params))
      if (data && data.status === 'success') {
        yield put({
          type: 'getMsgCode_phoneSuccess',
          flag_phone: true,
        })
      } else {
        yield put({
          type: 'getMsgCode_phoneSuccess',
          flag_phone: false,
        })
      }
    },
    *onChangePwd ({ params }, { call }) {
      const data = yield call(changePwd, parse(params))
      if (data && data.status === 'success') {
        message.success('修改成功', 3)
        setTimeout(() => {
          location.reload()
        }, 3000)
      }
    },
    *savePersonalIfo ({ params }, { call, put }) {
      const data = yield call(savePersonalIfo, parse(params))
      if (data && data.status === 'success') {
        message.success('修改成功', 3)
        const initDataData = yield call(initData, parse(params))
        yield put({
          type: 'initDataSuccess',
          payload: { personaI_info: initDataData.data },
        })
      }
    },
    *changePhone ({ params }, { call, put }) {
      const data = yield call(changePhone, parse(params.number))
      if (data && data.status === 'success') {
        params.resetFn()
        yield put({
          type: 'hideModal',
        })
        message.success('修改成功', 3)
        const initDataData = yield call(initData, parse(params))
        yield put({
          type: 'initDataSuccess',
          payload: { personaI_info: initDataData.data },
        })
      }
    },
    *changeEmail ({ params }, { call, put }) {
      const data = yield call(changeEmail, parse(params))
      if (data && data.status === 'success') {
        message.success('修改成功', 3)
        const initDataData = yield call(initData, parse(params))
        yield put({
          type: 'initDataSuccess',
          payload: { personaI_info: initDataData.data },
        })
      }
    },
    *subChangeArea ({ params }, { call, put }) {
      const data = yield call(subChangeArea, parse(params))
      if (data && data.status === 'success') {
        message.success('修改成功', 3)
        const initDataData = yield call(initData, parse(params))
        yield put({
          type: 'initDataSuccess',
          payload: { personaI_info: initDataData.data },
        })
      }
    },
    *change_personal_status ({ ...payload }, { call, put }) {
      payload.userId = localStorage.getItem('userId')
      const data = yield call(changePersonalStatus, parse(payload))
      if (data && data.status === 'success') {
        message.success('修改成功', 3)
        const initDataData = yield call(initData, parse(payload))
        yield put({
          type: 'initDataSuccess',
          payload: { personaI_info: initDataData.data },
        })
      }
    },
    *bindAccount ({ params }, { call, put }) {
      const data = yield call(bindAccount, parse(params))
      if (data && data.status === 'success') {
        message.success('绑定成功', 3)
        const initDataData = yield call(initData, parse(params))
        yield put({
          type: 'initDataSuccess',
          payload: { personaI_info: initDataData.data },
        })
      }
    },
    *queryUserInfo ({
      payload, routesCallback,
    }, { call, put }) {
      const data = yield call(queryUserInfo, payload, routesCallback)
      if (data && data.status === 'success') {
        if (data.data.freeze_msg) {
          notification.warning({
            description: '该用户已被冻结，无法修改密码',
          })
        }
        const { freezeMsg } = data.data
        yield put({
          type: 'queryUserInfoSuccess',
          payload: {
            freezeMsg,
          },
        })
      }
    },

    *imgUploads ({ payload }, { call, put }) {
      const data = yield call(imgUploads, payload)
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
            personUrl: lastUrl,
          },
        })

        yield put({
          type: 'app/queryUserInfo',
          payload: {
            path: '/personal/personalInfo',
          },
        })
      }
    },
    *getBindingText ({ payload }, { call, put }) {
      const data = yield call(getBindingText)
      if (data && data.status === 'success') {
        if (data.data.bind_account_url) {
          yield put({
            type: 'getKaisafaxCode',
            payload: {
              getKaisafaxCode: {
                codeStatus: true,
                getCodeOfKaisafax: data.data.bind_account_url,
              },
            },
          })
        } else if (data.data === '金服账号关联成功') {
          yield put({
            type: 'changeAccount',
            payload: {
              bindingAccount: true,
            },
          })
          payload()
        }
        yield put({
          type: 'ChangeHandleCancel',
          payload: true,
        })
      }
    },
    *refreshAccount ({ payload }, { call, put }) {
      const data = yield call(refreshAccount)
      if (data && data.status === 'success') {
        // payload()
        yield put({
          type: 'changeAccount',
          payload: {
            bindingAccount: true,
          },
        })
        yield put({
          type: 'stopRefresh',
          payload: {
            stopRefresh: true,
          },
        })
      } else {
        yield put({
          type: 'stopRefresh',
          payload: {
            stopRefresh: true,
          },
        })
      }
    },
    *refreshOpenAccount ({ payload }, { call, put }) {
      const data = yield call(refreshOpenAccount)
      if (data && data.status === 'success') {
        yield put({
          type: 'changeAccount',
          payload: {
            open_status: true,
          },
        })
        yield put({
          type: 'stopRefreshOpenAccount',
          payload: {
            stopRefreshOpenAccount: true,
          },
        })
      } else {
        yield put({
          type: 'stopRefreshOpenAccount',
          payload: {
            stopRefreshOpenAccount: true,
          },
        })
      }
    },
    *CodeOfRefreshAccount ({ payload }, { call, put }) {
      const data = yield call(refreshAccount)
      if (data && data.status === 'success') {
        payload()
        yield put({
          type: 'changeAccount',
          payload: {
            bindingAccount: true,
          },
        })
      }
    },
  },
  reducers: {
    verificationNumber (state, action) {
      return { ...state, inputNewNumber: action.payload }
    },
    changeAccount (state, action) {
      return { ...state, getKaisafaxAccountInfo: { ...state.getKaisafaxAccountInfo, ...action.payload } }
    },
    ChangeHandleCancel (state, action) {
      return { ...state, modalVisibleOfCode: action.payload }
    },
    stopRefreshOpenAccount (state, action) {
      return { ...state, ...action.payload }
    },
    stopRefresh (state, action) {
      return { ...state, ...action.payload }
    },
    getKaisafaxCode (state, action) {
      return { ...state, ...action.payload }
    },
    getKaisafaxAccountInfo (state, action) {
      return { ...state, ...action.payload }
    },
    addStatusOfImg (state, action) {
      return { ...state, addStatusOfImg: action.payload }
    },
    setFileListNum (state, action) {
      return { ...state, fileList: action.payload }
    },
    uploading (state, action) {
      return { ...state, ...action.payload }
    },
    uploadImg (state, action) {
      return { ...state, ...action.payload }
    },
    initDataSuccess (state, action) {
      return { ...state, ...action.payload.personaI_info }
    },
    subChangeAreaSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    getMsgCodeSuccess (state) {
      return { ...state, flag: true }
    },
    getMsgCode_phoneSuccess (state, action) {
      return { ...state, ...action }
    },
    changeStatus (state, action) {
      return { ...state, fistChunk: { ...action.payload } }
    },
    showModal (state, action) {
      return { ...state, changName: action.payload, modalVisible: true }
    },
    hideModal (state, action) {
      return { ...state, ...action.payload, modalVisible: false }
    },
    initFisrtChunkData (state, action) {
      return { ...state, ...action.payload, personal_info: action.payload }
    },
    rebinding (state, action) {
      return { ...state, isBinding: action.isBinding }
    },
    changeTimer (state, action) {
      return { ...state, timer: action.payload }
    },
    changeEditStatu (state, action) {
      return { ...state, editStatu: action.editStatu }
    },
    changeTimer_phone (state, action) {
      return { ...state, timer_phone: action.payload }
    },
    getPicUrl (state, action) {
      return { ...state, ...action, imageCaptchaUrl: `${state.imageCaptchaUrl.split('?')[0]}?${Math.random()}` }
    },
    changeFlag (state, action) {
      return { ...state, flag: action.flag }
    },
    queryUserInfoSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
