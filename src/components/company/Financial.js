import React, { PropTypes } from 'react'
import { Card, Form, Input, Select, Row, Col, Alert } from 'antd'
import styles from './Financial.css'
import Extra from '../ui/Extra'
import { BANK } from '../../utils/enums'
import { Rules } from '../../utils/verificationCode'


const FormItem = Form.Item
const Option = Select.Option

function Financial ({
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

  // const bankOptions = []


  return (
    <div className={styles.normal}>
      <Form
        className="ant-advanced-search-form"
        onSubmit={handleSearch}
      >
        <Card title="财务信息" extra={editAbleState ? <Extra {...extraProps} /> : null}>
          <Row gutter={20}>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'开户银行'}>
                  {getFieldDecorator('bank_account.bank', {
                    initialValue: data.bank_account && data.bank_account.bank,
                    rules: [
                      {
                        required: true,
                        message: '请选择开户银行',
                      },
                    ],
                  })(
                    <Select >
                      {
                        BANK.map(d => {
                          return <Option key={d}>{d}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem> :
                <FormItem {...formItemLayout} label={'开户银行'}>{data.bank_account && data.bank_account.bank}</FormItem>}
            </Col>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'开户支行'}>
                  {getFieldDecorator('bank_account.branch', {
                    initialValue: data.bank_account && data.bank_account.branch,
                    rules: [
                      {
                        required: true,
                        message: '请填写全称，如：招商银行深圳华润城支行',
                      }, {
                        ...Rules.name,
                      },
                    ],
                  })(
                    <Input placeholder="请填写全称，如：招商银行深圳华润城支行" />
                  )}
                </FormItem> :
                <FormItem {...formItemLayout} label={'开户支行'}>{data.bank_account && data.bank_account.branch}</FormItem>}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'开户名'}>
                  {getFieldDecorator('bank_account.name', {
                    initialValue: data.bank_account && data.bank_account.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入开户名',
                      }, {
                        ...Rules.name,
                      },
                    ],
                  })(
                    <Input placeholder="如：佳兆业物业管理(深圳)有限公司" />
                  )}
                </FormItem> :
                <FormItem {...formItemLayout} label={'开户名'}>{data.bank_account && data.bank_account.name}</FormItem>}
            </Col>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'银行账号'}>
                  {getFieldDecorator('bank_account.account_no', {
                    initialValue: data.bank_account && data.bank_account.account_no,
                    rules: [
                      {
                        required: true,
                        message: '请输入银行账号',
                      }, {
                        ...Rules.justNumber,
                      },
                    ],
                  })(
                    <Input placeholder="请输入银行账号" />
                  )}
                </FormItem> : <FormItem {...formItemLayout}
                  label={'银行账号'}
                >{data.bank_account && data.bank_account.account_no}</FormItem>}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'公司纳税识别号'}>
                  {getFieldDecorator('tax_no', {
                    initialValue: data.tax_no,
                    rules: [
                      {
                        required: false,
                        message: '请严格按照税务登记资料填写',
                      },
                    ],
                  })(
                    <Input placeholder="请严格按照税务登记资料填写" />
                  )}
                </FormItem> : <FormItem {...formItemLayout} label={'公司纳税识别号'}>{data.tax_no}</FormItem>}
            </Col>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'公司地址'}>
                  {getFieldDecorator('tax_company_address', {
                    initialValue: data.tax_company_address,
                    rules: [
                      {
                        required: false,
                        message: '请严格按照税务登记资料填写',
                      },
                    ],
                  })(
                    <Input placeholder="请严格按照税务登记资料填写" />
                  )}
                </FormItem> : <FormItem {...formItemLayout} label={'公司地址'}>{data.tax_company_address}</FormItem>}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} lg={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'公司电话'}>
                  {getFieldDecorator('tax_company_phone', {
                    initialValue: data.tax_company_phone,
                    rules: [
                      {
                        required: false,
                        message: '请严格按照税务登记资料填写',
                      },
                    ],
                  })(
                    <Input placeholder="请严格按照税务登记资料填写" />
                  )}
                </FormItem> : <FormItem {...formItemLayout} label={'公司电话'}>{data.tax_company_phone}</FormItem>}
            </Col>
          </Row>


          <Alert
            message="请严格按照证件信息填写以上财务信息。如不需要进行银行转账结算，请全部填写00000.后期可以到公司信息管理模块进行修改。"
            type="warning" showIcon
          />

        </Card>
      </Form>
    </div>
  )
}
Financial.propTypes = {
  editAbleState: PropTypes.bool,
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Financial)

