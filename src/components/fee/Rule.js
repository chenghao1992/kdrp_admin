import React, { PropTypes } from 'react'
import { Card, Form, Input, Alert, Row, Col, DatePicker } from 'antd'
import Extra from '../ui/Extra'
import styles from './Rule.css'
import moment from 'moment'
import { Rules } from '../../utils/verificationCode'

const FormItem = Form.Item
const { RangePicker } = DatePicker
/* 编辑，查看*/
function Rule ({
  data,
  handleCancel,
  handleEdit,
  handleSave,
  handleDelete,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) {
  const { status } = data

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  const formItemLayout2 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }


  const extraProps = {
    status: data.status,
    buttons: ['修改'],
    handleMenuClick (e) {
      if (e.key === '修改') {
        handleEdit(data.id)
      } else if (e.key === '删除') {
        handleDelete(data.id)
      }
    },
    handleCancel () {
      handleCancel(data.id)
    },
    handleSave () {
      validateFields((errors, values) => {
        if (errors) {
          return
        }
        let d = {}
        let rules = []
        for (let x in values.ruleData) {
          if (values.ruleData[x]) {
            rules.push({
              key: x,
              value: values.ruleData[x],
            })
          }
        }
        d = {
          ...values,
          rules,
          start_end_time: values.start_end_time && `${values.start_end_time[0].format('YYYY-MM-DD HH:mm:ss')}~${values.start_end_time[1].format('YYYY-MM-DD HH:mm:ss')}`,
        }
        delete d.ruleData
        handleSave(d, data.id)
      })
    },
  }

  return (
    <div className={styles.normal}>
      <Form
        className="ant-advanced-search-form"
      >
        <Card title={data.name ? `规则名称：${data.name}` : '新增规则'} extra={<Extra {...extraProps} />}>

          {status === 'edit' ?
            <Row gutter={20}>
              <Col span={13}>
                <FormItem {...formItemLayout} label={'规则名称'}>
                  {getFieldDecorator('name', {
                    initialValue: data.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入规则名称',
                      },
                    ],
                  })(
                    <Input placeholder="请输入规则名称" />
                  )}
                </FormItem>
              </Col>
            </Row> : null}

          <Row gutter={20}>
            <Col span={13}>
              {status === 'edit' ?
                <FormItem {...formItemLayout} label={'生效时间'}>
                  {
                    getFieldDecorator('start_end_time', {
                      initialValue: data.start_end_time && [moment(data.start_end_time.split('~')[0], 'YYYY-MM-DD HH:mm:ss'), moment(data.start_end_time.split('~')[1], 'YYYY-MM-DD HH:mm:ss')],
                      rules: [
                        {
                          required: true,
                          message: '请输入生效时间',
                        },
                      ],
                    })(
                    <RangePicker
                      placeholder={['开始时间', '结束时间']}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  )}
                </FormItem> :
                <FormItem {...formItemLayout} label={'生效时间'}>{`${data.start_end_time}`}</FormItem>}
            </Col>

          </Row>

          <Row gutter={20}>
            <Col span={12}>
              {status === 'edit' ?
                <FormItem {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }} label={'组织总服务费限定'}>
                  {getFieldDecorator('limit', {
                    initialValue: data.limit,
                    rules: [
                      {
                        required: true,
                        message: '请输入组织总服务费',
                      }, {
                        ...Rules.amount,
                      },
                    ],
                  })(
                    <Input placeholder="请输入组织总服务费" addonAfter="%" />
                  )}
                </FormItem> : <FormItem {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
                  label={'组织总服务费限定'}
                >{data.limit}%</FormItem>}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={13}>
              组织服务费分配参数设定
            </Col>
          </Row>

          <Row gutter={20}>
            {
              data.rules.map(d => {
                return (
                <Col span={d.key === 'customer_service' ? 6 : 4} key={d.key}>
                  {status === 'edit' ?
                    <FormItem {...formItemLayout2} label={d.name}>
                      {getFieldDecorator(`ruleData.${d.key}`, {
                        initialValue: d.value,
                        rules: [
                          {
                            required: true,
                            message: '请输入',
                          }, {
                            ...Rules.amount,
                          },
                        ],
                      })(
                        <Input placeholder="请输入" addonAfter="%" />
                      )}
                    </FormItem> : <FormItem {...{
                      labelCol: { span: 14 },
                      wrapperCol: { span: 10 },
                    }} label={d.name}
                    >{`${d.value}%`}</FormItem>}
                </Col>
              )
              })}
          </Row>

          {status === 'edit' ? <Alert
            message="请严格按照操作指引制定服务费分配比例计划。一个阶段的分配规则到期前，必须设定好下一个阶段的服务费分配计划。否则系统将按照最后一次设定的规则继续执行。不分配的层级，比例设定为0
即可。日期设定请特别注意大小月份。分配比例总和必须等于您与佳兆业金服签署的当期合同规定之数值，以您与佳兆业金服签署的实际合同为准。如因系统异常导致结算金额超出合同范围的不予以结算。"
            type="warning" showIcon
          /> : null}

        </Card>
      </Form>
    </div>
  )
}

Rule.propTypes = {
  data: PropTypes.array,
  handleCancel: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Rule)

