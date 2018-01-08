/**
 * Created by chenghao01 on 2017/3/29.
 */
import React, { PropTypes } from 'react'
import { notification } from 'antd'
import { connect } from 'dva'

import './personalInfo.less'
import Header from '../../components/personal/Header'
import FirstChunk from '../../components/personal/firstChunk'
import SecondChunk from '../../components/personal/secondChunk'
import ThirdChunk from '../../components/personal/thirdChunk'
import FourthChunk from '../../components/personal/fourthChunk'
import FivethChunk from '../../components/personal/fivethChunk'

function PersonalInfo ({ dispatch, personal }) {
  const {
    isUploading,
    personUrl,
    personal_info,
    safety_verfi,
    agency_info,
    address_info,
    opt_status,
    fistChunk,
    modalVisible,
    changName,
    timer,
    editStatu,
    timer_phone,
    imageCaptchaUrl,
    flag,
    flag_phone,
    fileList,
    addStatusOfImg,
    getKaisafaxAccountInfo,
    getKaisafaxCode,
    stopRefresh,
    stopRefreshOpenAccount,
    modalVisibleOfCode,
    inputNewNumber,
  } = personal

  let editStatus = personal.edit_status

  localStorage.setItem('userId', personal_info.id)
  // 设置本地变量来控制请求是否成功，并配合计时器
  localStorage.setItem('flag_phone', flag_phone)

  if (editStatus) {
    editStatus = personal_info.status !== 'freezing'
  }
  let clearTimeoutPhone = null
  const buttonClick = {
    handleClickEdit: () => {
      dispatch({
        type: 'personal/changeStatus',
        payload: {
          status: 'edit',
        },

      })
    },
    onHandleCancleEdit: () => {
      dispatch({
        type: 'personal/changeStatus',
        payload: {
          status: 'view',
        },
      })
    },
    onSave: (data) => {
      dispatch({
        type: 'personal/savePersonalIfo',
        params: data,
      })
      dispatch({
        type: 'personal/changeStatus',
        payload: {
          status: 'view',
        },
      })
    },
    showModal: (e) => {
      const changName = e.target.innerText === '更换手机号' ? 'phone' : 'email'
      if (personal_info.status === 'freezing') {
        notification.warning({
          description: '该用户已被冻结，无法修改',
        })
      } else {
        if (changName === 'phone') {
          clearTimeout(clearTimeoutPhone)
          dispatch({
            type: 'personal/getPicUrl',
            imageCaptchaUrl,
          })
        }
        dispatch({
          type: 'personal/showModal',
          payload: changName,
        })
      }
    },
    hideModal: () => {
      dispatch({
        type: 'personal/hideModal',
      })
    },

    changePhoneEmail: (values, reset) => {
      console.log(reset)
      if (changName === 'phone') {
        dispatch({
          type: 'personal/changePhone',
          params: {
            number: values,
            resetFn: reset,
          },
        })
      } else {
        dispatch({
          type: 'personal/changeEmail',
          params: values,
        })
      }
    },
    handleRebinding: () => {
      dispatch({
        type: 'personal/rebinding',
        isBinding: false,
      })
    },
    handleBind: (params) => {
      dispatch({
        type: 'personal/bindAccount',
        params,
      })
    },

    getVerificationCode: (params) => {
      // 设置本地变量来控制计时器执行的次数，否则会执行两次计时器
      localStorage.setItem('count', 1)
      dispatch({
        type: 'personal/getMsgCode',
        params,
      })
    },

    getVerificationCode_phone: (params) => {
      // 发送短信验证码
      dispatch({
        type: 'personal/getMsgCode_phone',
        params,
      })
      let waitPhone = timer_phone.seconds

      function setTimePhone () {
        if (waitPhone === 0) {
          dispatch({
            type: 'personal/changeTimer_phone',
            payload: {
              text: '发送',
              seconds: 60,
              isDisabled: false,
            },
          })
        } else {
          waitPhone--
          dispatch({
            type: 'personal/changeTimer_phone',
            payload: {
              text: `${waitPhone}s`,
              seconds: waitPhone,
              isDisabled: true,
            },
          })
          clearTimeoutPhone = setTimeout(() => {
            setTimePhone()
          },
            1000)
        }
      }

      setTimeout(() => {
        if (localStorage.getItem('flag_phone') === 'true') {
          setTimePhone()
        }
      }, 1000)
    },
    subChangeArea: (params) => {
      dispatch({
        type: 'personal/subChangeArea',
        params,
      })
    },
    getPicCode: () => {
      dispatch({
        type: 'personal/getPicUrl',
        imageCaptchaUrl: imageCaptchaUrl.split('?')[0],
      })
    },
    changeEditStatu: (status) => {
      dispatch({
        type: 'personal/changeEditStatu',
        editStatu: status,
      })
    },
    change_personal_status: (params) => {
      dispatch({
        type: 'personal/change_personal_status',
        status: params,
      })
    },
  }
  let wait = timer.seconds

  function setTime () {
    if (wait === 0) {
      localStorage.clear('count')
      dispatch({
        type: 'personal/changeTimer',
        payload: {
          text: '获取验证码',
          seconds: 60,
          isDisabled: false,
          start: false,
        },
      })
      dispatch({
        type: 'personal/changeFlag',
        flag: false,
      })
    } else {
      wait--
      dispatch({
        type: 'personal/changeTimer',
        payload: {
          text: `${wait}s 后重新获取验证码`,
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
   localStorage.getItem('count')标志计时器是第几次执行*/
  if (flag && !timer.start && localStorage.getItem('count')) {
    setTime()
  }
  const headerProps = {
    obj: personal_info,
    buttonClick,
    optStatus: opt_status,
  }
  const firstChunkProps = {
    addStatusOfImg,
    fileList,
    obj: personal_info,
    buttonClick,
    fistChunk,
    editStatus,
    personUrl,
    isUploading,
    changeImage (lastUrl) {
      dispatch({
        type: 'personal/imgUploads',
        payload: {
          key: lastUrl,
          employee_id: personal_info.id,
        },
      })
    },
    disabledUpload (param) {
      dispatch({
        type: 'personal/uploading',
        payload: {
          isUploading: param,
        },
      })
    },
    setFileListNum (param) {
      dispatch({
        type: 'personal/setFileListNum',
        payload: param,
      })
    },
    onMouseover () {
      dispatch({
        type: 'personal/addStatusOfImg',
        payload: true,
      })
    },
    onMouseMove () {
      dispatch({
        type: 'personal/addStatusOfImg',
        payload: false,
      })
    },
  }

  const secondChunkProps = {
    inputNewNumber,
    obj: safety_verfi,
    modalVisible,
    buttonClick,
    changName,
    timer_phone,
    imageCaptchaUrl,
    personal_info,
    editStatus,
    verificationNumber (param) {
      dispatch({
        type: 'personal/verificationNumber',
        payload: param,
      })
    },
  }

  const thirdChunkProps = {
    obj: agency_info,
  }
  const fourthChunkProps = {
    getKaisafaxAccountInfo,
    getKaisafaxCode,
    stopRefresh,
    stopRefreshOpenAccount,
    modalVisibleOfCode,
    editStatus,
    getBindingText (param) {
      dispatch({
        type: 'personal/getBindingText',
        payload: param,
      })
    },
    refreshAccountNumber (param) {
      dispatch({
        type: 'personal/refreshAccount',
      })
      dispatch({
        type: 'personal/stopRefresh',
        payload: {
          stopRefresh: param,
        },
      })
    },
    refreshOpenAccounts (param) {
      dispatch({
        type: 'personal/refreshOpenAccount',
      })
      dispatch({
        type: 'personal/stopRefreshOpenAccount',
        payload: {
          stopRefreshOpenAccount: param,
        },
      })
    },
    onHandleCancel (param) {
      dispatch({
        type: 'personal/CodeOfRefreshAccount',
        payload: param,
      })
      dispatch({
        type: 'personal/ChangeHandleCancel',
        payload: false,
      })
      dispatch({
        type: 'personal/getKaisafaxCode',
        payload: {
          ...getKaisafaxCode,
          codeStatus: false,
        },
      })
    },
    onHandleOk (param) {
      dispatch({
        type: 'personal/CodeOfRefreshAccount',
        payload: param,
      })
      dispatch({
        type: 'personal/ChangeHandleCancel',
        payload: false,
      })
    },
  }

  const fivethChunkProps = {
    editStatu,
    address_info,
    buttonClick,
    editStatus,
  }

  return (
    <div className="content-inner">
      <Header {...headerProps} />
      <FirstChunk {...firstChunkProps} />
      <SecondChunk {...secondChunkProps} />
      <ThirdChunk {...thirdChunkProps} />
      <FourthChunk {...fourthChunkProps} />
      <FivethChunk {...fivethChunkProps} />
    </div>
  )
}

PersonalInfo.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  personal: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ personal }) => ({ personal }))(PersonalInfo)
