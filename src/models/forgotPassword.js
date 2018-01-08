import { getMsgCode, saveResetPwd, checkPhoneCode } from '../services/forgotPassword'
import { parse } from 'qs'
import { hashHistory } from 'dva/router'
import { message } from 'antd'
export default {
  namespace: 'forgotPassword',
  state: {
    timer: {     // 计时器
      text: '发送',
      seconds: 60,
      isDisabled: false,
    },
    toInputPwd: false, // 控制是否显示输入密码
    image_captcha_url2: 'api/captcha_code/',
    flag: false,
  },
  reducers: {
    changeTimer (state, action) {
      return { ...state, timer: action.payload }
    },
    handleToInputPwd (state, action) {
      return { ...state, mobile: action.data, toInputPwd: action.toInputPwd }
    },
    getMsgCodeSuccess (state, action) {
      return { ...state, flag: action.flag }
    },
    saveResetPwdSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    getPicUrl (state, action) {
      return {
        ...state,
        ...action,
        image_captcha_url2: `${state.image_captcha_url2.split('?')[0]}?${Date.now()}`,
      }
    },
    changeFlag (state, action) {
      return { ...state, flag: action.flag }
    },

  },
  effects: {
    *getMsgCode ({ params }, { call, put }) {
      const data = yield call(getMsgCode, parse(params))
      if (data && data.status === 'success') {
        yield put({
          type: 'getMsgCodeSuccess',
          flag: true,
        })
      } else {
        yield put({
          type: 'getMsgCodeSuccess',
          flag: false,
        })
      }
    },
    *checkPhoneCode ({ params }, { call, put }) {
      console.log(params)
      const data = yield call(checkPhoneCode, parse(params))
      if (data && data.status === 'success') {
        message.success('验证码正确', 3)
        yield put({
          type: 'handleToInputPwd',
          toInputPwd: true,
          data: params.mobile,
        })
      }
    },
    *saveResetPwd ({ params }, { call }) {
      console.log(params)
      const data = yield call(saveResetPwd, parse(params))
      if (data && data.status === 'success') {
        message.success('重置密码成功', 3)
        setTimeout(() => {
          hashHistory.push('/login')
          location.reload()
        }, 3000)
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/forgotPassword') {
          dispatch({ type: 'getPicUrl', payload: location.query })
        } else if (location.pathname === '/login') {
          console.log('app')
          dispatch({ type: 'handleToInputPwd', toInputPwd: false })
        }
      })
    },
  },
}
