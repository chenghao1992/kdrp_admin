import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import styles from '../common_list.less'
import classNames from 'classnames'

import { Form, Input, Button, Row, Col, Select, Spin } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import { Rules } from '../../utils/verificationCode'


function Add ({
  loading,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) {
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const rowGutter = 0

  const handleSubmit = (e) => {
    e.preventDefault()
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  return (
    <div className={styles.normal}>
      <Spin spinning={!!loading}>
        <Form onSubmit={handleSubmit} className="login-form">
          <Row>
            <h2 className={classNames(styles.common_header_h2, styles.common_margin_b15)}>机构基本信息</h2>
          </Row>
          <Row gutter={rowGutter}>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'机构代码'}>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: '请输入机构代码！',
                    }, {
                      ...Rules.name,
                    }, {
                      min: 3,
                      message: '最少3个字符',
                    },
                  ],
                })(
                  <Input placeholder="请输入机构代码" />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'组织层级'} hasFeedback>
                {getFieldDecorator('level', {
                  rules: [
                    { required: true, message: '请选择组织层级！' },
                  ],
                })(
                  <Select placeholder="请选择组织层级">
                    <Option value="2">2级</Option>
                    <Option value="3">3级</Option>
                    <Option value="4">4级</Option>
                  </Select>
                )}

              </FormItem>
            </Col>
          </Row>

          <Row gutter={rowGutter}>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'企业全称'}>
                {getFieldDecorator('full_name', {
                  rules: [
                    { max: 200, required: true, message: '请输入企业全称!' },
                  ],
                })(
                  <Input placeholder="请输入企业全称" />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'企业简称'}>
                {getFieldDecorator('name', {
                  rules: [
                    { max: 20, required: true, message: '请输入企业简称!' },
                  ],
                })(
                  <Input placeholder="请输入企业简称" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={rowGutter}>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'业务联系人姓名'}>
                {getFieldDecorator('business_contact.name', {
                  rules: [
                    {
                      max: 50,
                      required: true,
                      message: '请输入业务联系人姓名!',
                    },
                  ],
                })(
                  <Input placeholder="请输入业务联系人姓名" />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'业务联系人手机号'}>
                {getFieldDecorator('business_contact.mobile', {
                  rules: [
                    {
                      ...Rules.phoneNumber,
                    }, {
                      required: true,
                      message: '请输入业务联系人手机号!',
                    },
                  ],
                })(
                  <Input placeholder="请输入业务联系人手机号" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={rowGutter}>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'业务联系人邮箱'}>
                {getFieldDecorator('business_contact.email', {
                  rules: [
                    {
                      ...Rules.email,
                    },
                  ],
                })(
                  <Input placeholder="请输入业务联系人邮箱" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={rowGutter}>
            <Col span={22}>
              <FormItem {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }} label={'备注'}>
                {getFieldDecorator('note', {
                  rules: [
                    {
                      max: 255,
                      message: '最多255个字符',
                    },
                  ],
                })(
                  <Input type="textarea" placeholder="请输入备注" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <h2 className={styles.common_header_h2}>设置管理员</h2>
          </Row>

          <Row gutter={rowGutter}>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'管理员姓名'}>
                {getFieldDecorator('user.real_name', {
                  rules: [
                    {
                      max: 50,
                      required: true,
                      message: '请输入管理员姓名!',
                    },
                  ],
                })(
                  <Input placeholder="请输入管理员姓名" />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'管理员手机号'}>
                {getFieldDecorator('user.mobile', {
                  rules: [
                    {
                      ...Rules.phoneNumber,
                      required: true,
                      message: '请输入管理员手机号!',
                    },
                  ],
                })(
                  <Input placeholder="请输入管理员手机号" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={rowGutter}>
            <Col span={11}>
              <FormItem {...formItemLayout} label={'管理员邮箱'}>
                {getFieldDecorator('user.email', {
                  rules: [
                    {
                      ...Rules.email,
                    },
                  ],
                })(
                  <Input placeholder="请输入管理员邮箱" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={rowGutter}>
            <Col span={22}>
              <FormItem
                wrapperCol={{ span: 20, offset: 4 }}
              >
                <Button type="primary" htmlType="submit" size={"default"}>提交</Button>
                <Link to="/channel/partner">
                  <Button type="default" htmlType="button" className={styles.common_margin_l10}>取消</Button>
                </Link>
              </FormItem>
            </Col>
          </Row>

        </Form>
      </Spin>
    </div>
  )
}

Add.propTypes = {
  loading: PropTypes.bool,
  onOk: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Add)
