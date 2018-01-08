import React, { PropTypes } from 'react'
import { Button, Row, Form, Input, Icon } from 'antd'
import { config } from '../../utils'
import { Link } from 'dva/router'
import { Rules } from '../../utils/verificationCode'
import './login.less'

const FormItem = Form.Item

const login = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  // const formItemLayout = {
  //   wrapperCol: { span: 24 },
  // }

  return (
    <div className="divWrapper">
      <div className="divHeader">
        <img src={config.logoSrc} alt="" />
        <span>{config.logoText}</span>
      </div>
      <div className="divBody">
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名',
                },
                {
                  ...Rules.name,
                },
              ],
            })(<Input size="large" prefix={<Icon type="mobile" style={{ fontSize: 14 }} />} onPressEnter={handleOk}
              placeholder="用户名"
            />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码',
                },
              ],
            })(<Input size="large" prefix={<Icon type="key" style={{ fontSize: 14 }} />} type="password"
              onPressEnter={handleOk} placeholder="密码"
            />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" className="width100" onClick={handleOk} loading={loginButtonLoading}>
              登录
            </Button>
          </Row>
          {/* <p>
           <span>账号：18500001111</span>
           <span>密码：123456</span>
           </p>*/}
        </form>
      </div>
      <div className="divFooter">
        <Link to="/forgotPassword"> 忘记密码 </Link>
      </div>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func,
}

export default Form.create()(login)
