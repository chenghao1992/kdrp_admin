/**
 * Created by xiaoys on 2017/12/5.
 */
import React, { PropTypes } from 'react'
import { Form, Input, Modal, Cascader } from 'antd'
import { Rules } from '../../utils/verificationCode'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

function CommonMtoal ({
  title,
  visible,
  list,
  code,
  handleOk,
  handCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
  },
}) {
  const handleOks = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = code.id ? { ...getFieldsValue(), house_id: code.id } : { ...getFieldsValue() }
      handleOk(data, resetFields)
    })
  }

  const motalProps = {
    title,
    visible,
    onOk: () => {
      handleOks()
    },
    onCancel: () => {
      handCancel()
      resetFields()
    },
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...motalProps}>
      <Form layout="horizontal">
        {
          list.map((item) => {
            switch (item.type) {
              case 'Input':
                return (
                  <FormItem key={item.key} label={item.label} hasFeedback {...formItemLayout}>
                    {getFieldDecorator(item.key, {
                      initialValue: code[item.key],
                      rules: [
                        {
                          ...Rules[item.rules],
                          required: item.required,
                        },
                      ],
                    })(<Input placeholder={item.placeholder} />)}
                  </FormItem>
                )

              default:
                return (
                  <FormItem key={item.key} label={item.label} hasFeedback {...formItemLayout}>
                    {getFieldDecorator(item.key,
                      {
                        initialValue: code[item.key],
                        rules: [
                          {
                            ...Rules[item.rules],
                            required: item.required,
                          },
                        ],
                      })(
                      <Cascader
                        options={item.options}
                        placeholder={item.placeholder}
                        expandTrigger="hover"
                      />
                    )}
                  </FormItem>
                )
            }
          })
        }
      </Form>
    </Modal>
  )
}

CommonMtoal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  list: PropTypes.array,
  code: PropTypes.object,
  form: PropTypes.object,
  handleOk: PropTypes.func,
  handCancel: PropTypes.func,
}

export default Form.create()(CommonMtoal)
