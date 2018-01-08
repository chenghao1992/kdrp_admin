import React, { PropTypes } from 'react'
import { Card, Form, Input, Row, Col } from 'antd'
import styles from './Contact.css'
import Extra from '../ui/Extra'
import { Rules } from '../../utils/verificationCode'

const FormItem = Form.Item

function Contact ({
  editAbleState,
  data,
  handleCancel,
  handleEdit,
  handleSave,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) {
  const { status } = data

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }


  const extraProps = {
    status: data.status,
    buttons: ['修改'],
    handleMenuClick (e) {
      if (e.key === '修改') {
        handleEdit()
      }
    },
    handleCancel () {
      handleCancel()
    },
    handleSave () {
      validateFields((errors, values) => {
        if (errors) {
          return
        }
        handleSave(values)
      })
    },

  }


  const handleSearch = () => {

  }

  return (
    <div className={styles.normal}>
      <Form
        className="ant-advanced-search-form"
        onSubmit={handleSearch}
      >
        <Card title="联系人信息" extra={editAbleState ? <Extra {...extraProps} /> : null}>
          <Row gutter={20}>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'业务联系人姓名'}>
                  {getFieldDecorator('business_contact.name', {
                    initialValue: data.business_contact && data.business_contact.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入业务联系人姓名',
                      }, {
                        ...Rules.name,
                      },
                    ],
                  })(
                    <Input placeholder="请输入业务联系人姓名" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'业务联系人姓名'}
                >{data.business_contact && data.business_contact.name}</FormItem>}
            </Col>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'业务联系人手机'}>
                  {getFieldDecorator('business_contact.mobile', {
                    initialValue: data.business_contact && data.business_contact.mobile,
                    rules: [
                      {
                        required: true,
                        message: '请输入业务联系人手机',
                      }, {
                        ...Rules.phoneNumber,
                      },
                    ],
                  })(
                    <Input placeholder="请输入业务联系人手机" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'业务联系人手机'}
                >{data.business_contact && data.business_contact.mobile}</FormItem>}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'业务联系人邮箱'}>
                  {getFieldDecorator('business_contact.email', {
                    initialValue: data.business_contact && data.business_contact.email,
                    rules: [
                      {
                        required: true,
                        message: '请输入业务联系人邮箱',
                      }, {
                        ...Rules.email,
                      },
                    ],
                  })(
                    <Input placeholder="请输入业务联系人邮箱" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'业务联系人邮箱'}
                >{data.business_contact && data.business_contact.email}</FormItem>}
            </Col>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'业务固定电话'}>
                  {getFieldDecorator('business_contact.phone', {
                    initialValue: data.business_contact && data.business_contact.phone,
                    rules: [
                      {
                        required: false,
                        message: '请输入业务固定电话',
                      }, {
                        ...Rules.fixedNumber,
                      },
                    ],
                  })(
                    <Input placeholder="请输入业务固定电话" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'业务固定电话'}
                >{data.business_contact && data.business_contact.phone}</FormItem>}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'财务联系人姓名'}>
                  {getFieldDecorator('finance_contact.name', {
                    initialValue: data.finance_contact && data.finance_contact.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入财务联系人姓名',
                      }, {
                        ...Rules.name,
                      },
                    ],
                  })(
                    <Input placeholder="请输入财务联系人姓名" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'财务联系人姓名'}
                >{data.finance_contact && data.finance_contact.name}</FormItem>}
            </Col>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'财务联系人手机'}>
                  {getFieldDecorator('finance_contact.mobile', {
                    initialValue: data.finance_contact && data.finance_contact.mobile,
                    rules: [
                      {
                        required: true,
                        message: '请输入财务联系人手机',
                      }, {
                        ...Rules.phoneNumber,
                      },
                    ],
                  })(
                    <Input placeholder="请输入财务联系人手机" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'财务联系人手机'}
                >{data.finance_contact && data.finance_contact.mobile}</FormItem>}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'财务联系人邮箱'}>
                  {getFieldDecorator('finance_contact.email', {
                    initialValue: data.finance_contact && data.finance_contact.email,
                    rules: [
                      {
                        required: true,
                        message: '请输入财务联系人邮箱',
                      }, {
                        ...Rules.email,
                      },
                    ],
                  })(
                    <Input placeholder="请输入财务联系人邮箱" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'财务联系人邮箱'}
                >{data.finance_contact && data.finance_contact.email}</FormItem>}
            </Col>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'财务固定电话'} disabled={status === 'edit'}>
                  {getFieldDecorator('finance_contact.phone', {
                    initialValue: data.finance_contact && data.finance_contact.phone,
                    rules: [
                      {
                        required: false,
                        message: '请输入财务固定电话',
                      }, {
                        ...Rules.fixedNumber,
                      },
                    ],
                  })(
                    <Input placeholder="请输入财务固定电话" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'财务固定电话'}
                >{data.finance_contact && data.finance_contact.phone}</FormItem>}
            </Col>
          </Row>

        </Card>
      </Form>
    </div>
  )
}
Contact.propTypes = {
  editAbleState: PropTypes.bool,
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Contact)

