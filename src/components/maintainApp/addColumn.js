/**
 * Created by xiaoys on 2017/9/5.
 */
import React, { PropTypes } from 'react'
import { Form, Input, Radio, Modal } from 'antd'
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

const Addmodal = ({
  addVisible,
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
  console.log(item)
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      const datas = { ...data, display: data.display ? '1' : '0', id: item ? item.id : '' }
      onOk(datas, resetFields)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '新建' : '编辑'}`,
    visible: addVisible,
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
        <FormItem label="栏目名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                ...Rules.lessName,
                required: true,
              },
            ],
          })(<Input placeholder="请输入中文名称" />)}
        </FormItem>

        <FormItem label="排列顺序：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('level', {
            initialValue: item.level,
            rules: [
              {
                ...Rules.justNumber,
                required: true,
                meaasge: '请输入正确的栏目排序',
              },
            ],
          })(<Input placeholder="1为最靠前。不能和其他栏目冲突" />)}
        </FormItem>
        {
          type === 'create' ?
            <FormItem label="栏目英文：" hasFeedback {...formItemLayout}>
              {getFieldDecorator('slug', {
                initialValue: item.slug,
                rules: [
                  {
                    ...Rules.lessName,
                    required: true,
                  },
                ],
              })(<Input placeholder="请输入栏目中文名称的拼音或者翻译后的英文名称" />)}
            </FormItem> :
            <FormItem label="栏目英文：" hasFeedback {...formItemLayout}>
              {(<span>{item.slug}</span>)}
            </FormItem>
        }


        <FormItem label="状态:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('display', {
            initialValue: item.display,
            rules: [
              {
                ...Rules.justBoolean,
                message: '请选择是否显示或隐藏',
                required: true,
              },
            ],
          })(
            <RadioGroup >
              <Radio value>显示</Radio>
              <Radio value={false}>隐藏</Radio>
            </RadioGroup>
          )}
        </FormItem>

      </Form>
    </Modal>
  )
}

Addmodal.propTypes = {
  orgTree: PropTypes.array,
  addVisible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Addmodal)
