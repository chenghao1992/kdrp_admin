import React, { PropTypes } from 'react'
import { Button, Card, Col, Row, Input, Form } from 'antd'
const FormItem = Form.Item

function ChangePwd ({
  buttonClick,
  imageCaptchaUrl,
  freezeMsg,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldValue,
    resetFields,
    validateFieldsAndScroll,
  },
}) {
  console.log(freezeMsg)
  // const imageCaptchaUrl = image_captcha_url

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const isDisabled = freezeMsg === true
  const giveupChange = () => {
    resetFields()
  }

  const onChangePwd = (e) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        buttonClick.onChangePwd(values)
        buttonClick.getPicCode()
      }
    })
  }
  const checkPassword = (rule, value, callback) => {
    // const form = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }
  const checkConfirm = (rule, value, callback) => {
    // const form = this.props.form;
    if (value) {
      validateFields(['confirm'], { force: true })
    }
    callback()
  }

  return (
    <Card title="修改密码" bordered bodyStyle={{}}>
      <div className="personal_info">
        <div className="right_con">
          <Row gutter={40} type="flex" justify="center">
            <Col xs={24} md={18} lg={10} >
              <Form>
                <FormItem {...formItemLayout} label={'原密码:'}>
                  {getFieldDecorator('oldpassword',
                    {
                      initialValue: '',
                      rules: [
                        { required: true, message: '密码不能为空!' },
                      ],

                    })(
                    <Input type="password" placeholder="请输入原密码" disabled={isDisabled} />
                  )}
                </FormItem>
                <FormItem hasFeedback {...formItemLayout} label={'新密码:'}>

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
                    <Input type="password" placeholder="请输入新密码" disabled={isDisabled} />
                  )}
                </FormItem>
                <FormItem hasFeedback {...formItemLayout} label={'再次输入密码:'}>

                  {getFieldDecorator('confirm', {
                    rules: [
                      { required: true, message: '不能为空!' },
                      {
                        validator: checkPassword,
                      },
                    ],
                  }
                  )(
                    <Input type="password" placeholder="请再次输入新密码" disabled={isDisabled} />
                  )}
                </FormItem>
                {/* 外面不套一层Row可能导致输入框无法编辑或者脱离布局流*/}
                <Row>
                    <Col span={12}>
                      <FormItem labelCol={{ span: 16 }} wrapperCol={{ span: 8 }} label={'图形验证码:'}>
                        {getFieldDecorator('image_captcha', {
                          rules: [
                              { required: true, message: '验证码不能为空!' },
                          ],
                        }
                        )(
                          <Input placeholder={'请输入验证码'} style={{ width: '100%' }} disabled={isDisabled} />
                        )}
                      </FormItem>
                    </Col>
                    <Col span={6} offset={2}>
                      <img src={imageCaptchaUrl} title="看不清可单击图片刷新" alt="" onClick={buttonClick.getPicCode} />
                    </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row gutter={40} type="flex" justify="center">
            <Col>
              <Button type="primary" style={{ marginRight: '15px' }} onClick={onChangePwd} disabled={isDisabled}>提交</Button>
              <Button onClick={giveupChange} disabled={isDisabled}>放弃修改</Button>
            </Col>
          </Row>


        </div>
      </div>
    </Card>
  )
}

ChangePwd.propTypes = {
  buttonClick: PropTypes.object,
  imageCaptchaUrl: PropTypes.string,
  freezeMsg: PropTypes.object,
  form: PropTypes.object,
}

export default Form.create()(ChangePwd)
