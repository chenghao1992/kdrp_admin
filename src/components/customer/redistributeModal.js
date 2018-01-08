import React, { PropTypes } from 'react'
import { Form, Modal, Select, Cascader } from 'antd'
const FormItem = Form.Item
const Option = Select.Option


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}

const modal = ({
  onOrgChange,
  handleChangeAgc,
  dataOrigin,
  dataReceiver,
  orgTree,
  redistributeModalVisible,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    resetFields,
  },
}) => {
  const onChange = () => {
    resetFields(['contentOrigin', 'contentReceiver'])
    onOrgChange()
  }

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
    title: '按员工分配客户',
    visible: redistributeModalVisible,
    onOk: handleOk,
    onCancel () {
      resetFields()
      onCancel()
    },
    wrapClassName: 'vertical-center-modal',
  }

  // handleChangeAgc

  const agencyIds = getFieldValue('agency_ids')
  const agencyId = agencyIds && agencyIds[agencyIds.length - 1]

  function handleChangeAgcOrigin (value) {
    /* const agency_ids=getFieldValue("agency_ids");
    const agency_id = agency_ids && agency_ids[agency_ids.length - 1];*/

    handleChangeAgc({
      agency_id: agencyId,
      content: value,
      include_leave_employee: 1,
    })
  }

  function handleChangeAgcReceiver (value) {
   /* const agency_ids=getFieldValue("agency_ids");
    const agency_id = agency_ids && agency_ids[agency_ids.length - 1];*/

    handleChangeAgc({
      agency_id: agencyId,
      content: value,
    })
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">

        <FormItem label="组织" hasFeedback {...formItemLayout}>
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
              options={orgTree} onChange={onChange}
            />
          )}
        </FormItem>

        <FormItem label="来源方" hasFeedback {...formItemLayout}>
          {getFieldDecorator('contentOrigin', {
            rules: [
              {
                required: true,
                message: '请选择业务员',
              },
            ],
          })(
            <Select
              disabled={!agencyId}
              showSearch
              placeholder="输入姓名或手机号进行搜索"
              style={{ width: 200 }}
              optionFilterProp="children"
              onSearch={handleChangeAgcOrigin}
            >
              {
                dataOrigin.map(d => <Option key={d.id}>{d.mobile}-{d.name}</Option>)
              }

            </Select>
          )}
        </FormItem>

        <FormItem label="接收方" hasFeedback {...formItemLayout}>
          {getFieldDecorator('contentReceiver', {
            rules: [
              {
                required: true,
                message: '请选择业务员',
              },
            ],
          })(
            <Select
              disabled={!agencyId}
              showSearch
              placeholder="输入姓名或手机号进行搜索"
              style={{ width: 200 }}
              optionFilterProp="children"
              onSearch={handleChangeAgcReceiver}
            >
              {
                dataReceiver.map(d => <Option key={d.id}>{d.mobile}-{d.name}</Option>)
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
  onOrgChange: PropTypes.func,
  handleChangeAgc: PropTypes.func,
  dataOrigin: PropTypes.array,
  dataReceiver: PropTypes.array,
  orgTree: PropTypes.array,
  redistributeModalVisible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(modal)
