import React, { PropTypes } from 'react'
import { Form, Modal, Cascader, Select, Radio } from 'antd'
// import { Rules } from '../../utils/verificationCode'
// import { findPathInTree } from '../../utils/index'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const Modals = ({
  // timer,
  orgTree,
  visible,
  onOk,
  onCancel,
  onHandleSearchs,
  data,
  errorP,
  onErrorP,
  radios,
  handleChangeRadios,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
    getFieldValue,
  },
}) => {
  console.log(data)

  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        agency_id: getFieldValue('agency_id') ? getFieldValue('agency_id')[getFieldValue('agency_id').length - 1] : '',
      }
      if (data.service_id || data.agency_id) {
        onOk(data, resetFields)
      } else {
        onErrorP(true)
      }
    })
  }

  function handleChange (value) {
    // clearTimeout(timer) // 清除未执行的代码，重置回初始化状态
    //
    // timer = setTimeout(() => {
    //   onHandleSearchs(value)
    // }, 300)
    onHandleSearchs(value)
  }

  const modalOpts = {
    title: '分配',
    visible,
    onOk: handleOk,
    onCancel: () => {
      onCancel()
      onErrorP(false)
      handleChangeRadios(0)
      resetFields()
    },
    wrapClassName: 'vertical-center-modal',
  }

  const handleChanges = (e) => {
    if (e === 1) {
      resetFields(['agency_id'])
    } else {
      resetFields(['service_id'])
    }
  }

  const handleChangeRadio = (params) => {
    handleChanges(params)
    handleChangeRadios(params)
  }

  const onChanges = (e) => {
    handleChanges(e.target.value)
    handleChangeRadios(e.target.value)
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <RadioGroup style={{ width: 200 }} value={radios} onChange={onChanges}>
        <Radio style={{ marginTop: 20 }} value={1}>
          <FormItem style={{ width: 495, marginTop: -24 }} label="分配给指定业务员：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('service_id', {
            })(
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={'请输入业务员姓名或手机号码'}
                  onSearch={handleChange}
                  onSelect={() => { handleChangeRadio(1) }}
                >
                {
                  data.map(d => <Option key={d.id} >{`${d.mobile}-${d.name}`}</Option>)
                }
                </Select>
            )}
          </FormItem>
        </Radio>
        <Radio value={2}>
          <FormItem style={{ width: 495, marginTop: -24 }} label="分配到组织客户池：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('agency_id', {
            })(<Cascader options={orgTree} placeholder="请选择组织" changeOnSelect onChange={() => { handleChangeRadio(2) }} />)}
          </FormItem>
        </Radio>
        </RadioGroup>
        {
          errorP ?
          <p style={{ color: 'red', marginLeft: 125, marginTop: -30 }}>请选择任意一项！</p> : ''
        }
      </Form>
    </Modal>
  )
}

Modals.propTypes = {
  orgTree: PropTypes.array,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onHandleSearchs: PropTypes.func,
  handleChangeRadios: PropTypes.func,
  onErrorP: PropTypes.func,
  data: PropTypes.array,
  form: PropTypes.object,
  timer: PropTypes.bool,
  errorP: PropTypes.bool,
  radios: PropTypes.number,
}

export default Form.create()(Modals)
