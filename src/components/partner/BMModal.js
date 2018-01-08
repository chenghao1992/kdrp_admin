import React, { PropTypes } from 'react'
import { Form, Modal, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
}

const modal = ({
  handleChange,
  currentLeaderId,
  leaders,
  visible,
  onOk,
  onCancel,
  form: {
    validateFields,
    getFieldsValue,
    resetFields,
    getFieldDecorator,
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

      onOk(data, resetFields)
    })
  }

  const modalOpts = {
    title: '指定商务经理',
    visible,
    onOk: handleOk,
    onCancel () {
      resetFields()
      onCancel()
    },
    wrapClassName: 'vertical-center-modal',
  }


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label=" " colon={false} hasFeedback {...formItemLayout}>
          {getFieldDecorator('leaderId', {
            initialValue: currentLeaderId,
            rules: [
              {
                required: false,
                message: '请选择渠道经理',
              },
            ],
          })(<Select onChange={handleChange}>
            {leaders.map((item) => <Option key={item.id}>{`${item.name}-${item.email}`}</Option>)}
          </Select>)}

        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  handleChange: PropTypes.func,
  currentLeaderId: PropTypes.string,
  leaders: PropTypes.array,
}

export default Form.create()(modal)
