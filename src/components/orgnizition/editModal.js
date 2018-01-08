import React, { PropTypes } from 'react'
import { Form, Input, Modal, Select } from 'antd'
// import { Link } from 'dva/router'
// import { Rules } from '../../utils/verificationCode'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  timer,
  selectTriggle,
  selectedKeys,
  data,
  handleChange,
  visible,
  type,
  item = {},
  onEditOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    resetFields,
  },
}) => {
  function handleEditOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      let managerId = getFieldValue('manager_id')
      // 没有触发前，将id设置为该id，否则为initialvalue的值。。。
      if (!selectTriggle) {
        managerId = item.manager.id
      } else if (managerId === `${item.manager.mobile}-${item.manager.name}`) {
        managerId = item.manager.id
      }

      const data = {
        ...getFieldsValue(),
        id: selectedKeys[0],
        manager_id: managerId,
      }

      onEditOk(data, resetFields)
    })
  }

  function onHandleChange (value) {
    clearTimeout(timer) // 清除未执行的代码，重置回初始化状态

    timer = setTimeout(() => {
      handleChange(value)
      console.log('函数防抖')
    }, 300)

    // onHandleSearchs(value)
  }

  const modalOpts = {
    title: '修改组织',
    visible: type === 'edit' && visible,
    onOk: handleEditOk,
    onCancel () {
      resetFields()
      onCancel()
    },
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="组织编码：" {...formItemLayout}>
          {item.code}
        </FormItem>

        <FormItem label="上级组织：" {...formItemLayout}>
          {item.parent ? item.parent.name : '无'}
        </FormItem>

        <FormItem label="组织名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '请输入组织名称',
              },
            ],
          })(<Input placeholder="请输入组织名称" />)}
        </FormItem>

        <FormItem label="管理员：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('manager_id', {
            initialValue: item.manager ? `${item.manager.mobile}-${item.manager.name}` : '',
            rules: [
              {
                required: true,
                message: '请选择管理员',
              },
            ],
          })(
            <Select
              showSearch
              placeholder="输入姓名或手机号进行搜索"
              optionFilterProp="children"
              onSearch={onHandleChange}
            >
              {
                selectTriggle ? (data.map(d => <Option key={d.id}>{`${d.mobile}-${d.name}`}</Option>)) :
                  (item.manager && (<Option key={item.manager.id}>{`${item.manager.mobile}-${item.manager.name}`}</Option>))
              }

            </Select>
          )}
          <span>输入姓名或手机号进行搜索</span>
        </FormItem>


      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  selectTriggle: PropTypes.bool,
  selectedKeys: PropTypes.array,
  data: PropTypes.array,
  handleChange: PropTypes.func,
  onEditOk: PropTypes.func,
  onCancel: PropTypes.func,
  timer: PropTypes.bool,
}

export default Form.create()(modal)
