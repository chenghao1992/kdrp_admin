import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Login from '../../components/login/Index'
import styles from '../../components/layout/main.less'
import { Spin } from 'antd'
import '../../components/layout/common.less'

function LoginIndex ({ dispatch, app }) {
  const { loading, loginButtonLoading } = app

  const loginProps = {
    loading,
    loginButtonLoading,
    onOk (data) {
      dispatch({ type: 'app/login', payload: data })
    },
  }

  return (
    <div className={styles.spin}>
      <Spin tip="加载用户信息中..." spinning={loading} size="large"><Login {...loginProps} /></Spin>
    </div>
  )
}

LoginIndex.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(LoginIndex)

