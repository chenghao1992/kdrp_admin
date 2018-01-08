import React, { PropTypes } from 'react'
import { Button, Card, Col, Row, Input, Form, Icon, Modal } from 'antd'
import classNames from 'classnames'
import styles from '../common_list.less'

const FormItem = Form.Item

function SecondChunk ({ obj, modalVisible, buttonClick, changName, timer_phone, imageCaptchaUrl, editStatus, inputNewNumber, verificationNumber,
  form: {
    getFieldDecorator,
    resetFields,
    validateFieldsAndScroll,
    getFieldValue,
  },
}) {
  const handleOk = (e) => {
    e.preventDefault()
    if (changName === 'phone') {
      validateFieldsAndScroll(['mobile', 'mobile_captcha'], (err, values) => {
        if (!err) {
          buttonClick.changePhoneEmail(values, resetFields)
            // buttonClick.hideModal()
            // resetFields()
          console.log(values)
        }
      })
    } else {
      validateFieldsAndScroll(['email'], (err, values) => {
        if (!err) {
          buttonClick.changePhoneEmail(values)
          buttonClick.hideModal()
          resetFields()
        }
      })
    }
  }
  const getMsgCode = (status) => {
    const rangePhoneNumber = getFieldValue('mobile')
    if (rangePhoneNumber !== obj.mobile) {
      verificationNumber(false)
      validateFieldsAndScroll(['mobile', 'image_captcha'], (err, values) => {
        if (!err) {
          values.status = status
          buttonClick.getVerificationCode_phone(values)
          buttonClick.getPicCode()
        }
      })
    } else {
      verificationNumber(true)
    }
  }

  const onVerificationNumber = () => {
    verificationNumber(false)
  }

  const hideModal = () => {
    resetFields()
    buttonClick.hideModal()
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }
  const colLayout = {
    xl: 12,
    lg: 12,
    md: 12,
    xs: 24,
  }
  const children =
    (<Col>
      <Col {...colLayout}>
        <FormItem {...formItemLayout} label="手机主号">
          <span>{obj.mobile}</span>
          {editStatus ? <span name="phone" className="pointer" style={{ marginLeft: '20px', color: 'blue' }} onClick={buttonClick.showModal}>更换手机号</span> : ''}
        </FormItem>
      </Col>
      <Col {...colLayout}>
        <FormItem {...formItemLayout} label="联系邮箱">
          <span>{obj.email}</span>
          {editStatus ? <span name="email" className="pointer" style={{ marginLeft: '20px', color: 'blue' }} onClick={buttonClick.showModal}>更换邮箱</span> : ''}
        </FormItem>
      </Col>
    </Col>)
  return (
    <Card title="安全与验证" bordered bodyStyle={{}}>
      <div className="personal_info">
        <div className="right_con">
          <Row gutter={40}>
            {children}
          </Row>
          <Modal title={changName === 'phone' ? '请输入新的手机号' : '请输入新的邮箱地址'} visible={modalVisible}
            onOk={handleOk} onCancel={hideModal}

          >
            <Form className={classNames({ isHide: changName !== 'phone' })} >
              <FormItem hasFeedback>
                {getFieldDecorator('mobile', {
                  initialValue: obj.mobile,
                  rules: [{ required: true, message: '手机号不能为空' }, { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不对!' }],
                })(
                  <Input placeholder="请输入新的手机号" onChange={onVerificationNumber} />
                )}

              </FormItem>
              <p className={inputNewNumber ? '' : styles.common_d_none} style={{ marginTop: -18, color: '#f04134' }}>请输入新的手机号码！！！</p>
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
                  <img src={imageCaptchaUrl} title="看不清可单击图片刷新" alt="" onClick={buttonClick.getPicCode} />
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <FormItem wrapperCol={{ span: 24 }}>
                    {getFieldDecorator('mobile_captcha', {
                      rules: [
                          { required: true, message: '验证码不能为空' },
                      ],
                    }
                    )(
                      <Input prefix={<Icon type="mail" style={{ fontSize: 14 }} />} placeholder={'请输入短信验证码'} />
                    )}
                  </FormItem>
                </Col>
                <Col span={6} offset={2}>

                  <Button disabled={timer_phone.isDisabled} size="large" type="primary" style={{ width: '100%' }}
                    onClick={() => getMsgCode('modify_mobile')}
                  >{timer_phone.text}</Button>
                </Col>
              </Row>
            </Form>
            <Form className={classNames({ isHide: changName !== 'email' })}>
              <FormItem hasFeedback>

                {getFieldDecorator('email', {
                  initialValue: obj.email,
                  rules: [{ required: true, message: '邮箱不能为空' }, { type: 'email', message: '邮箱格式不对!' }],
                })(
                  <Input placeholder="请输入新的邮箱" />
                )}
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
    </Card>
  )
}

SecondChunk.propTypes = {
  obj: PropTypes.object,
  modalVisible: PropTypes.bool,
  buttonClick: PropTypes.object,
  changName: PropTypes.string,
  timer_phone: PropTypes.object,
  imageCaptchaUrl: PropTypes.string,
  editStatus: PropTypes.bool,
  inputNewNumber: PropTypes.bool,
  verificationNumber: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(SecondChunk)
