import React, { PropTypes } from 'react'
import { Form, Input, Modal, Select, Cascader } from 'antd'
// import { Link } from 'dva/router'
import { findPathInTree } from '../../utils/index'
import { Rules } from '../../utils/verificationCode'

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
  onChange,
  preCode,
  selectedKeys,
  options,
  data,
  handleChange,
  visible,
  type,
  item = {},
  onAddOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    resetFields,
  },
}) => {
  const handleOrgChange = (value, selectedOptions) => {
    resetFields(['manager_id'])
    onChange(value, selectedOptions)
  }

  const displayRender = (label) => {
    return label[label.length - 1]
  }

  // 格式转换 key=>value;title=>label
  const opts = JSON.parse(JSON.stringify(options).replace(/key/g, 'value').replace(/title/g, 'label'))

  // const selectOrgnizitionProps = {
  //   style: {},
  // }

  function onHandleChange (value) {
    clearTimeout(timer) // 清除未执行的代码，重置回初始化状态

    timer = setTimeout(() => {
      handleChange(value)
      console.log('函数防抖')
    }, 300)

    // onHandleSearchs(value)
  }

  function handleAddOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }

      const parentId = getFieldValue('parent_id')

      const data = {
        ...getFieldsValue(),
        id: item.id,
        parent_id: parentId[parentId.length - 1],
      }
      onAddOk(data, resetFields)
    })
  }

  const modalOpts = {
    title: '新建组织',
    visible: type === 'add' && visible,
    onOk: handleAddOk,
    onCancel () {
      resetFields()
      onCancel()
    },
    wrapClassName: 'vertical-center-modal',
  }

  // let s = findPathInTree(selectedKeys[0], options, 'key')


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="组织编码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                message: '请按照编码规则录入，如：1 001 025 023',
              }, {
                ...Rules.justNumber,
              }, {
                max: 3,
                message: '最多三位',
              },
            ],
          })(<Input
            addonBefore={preCode}
            placeholder="请按照编码规则录入，如：1 001 025 023"
          />)}
        </FormItem>

        <FormItem label="组织名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
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
                data.map(d => <Option key={d.id} >{`${d.mobile}-${d.name}`}</Option>)
              }

            </Select>
          )}
        </FormItem>


        <FormItem label="上级组织：" hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('parent_id', {
              initialValue: findPathInTree(selectedKeys[0], options, 'key'),
              rules: [
                {
                  required: true,
                  message: '请选择组织',
                },
              ],
            })(
            <Cascader
              displayRender={displayRender}
              placeholder="请选择组织"
              options={opts} onChange={handleOrgChange} changeOnSelect
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
  item: PropTypes.object,
  onChange: PropTypes.func,
  preCode: PropTypes.string,
  selectedKeys: PropTypes.array,
  options: PropTypes.array,
  data: PropTypes.array,
  handleChange: PropTypes.func,
  onAddOk: PropTypes.func,
  onCancel: PropTypes.func,
  timer: PropTypes.bool,
}

export default Form.create()(modal)
