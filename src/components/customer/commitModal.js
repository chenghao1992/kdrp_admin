import React, { PropTypes } from 'react'
import { Form, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

const modal = ({
  selectedRowKeys,
  commitModalVisible,
  onOk,
  onCancel,
  form: {
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
    title: '上交',
    visible: commitModalVisible,
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
          您选择了{selectedRowKeys.length}位客户上交到上级客户池。请确认
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  selectedRowKeys: PropTypes.array,
  commitModalVisible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(modal)
