/**
 * Created by chenghao01 on 2017/3/29.
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import './personalInfo.less'
import ChangePwd from '../../components/personal/changePwd'

function PersonalInfo ({ dispatch, personal }) {
  const {
    personal_info,
    imageCaptchaUrl,
    freezeMsg,
  } = personal
  localStorage.setItem('userId', personal_info.id)

  const buttonClick = {
    onChangePwd: (params) => {
      dispatch({
        type: 'personal/onChangePwd',
        params,
      })
    },
    getPicCode: () => {
      dispatch({
        type: 'personal/getPicUrl',
        imageCaptchaUrl: imageCaptchaUrl.split('?')[0],
      })
    },
  }
  const changePwdProps = {
    buttonClick,
    imageCaptchaUrl,
    freezeMsg,
  }
  return (
    <div className="content-inner">
        <ChangePwd {...changePwdProps} />
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
