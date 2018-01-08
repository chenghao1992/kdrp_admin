/**
 * Created by xiaoys on 2017/11/29.
 */
import React, { PropTypes } from 'react'
import { Form, Input, Button, Select, Row, Col, Cascader } from 'antd'
import { Rules } from '../../utils/verificationCode'
import { AREAS } from '../../utils/areas.js'
import { hashHistory } from 'dva/router'

import commonStyle from '../../components/common_list.less'
import styles from './newContact.less'

const FormItem = Form.Item
const Option = Select.Option


const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const rowGutter = 0

function NewContact ({
  location,
  onHandle,
  codes = {},
  contactTyped,
  initCodes,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
  },
}) {
  console.log(codes)

  const status = location.query.status

  const selectList = contactTyped.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)

  const handleReset = () => {
    resetFields()
    initCodes()
    hashHistory.push(`/customer/customerList_cs_detail?id=${location.query.id}`)
  }

  const handlerRelationship = (values, q) => {
    for (let i = 0; i < values.length; i ++) {
      if (values[i].name === q) {
        return values[i].id
      }
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const data = {
        home_province: values.home ? values.home[0] : '',
        home_city: values.home ? values.home[1] : '',
        home_county: values.home ? values.home[2] : '',
        work_province: values.work ? values.work[0] : '',
        work_city: values.work ? values.work[1] : '',
        work_county: values.work ? values.work[2] : '',
      }

      const actives = values.active === '否（默认选项）' ? 0 : 1

      const id = codes.id || ''

      const q = codes.relation_type === values.relation_type_id || !codes.relation_type ? handlerRelationship(contactTyped, values.relation_type_id) : values.relation_type_id

      const params = { ...values, ...data, active: actives, relation_type_id: q, contact_id: id }

      onHandle(params, resetFields)
    })
  }

  return (
    <div>
      <Form className="login-form" onSubmit={handleSubmit}>
        <div className={styles.border_bottom}></div>
        <h2 className={commonStyle.common_h2}>基本信息</h2>

        <Row gutter={rowGutter}>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="联系人姓名：" {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: codes.name,
                  rules: [
                    { required: true, message: '请输入联系人姓名！' },
                    { ...Rules.name },
                    { min: 2, message: '最少2个字符' },
                  ],
                })(<Input placeholder="请输入联系人姓名" />)}
              </FormItem> :
              <FormItem label="联系人姓名：" {...formItemLayout}>
                {getFieldDecorator('name', { rules: [{ required: true }] })(<span>{codes.name || '--'}</span>)}
              </FormItem>
            }
          </Col>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="与客户关系：" {...formItemLayout}>
                {getFieldDecorator('relation_type_id', {
                  initialValue: codes.relation_type || '客户本人',
                })((<Select placeholder="请选择与客户关系">
                  {selectList}
                </Select>))}
              </FormItem> :
              <FormItem label="与客户关系：" {...formItemLayout}>
                {getFieldDecorator('relation_type_id')(<span>{codes.relation_type || '--'}</span>)}
              </FormItem>
            }
          </Col>
        </Row>

        <Row gutter={rowGutter}>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="设为主要联系人：" {...formItemLayout}>
                {getFieldDecorator('active', {
                  initialValue: codes.active ? '是' : '否（默认选项）',
                })(<Select placeholder="请选择是否设为主要联系人">
                  <Option value="0">否（默认选项）</Option>
                  <Option value="1">是</Option>
                </Select>)}
              </FormItem> :
              <FormItem label="设为主要联系人：" {...formItemLayout}>
                {getFieldDecorator('active')(<span>{codes.active ? '是' : '否（默认选项）'}</span>)}
              </FormItem>
            }
          </Col>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="联系人号码有效性：" {...formItemLayout}>
                {getFieldDecorator('mobile_validate_status', {
                  initialValue: codes.mobile_validate_status || '号码有效（已验证）',
                })(<Select placeholder="请选择联系人号码有效性">
                  <Option value="号码有效（已验证）">号码有效（已验证）</Option>
                  <Option value="号码无效（已验证）">号码无效（已验证）</Option>
                  <Option value="号码状态未知">号码状态未知</Option>
                </Select>)}
              </FormItem> :
              <FormItem label="联系人号码有效性：" {...formItemLayout}>
                {getFieldDecorator('mobile_validate_status')(<span>{codes.mobile_validate_status || '--'}</span>)}
              </FormItem>
            }
          </Col>
        </Row>

        <div className={styles.border_bottom}></div>
        <h2 className={commonStyle.common_h2}>联系信息</h2>

        <Row gutter={rowGutter}>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="联系人手机：" {...formItemLayout}>
                {getFieldDecorator('mobile', {
                  initialValue: codes.mobile,
                  rules: [
                    { required: true, message: '请输入联系人手机号' },
                    { ...Rules.phoneNumber },
                  ],
                })(<Input placeholder="请输入联系人手机号" />)}
              </FormItem> :
              <FormItem label="联系人手机：" {...formItemLayout}>
                {getFieldDecorator('mobile', { rules: [{ required: true }] })(<span>{codes.mobile || '--'}</span>)}
              </FormItem>
            }
          </Col>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="微信号：" {...formItemLayout}>
                {getFieldDecorator('wechat', {
                  initialValue: codes.wechat,
                  rules: [
                    {
                      ...Rules.name,
                    },
                  ],
                })(<Input placeholder="请输入微信号" />)}
              </FormItem> :
              <FormItem label="微信号：" {...formItemLayout}>
                {getFieldDecorator('wechat')(<span>{codes.wechat || '--'}</span>)}
              </FormItem>
            }
          </Col>
        </Row>

        <Row gutter={rowGutter}>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="备用手机号：" {...formItemLayout}>
                {getFieldDecorator('mobile2', {
                  initialValue: codes.mobile2,
                  rules: [
                    {
                      ...Rules.phoneNumber,
                    },
                  ],
                })(<Input placeholder="请输入备用手机号" />)}
              </FormItem> :
              <FormItem label="备用手机号：" {...formItemLayout}>
                {getFieldDecorator('mobile2')(<span>{codes.mobile2 || '--'}</span>)}
              </FormItem>
            }
          </Col>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="Email：" {...formItemLayout}>
                {getFieldDecorator('email', {
                  initialValue: codes.email,
                  rules: [
                    {
                      ...Rules.name,
                    },
                  ],
                })(<Input placeholder="请输入Email" />)}
              </FormItem> :
              <FormItem label="Email：" {...formItemLayout}>
                {getFieldDecorator('email')(<span>{codes.email || '--'}</span>)}
              </FormItem>
            }
          </Col>
        </Row>

        <Row gutter={rowGutter}>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="固定电话：" {...formItemLayout}>
                {getFieldDecorator('phone', {
                  initialValue: codes.phone,
                  rules: [
                    {
                      ...Rules.fixedNumber,
                    },
                  ],
                })(<Input placeholder="请输入固定电话" />)}
              </FormItem> :
              <FormItem label="固定电话：" {...formItemLayout}>
                {getFieldDecorator('phone')(<span>{codes.phone || '--'}</span>)}
              </FormItem>
            }
          </Col>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="QQ号码：" {...formItemLayout}>
                {getFieldDecorator('qq', {
                  initialValue: codes.qq,
                  rules: [
                    {
                      ...Rules.name,
                    },
                  ],
                })(<Input placeholder="请输入QQ号码" />)}
              </FormItem> :
              <FormItem label="QQ号码：" {...formItemLayout}>
                {getFieldDecorator('qq')(<span>{codes.qq || '--'}</span>)}
              </FormItem>
            }
          </Col>
        </Row>

        <div className={styles.border_bottom}></div>
        <h2 className={commonStyle.common_h2}>家庭地址</h2>

        <Row gutter={rowGutter}>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="家庭地址：" {...formItemLayout}>
                {getFieldDecorator('home', {
                  initialValue: codes.home_address ? codes.home_address.region : '',
                })(<Cascader
                  options={AREAS}
                  placeholder="请选择家庭地址"
                  expandTrigger="hover"
                  style={{ width: '100%' }}
                />)}
              </FormItem> :
              <FormItem label="家庭地址：" {...formItemLayout}>
                {getFieldDecorator('home_address')(<span>{codes.home_address ? `${codes.home_address.region[0]}${codes.home_address.region[1]}${codes.home_address.region[2]}` : '--'}</span>)}
              </FormItem>
            }
          </Col>
        </Row>

        <Row>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="详细地址：" {...formItemLayout}>
                {getFieldDecorator('home_detail', {
                  initialValue: codes.home_address ? codes.home_address.detail : '',
                  rules: [
                    {
                      ...Rules.justAddress,
                    },
                  ],
                })(<Input type="textarea" placeholder="请输入详细地址和街道门牌号" />)}
              </FormItem> :
              <FormItem label="详细地址：" {...formItemLayout}>
                {getFieldDecorator('home_detail')(<span>{codes.home_address ? codes.home_address.detail : ''}</span>)}
              </FormItem>
            }
          </Col>
        </Row>

        <div className={styles.border_bottom}></div>
        <h2 className={commonStyle.common_h2}>工作地址</h2>

        <Row gutter={rowGutter}>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="工作地址：" {...formItemLayout}>
                {getFieldDecorator('work', {
                  initialValue: codes.work_address ? codes.work_address.region : '',
                })(<Cascader
                  options={AREAS}
                  placeholder="请选择工作地址"
                  expandTrigger="hover"
                  style={{ width: '100%' }}
                />)}
              </FormItem> :
              <FormItem label="工作地址：" {...formItemLayout}>
                {getFieldDecorator('work')(<span>{codes.home_address ? `${codes.home_address.region[0]}${codes.home_address.region[1]}${codes.home_address.region[2]}` : '--'}</span>)}
              </FormItem>
            }
          </Col>
        </Row>

        <Row>
          <Col span={11}>
            {status !== '3' ?
              <FormItem label="详细地址：" {...formItemLayout}>
                {getFieldDecorator('work_detail', {
                  initialValue: codes.work_address ? codes.work_address.detail : '',
                  rules: [
                    {
                      ...Rules.justAddress,
                    },
                  ],
                })(<Input type="textarea" placeholder="请输入详细地址和街道门牌号" />)}
              </FormItem> :
              <FormItem label="详细地址：" {...formItemLayout}>
                {getFieldDecorator('home_detail')(<span>{codes.work_address ? codes.work_address.detail : ''}</span>)}
              </FormItem>
            }
          </Col>
        </Row>
        {status !== '3' ?
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">保存</Button>
              <Button className={commonStyle.common_search_clear} onClick={handleReset}>取消</Button>
            </Col>
          </Row> : ''
        }
      </Form>
    </div>
  )
}

NewContact.propTypes = {
  location: PropTypes.object,
  onHandle: PropTypes.func,
  codes: PropTypes.object,
  contactTyped: PropTypes.array,
  initCodes: PropTypes.object,
  form: PropTypes.object,
}

export default Form.create()(NewContact)
