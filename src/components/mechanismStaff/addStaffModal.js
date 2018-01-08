import React, { PropTypes } from 'react'
import { Form, Modal, Row, Col, Cascader, Select } from 'antd'
import { Rules } from '../../utils/verificationCode'

const FormItem = Form.Item
const Option = Select.Option

const modalAddStaff = ({
  addStaffModalVisible,
  timer,
  onCancel,
  item = {},
  modalType,
  orgTree,
  onHandleSearchs,
  handleAddOrEdit,
  data,
  form: {
    getFieldDecorator,
    resetFields,
    validateFields,
    getFieldsValue,
    getFieldValue,
  },
}) => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }

      const datas1 = getFieldValue('mobile')
      console.log(datas1)

      const data = {
        datas: {
          ...getFieldsValue(),
        },
        modalTypes: modalType,
        id: modalType === 'newCreat' ? '' : item.id,
      }

      handleAddOrEdit(data, resetFields)
    })
  }


  function handleChange (value) {
    clearTimeout(timer) // 清除未执行的代码，重置回初始化状态

    timer = setTimeout(() => {
      onHandleSearchs(value)
      console.log('函数防抖')
    }, 300)

    // onHandleSearchs(value)
  }

  const modalProps = {
    title: modalType === 'newCreat' ? '新增' : '编辑',
    visible: addStaffModalVisible,
    onOk: () => {
      handleOk()
    },
    onCancel: () => {
      onCancel()
      resetFields()
    },
    wrapClassName: 'vertical-center-modal',
  }

  const children = []
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
  }

  return (
    <Modal {...modalProps}>
      <Form>
        <Row>
          <Col>
            {modalType === 'newCreat' ?

            <FormItem label="查找职工：" hasFeedback {...formItemLayout}>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    message: '请输入职工姓名或手机号码',
                  },
                ],
              })(

                <Select
                  showSearch
                  placeholder={'请输入职工姓名或手机号码'}
                  onSearch={handleChange}
                >
                  {
                    data.map(d => <Option key={`${d.mobile}-${d.name}`} >{`${d.mobile}-${d.name}`}</Option>)
                  }
                </Select>
              )}
            </FormItem> : ''
            }
            <FormItem {...formItemLayout} label={modalType === 'newCreat' ? '分配到组织' : '分配到组织节点'}>
              {getFieldDecorator('agency_id', {
                initialValue: item.agency_idD,
                rules: [
                  {
                    ...Rules.justArray,
                    required: true,
                  },
                ],
              })(
                <Cascader options={orgTree} placeholder="请选择组织" changeOnSelect />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

modalAddStaff.propTypes = {
  addStaffModalVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  form: PropTypes.object,
  item: PropTypes.object,
  modalType: PropTypes.string,
  orgTree: PropTypes.array,
  handleAddOrEdit: PropTypes.func,
  onHandleSearchs: PropTypes.func,
  data: PropTypes.array,
  timer: PropTypes.bool,
}

export default Form.create()(modalAddStaff)
