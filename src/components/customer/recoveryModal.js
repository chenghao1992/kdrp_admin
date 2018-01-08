import React, { PropTypes } from 'react'
import { Form, Modal, Cascader } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const modal = ({
  orgTree,
  recoveryModalVisible,
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

      onOk(data)
    })
  }

  const modalOpts = {
    title: '回收',
    visible: recoveryModalVisible,
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
        <FormItem label="回收到组织客户池" hasFeedback {...formItemLayout}>
          {getFieldDecorator('agency_ids', {
            rules: [
              {
                required: true,
                message: '请选择组织',
              },
            ],
          })(
            <Cascader
              placeholder="请选择组织"
              options={orgTree} changeOnSelect
            />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  orgTree: PropTypes.array,
  recoveryModalVisible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(modal)
