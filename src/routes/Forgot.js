import React, { PropTypes } from 'react'
import { connect } from 'dva'

import ForgotPassword from '../components/forgotPassword/Index'

import '../components/layout/common.less'

function Forgot ({ dispatch, forgotPassword }) {
  const { timer, toInputPwd, mobile, mobile_captcha, image_captcha_url2, flag } = forgotPassword
  const getPicCode = () => {
    dispatch({
      type: 'forgotPassword/getPicUrl',
    })
  }
  const getMsgCode = (params) => {
    // console.log(data)
    dispatch({
      type: 'forgotPassword/getMsgCode',
      params,
    })
  }
  const getVerificationCode = (params) => {
    // 设置本地变量来控制计时器执行的次数，否则会执行两次计时器
    localStorage.setItem('count_pwd', 1)
    getMsgCode(params)
  }
  let wait = timer.seconds

  function setTime () {
    if (wait === 0) {
      localStorage.clear('count_pwd')
      dispatch({
        type: 'forgotPassword/changeTimer',
        payload: {
          text: '重发',
          seconds: 60,
          isDisabled: false,
          start: false,
        },
      })
      dispatch({
        type: 'forgotPassword/changeFlag',
        flag: false,
      })
    } else {
      wait--
      dispatch({
        type: 'forgotPassword/changeTimer',
        payload: {
          text: `${wait}s`,
          seconds: wait,
          isDisabled: true,
          start: true,
        },
      })
      setTimeout(() => {
        setTime()
      }, 1000)
    }
  }

  /* flag标志是否请求验证码成功
   timer.start标志计时器此时是否正在计时
   localStorage.getItem('count_pwd')标志计时器是第几次执行*/
  if (flag && !timer.start && localStorage.getItem('count_pwd')) {
    setTime()
  }

  const handleToInputPwd = (data) => {
    // 判断手机验证码是否正确，否则不能进行下一步
    dispatch({
      type: 'forgotPassword/checkPhoneCode',
      params: {
        mobile_captcha: data.mobile_captcha,
        source: 'password_reset',
        mobile: data.mobile,
      },
    })
  }

  const saveResetPwd = (params) => {
    dispatch({
      type: 'forgotPassword/saveResetPwd',
      params,
    })
  }
  const forgotPasswordProps = {
    getVerificationCode,
    getMsgCode,
    timer,
    toInputPwd,
    getPicCode,
    handleToInputPwd,
    saveResetPwd,
    mobile,
    mobileCaptcha: mobile_captcha,
    imageCaptchaUrl2: image_captcha_url2,
  }


  return (
    <div>
      <ForgotPassword {...forgotPasswordProps} />
    </div>
  )
}

function mapStateToProps ({ forgotPassword }) {
  return { forgotPassword }
}

Forgot.propTypes = {
  dispatch: PropTypes.func,
  forgotPassword: PropTypes.object,
}

export default connect(mapStateToProps)(Forgot)

