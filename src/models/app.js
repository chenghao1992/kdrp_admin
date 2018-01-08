import { login, logout, queryUserInfo, switchRole } from '../services/app'
import { currentTask } from '../services/task'

import { parse } from 'qs'
import { hashHistory } from 'dva/router'
// const Cookie = require('js-cookie')
import { message } from 'antd'

const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default {
  namespace: 'app',
  state: {
    activeRole: '',
    freezeMsg: '',
    roles: [],
    menu: [],
    login: false,
    loading: false,
    user: {
      real_name: '',
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'),
    currentTasks: [],
    count: 0,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        // 进入页面，通过query.id查询公司信息，将id存入state，根据返回的信息设置state里面各个模块的status状态和data的值
        if (location.pathname === '/logout') {
          dispatch({
            type: 'logout',
          })
        }
      })

      // dispatch({type: 'queryUserInfo'})
      window.onresize = function () {
        dispatch({ type: 'changeNavbar' })
      }

      dispatch({ type: 'queryCurrentTasks' })
    },
  },
  effects: {
    *queryCurrentTasks ({
      payload,
    }, { put, call, select }) {
      let isLogin = yield select(state => state.app.login)
      if (isLogin) {
        const data = yield call(currentTask, payload)
        if (data && data.status === 'success') {
          yield put({
            type: 'queryCurrentTaskSuccess',
            payload: {
              currentTasks: data.data.tasks,
              count: data.data.count,
            },
          })
        }
        // 登陆后采用长轮询10s查一次
        yield call(delay, 10000)
        yield put({
          type: 'queryCurrentTasks',
        })
      } else {
        // 没有登录1s后再次查询登录状态
        yield call(delay, 1000)
        yield put({
          type: 'queryCurrentTasks',
        })
      }
    },

    *login ({
      payload,
    }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' })
      const data = yield call(login, parse(payload))
      if (data && data.status === 'success') {
        message.success('登陆成功')
        hashHistory.push('/dashboard')

        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              real_name: data.data.user && data.data.user.real_name,
            },
          },
        })
      } else {
        yield put({
          type: 'loginFail',
        })
      }
    },
    /** queryUser ({
      payload
    }, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(userInfo, parse(payload))
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username
            }
          }
        })
      }

      yield put({type: 'hideLoading'})
    },*/
    *logout ({
      payload,
    }, { call }) {
      // 发请求主动登出
      const data = yield call(logout, parse(payload))
      if (data && data.status === 'success') {
        // 不应该直接reload，应该重新初始化model
        hashHistory.replace('/login')
        /* window.location.reload()
         yield put({
         type: 'logoutSuccess'
         })*/
      }
    },
    *switchSider ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
    *queryUserInfo ({
      payload, routesCallback,
    }, { call, put }) {
      const data = yield call(queryUserInfo, payload, routesCallback)
      if (data && data.status === 'success') {
        const { roles, menu, freeze_msg, user } = data.data

        let activeRole
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].is_active) {
            activeRole = roles[i].key
            break
          }
        }

        yield put({
          type: 'loginSuccess',
          payload: {
            roles,
            menu,
            freezeMsg: freeze_msg,
            user,
            activeRole,
          },
        })
      }
    },
    *clearUserInfo ({
      payload,
    }, { put }) {
      /* Cookie.remove('user_session', {path: '/'})
       Cookie.remove('user_name', {path: '/'})*/
      // 接口已经判断登陆失效，前端清除登陆态
      yield put({
        type: 'logoutSuccess',
      })
      hashHistory.push('/login')
    },
    *switchRole ({ payload }, { call }) {
      const data = yield call(switchRole, payload)
      if (data && data.status === 'success') {
        message.success('角色切换成功')

        hashHistory.push({
          pathname: '/dashboard',
        })
        window.location.reload()
      }
    },
  },
  reducers: {
    queryCurrentTaskSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    /* queryUserInfoSuccess (state, action) {
     return {
     ...state,
     ...action.payload
     }
     },*/
    getUserImg (state, action) {
      return {
        ...state, userImage: action.payload,
      }
    },

    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false,
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },

  },
}
