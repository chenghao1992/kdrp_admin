import React, { PropTypes } from 'react'
import { Button, Row, Form, Input, Col, Icon } from 'antd'
import { Link } from 'dva/router'

import { config } from '../../utils'

const FormItem = Form.Item
const Index = ({
  getVerificationCode,
  timer,
  toInputPwd,
  getPicCode,
  handleToInputPwd,
  saveResetPwd,
  mobile,
  mobileCaptcha,
  imageCaptchaUrl2,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    validateFields,

  },
}) => {
  console.log(toInputPwd)
  const formItemLayout = {
    wrapperCol: { span: 24 },
  }
  const handleGetCode = (status) => {
    // const e=window.event||arguments[0];
    // e.preventDefault();
    validateFields(['mobile', 'image_captcha'], (err, values) => {
      if (!err) {
        values.status = status
        getVerificationCode(values)
        getPicCode()
      }
    })
  }
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }
  const checkConfirm = (rule, value, callback) => {
    if (value) {
      validateFields(['confirm'], { force: true })
    }
    callback()
  }

  const resetPwd = (e) => {
    e.preventDefault()
    validateFields(['mobile', 'image_captcha', 'mobile_captcha'], (err, values) => {
      if (!err) {
        handleToInputPwd(values)
      }
    })
  }

  const handleSave = (e) => {
    e.preventDefault()

    validateFields(['password', 'confirm'], (err) => {
      if (!err) {
        const data = { ...getFieldsValue() }
        data.mobile = mobile
        data.mobile_captcha = mobileCaptcha

        saveResetPwd(data)
      }
    })
  }

  const ChangePwd =
    (<Form>
      <FormItem hasFeedback {...formItemLayout}>
        {getFieldDecorator('mobile', {
          initialValue: '',
          rules: [
            { required: true, message: '手机号不能为空' },
            { pattern: /^1[34578]\d{9}$/, message: '请填写正确的手机号!' },
          ],
        })(
          <Input prefix={<Icon type="mobile" style={{ fontSize: 14 }} />} placeholder="请输入手机号" />
        )}
      </FormItem>
      <Row>
        <Col span={16}>
          <FormItem wrapperCol={{ span: 24 }}>
            {getFieldDecorator('image_captcha', {
              rules: [
                {
                  required: true, message: '图形验证码不能为空',
                },
              ],
            }
            )(
              <Input prefix={<Icon type="barcode" style={{ fontSize: 14 }} />} placeholder={'请输入图形验证码'} />
            )}
          </FormItem>
        </Col>
        <Col span={6} offset={2}>
          <img src={imageCaptchaUrl2} title="看不清可单击图片刷新" alt="" onClick={getPicCode} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <FormItem hasFeedback wrapperCol={{ span: 24 }}>
            {getFieldDecorator('mobile_captcha', {
              rules: [
                {
                  required: true, message: '短信验证码不能为空',
                },
              ],
            }
            )(
              <Input prefix={<Icon type="mail" style={{ fontSize: 14 }} />} placeholder={'请输入短信验证码'} />
            )}
          </FormItem>
        </Col>
        <Col span={6} offset={2}>

          <Button disabled={timer.isDisabled} size="large" type="primary" style={{ width: '100%' }}
            onClick={() => handleGetCode('password_reset')}
          >{timer.text}</Button>

        </Col>
      </Row>
      <Row>
        <Button type="primary" size="large" className="width100" onClick={resetPwd}>
          下一步
        </Button>
      </Row>
    </Form>)


  const SavePwd =
    (<Form>
      <FormItem hasFeedback {...formItemLayout}>

        {getFieldDecorator('password', {
          rules: [
              { required: true, message: '新密码不能为空!' },
              { pattern: /^([a-zA-Z0-9]|[_~!@#\$%\^&\*\(\)\-_\+=\[\]\{\}\|\\;:'",\.\/<>\?]){6,16}$/, message: '请填写正确的密码!' },
            {
              validator: checkConfirm,
            },
          ],
        }
        )(
          <Input type="password" size="large" prefix={<Icon type="key" style={{ fontSize: 14 }} />} placeholder="请输入新密码" />
        )}
      </FormItem>
      <FormItem hasFeedback {...formItemLayout}>
        {getFieldDecorator('confirm', {
          rules: [
              { required: true, message: '不能为空!' },
            {
              validator: checkPassword,
            },
          ],
        }
        )(
          <Input type="password" size="large" prefix={<Icon type="key" style={{ fontSize: 14 }} />}
            placeholder="请再次输入新密码"
          />
        )}
      </FormItem>
      <Row>
        <Button type="primary" size="large" className="width100" onClick={handleSave}>
          保存
        </Button>
      </Row>
    </Form>)

  const DivBody = toInputPwd ? SavePwd : ChangePwd
  return (
    <div className="divWrapper">
      <div className="divHeader">
        <img src={config.logoSrc} alt="" />
        <span>{config.logoText}</span>
      </div>
      <div className="divBody">
        {DivBody}
      </div>
      <div className="divFooter">
        <Link to="/"> 返回登录 </Link>
      </div>
    </div>
  )
}

Index.propTypes = {
  getVerificationCode: PropTypes.func,
  timer: PropTypes.object,
  toInputPwd: PropTypes.bool,
  getPicCode: PropTypes.func,
  handleToInputPwd: PropTypes.func,
  saveResetPwd: PropTypes.func,
  mobile: PropTypes.string,
  mobileCaptcha: PropTypes.string,
  imageCaptchaUrl2: PropTypes.string,
  form: PropTypes.object,
}

export default Form.create()(Index)
