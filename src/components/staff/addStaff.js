import React, { PropTypes } from 'react'
import { Form, Input, Radio, Modal, Cascader } from 'antd'
import styles from './addStaff.css'
import { Rules } from '../../utils/verificationCode'
// import { findPathInTree } from '../../utils/index'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  orgTree,
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }

      const datas = {
        ...data,
        is_customer_service: data.is_customer_service ? 1 : 0,
      }
      onOk(datas)
    })
  }

  if (localStorage.getItem('get')) {
    localStorage.clear('get')
    resetFields()
  }

  const modalOpts = {
    title: `${type === 'create' ? '新增员工' : '编辑'}`,
    visible,
    onOk: handleOk,
    onCancel: () => {
      onCancel()
      resetFields()
    },
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="姓名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                ...Rules.name,
                required: true,
              },
            ],
          })(<Input placeholder="请填写姓名" />)}
        </FormItem>
        <FormItem label="邮箱：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                ...Rules.email,
              },
            ],
          })(<Input placeholder="请填写邮箱" />)}
        </FormItem>
        <FormItem label="手机：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                ...Rules.phoneNumber,
                required: true,
              },
            ],
          })(<Input placeholder="短信邀请将会发送到这个手机号" disabled={modalOpts.title !== '新增员工'} />)}
        </FormItem>
        <FormItem label="是否担任兼职客服:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('is_customer_service', {
            initialValue: item.customerService,
            rules: [
              {
                ...Rules.justBoolean,
                required: true,
              },
            ],
          })(
            <RadioGroup >
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <p className={styles.from_p}>{type === 'create' ? '' : '注意：选择“否”后将清空员工名下所有客户关联信息。客户回收到客户池。'}</p>
        <FormItem {...formItemLayout} label={'组织'}>
          {getFieldDecorator('agency_id', {
            initialValue: item.agency_idD,
            rules: [
              {
                ...Rules.justArray,
                required: true,
              },
            ],
          })(
            <Cascader style={{ width: 300 }} options={orgTree} placeholder="请选择组织" changeOnSelect />
          )}
        </FormItem>
        <p className={styles.from_p}>{type === 'create' ? '请务必询问您邀请的员工目前是否已有金服理财账号,如有请填写他的金服注册手机号进行邀请' : ''}</p>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  orgTree: PropTypes.array,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(modal)
