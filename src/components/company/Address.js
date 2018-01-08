import React, { PropTypes } from 'react'
import { Card, Form, Input, Cascader, Row, Col } from 'antd'
import styles from './Address.css'
import Extra from '../ui/Extra'
import { AREAS } from '../../utils/areas'

const FormItem = Form.Item

function Address ({
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
        values.manage_address = {
          detail: values.manage_address.detail,
          province: values.manageAddress[0],
          city: values.manageAddress[1],
          county: values.manageAddress[2],
        }
        values.invoice_address = {
          detail: values.invoice_address.detail,
          province: values.invoiceAddress[0],
          city: values.invoiceAddress[1],
          county: values.invoiceAddress[2],
        }
        delete values.manageAddress
        delete values.invoiceAddress
        handleSave(values)
      })
    },

  }


  const handleSearch = () => {

  }

  const options = AREAS

  return (
    <div className={styles.normal}>
      <Form
        className="ant-advanced-search-form"
        onSubmit={handleSearch}
      >
        <Card title="地址信息" extra={editAbleState ? <Extra {...extraProps} /> : null}>
          <Row gutter={20}>
            <Col span={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'经营地址'}>
                  {getFieldDecorator('manageAddress', {
                    initialValue: data.manage_address && [data.manage_address.province, data.manage_address.city, data.manage_address.county],
                    rules: [
                      {
                        required: false,
                        message: '请选择经营地址',
                      },
                    ],
                  })(
                    <Cascader options={options} placeholder="请选择经营地址" />
                  )}
                </FormItem> : <FormItem {...formItemLayout} label={'经营地址'}>
                {data.manage_address && (`${data.manage_address.province}/${data.manage_address.city}/${data.manage_address.county}`)}
              </FormItem>}
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              {status === 'edit' ?
                <FormItem {...{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }} label={'经营地址－详细地址'}>
                  {getFieldDecorator('manage_address.detail', {
                    initialValue: data.manage_address && data.manage_address.detail,
                    rules: [
                      {
                        required: false,
                        message: '请输入详细的街道和门牌号地址',
                      },
                    ],
                  })(
                    <Input type="textarea" placeholder="请输入详细的街道和门牌号地址。" autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem> : <FormItem {...{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
                  label={'经营地址－详细地址'}
                >{data.manage_address && data.manage_address.detail}</FormItem>}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'发票地址'}>
                  {getFieldDecorator('invoiceAddress', {
                    initialValue: data.invoice_address && [data.invoice_address.province, data.invoice_address.city, data.invoice_address.county],
                    rules: [
                      {
                        required: false,
                        message: '请选择发票地址',
                      },
                    ],
                  })(
                    <Cascader options={options} placeholder="请选择发票地址" />
                  )}
                </FormItem> : <FormItem {...formItemLayout} label={'发票地址'}>
                {data.invoice_address && (`${data.invoice_address.province}/${data.invoice_address.city}/${data.invoice_address.county}`)}
              </FormItem>}
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              {status === 'edit' ?
                <FormItem {...{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }} label={'发票地址－详细地址'}>
                  {getFieldDecorator('invoice_address.detail', {
                    initialValue: data.invoice_address && data.invoice_address.detail,
                    rules: [
                      {
                        required: false,
                        message: '请输入详细的街道和门牌号地址',
                      },
                    ],
                  })(
                    <Input type="textarea" placeholder="请输入详细的街道和门牌号地址。" autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem> : <FormItem {...{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
                  label={'发票地址－详细地址'}
                >{data.invoice_address && data.invoice_address.detail}</FormItem>}
            </Col>
          </Row>

        </Card>
      </Form>
    </div>
  )
}
Address.propTypes = {
  editAbleState: PropTypes.bool,
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  form: PropTypes.object,
}


export default Form.create()(Address)
