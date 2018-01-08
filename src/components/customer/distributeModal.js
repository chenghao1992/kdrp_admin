import React, { PropTypes } from 'react'
import { Form, Modal, Select } from 'antd'

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

const modal = ({
  selectedRowKeys,
  data,
  handleChange,
  distributeModalVisible,
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
    title: `分配:${selectedRowKeys.length}位客户`,
    visible: distributeModalVisible,
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
        <FormItem label="分配给指定业务员" hasFeedback {...formItemLayout}>
          {getFieldDecorator('service_id', {
            rules: [
              {
                required: true,
                message: '请选择业务员',
              },
            ],
          })(
            <Select
              showSearch
              placeholder="输入姓名或手机号进行搜索"
              style={{ width: 200 }}
              optionFilterProp="children"
              onSearch={handleChange}
            >
              {
                data.map(d => <Option key={d.id}>{d.mobile}-{d.name}</Option>)
              }

            </Select>
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
  selectedRowKeys: PropTypes.array,
  data: PropTypes.array,
  handleChange: PropTypes.func,
  distributeModalVisible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,

}

export default Form.create()(modal)
