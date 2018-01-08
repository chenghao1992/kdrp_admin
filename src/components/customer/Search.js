import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Input, Icon, Cascader, Select } from 'antd'
import styles from '../common_list.less'
import classNames from 'classnames'

const FormItem = Form.Item
const Option = Select.Option

function Search ({
  query,
  resetOrg,
  resetOrgTree,
  orgValue,
  orgTree,
  onSearch,
  expand,
  onToggle,
  form: {
    getFieldDecorator,
    getFieldsValue,
    resetFields,
  },
}) {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const handleReset = () => {
    resetFields()
    resetOrgTree()
  }

  if (resetOrg) {
    setTimeout(() => {
      resetFields()
      resetOrgTree()
      query()
    }, 0)
  }

  const toggle = () => {
    onToggle(expand)
  }

  function handleSearch (e) {
    e.preventDefault()
    // const orgId = getFieldValue('id');
    const data = {
      ...getFieldsValue(),
    }
    onSearch(data)
  }


  return (
    <Form
      className="ant-advanced-search-form"
      onSubmit={handleSearch}
    >

      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'兼职客服手机'}>
            {getFieldDecorator('service.mobile')(
              <Input placeholder="请输入兼职客服手机" />
            )}
          </FormItem>
        </Col>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'兼职客服姓名'}>
            {getFieldDecorator('service.name')(
              <Input placeholder="请输入兼职客服姓名" />
            )}
          </FormItem>
        </Col>
      </Row>

      <div className={classNames({ [styles.common_d_none]: !expand })}>

      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'兼职客服有无'}>
            {getFieldDecorator('customer.service_status')(
              <Select placeholder="管理员姓名">
                <Option key="1">有</Option>
                <Option key="0">无</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'组织'}>
            {getFieldDecorator('agency.idList', {
              initialValue: orgValue,
            })(
              <Cascader
                placeholder="请选择组织"
                options={orgTree} changeOnSelect
              />
            )}
          </FormItem>
        </Col>
      </Row>

      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'组织名称'}>
            {getFieldDecorator('agency.name')(
              <Input placeholder="请输入组织名称" />
            )}
          </FormItem>
        </Col>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'组织代码'}>
            {getFieldDecorator('agency.code')(
              <Input placeholder="请输入组织代码" />
            )}
          </FormItem>
        </Col>

      </Row>

      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'客户手机'}>
            {getFieldDecorator('customer.mobile')(
              <Input placeholder="请输入客户手机" />
            )}
          </FormItem>
        </Col>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'客户姓名'}>
            {getFieldDecorator('customer.name')(
              <Input placeholder="请输入客户姓名" />
            )}
          </FormItem>
        </Col>
      </Row>
      </div>

      <Row className={styles.common_search_list}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            清除
          </Button>
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>{expand ? '收起搜索' : '展开搜索'}<Icon
            type={expand ? 'up' : 'down'}
          />
          </a>
        </Col>
      </Row>
    </Form>
  )
}
Search.propTypes = {
  query: PropTypes.func,
  resetOrg: PropTypes.bool,
  resetOrgTree: PropTypes.func,
  orgValue: PropTypes.array,
  orgTree: PropTypes.array,
  onSearch: PropTypes.func,
  expand: PropTypes.bool,
  onToggle: PropTypes.func,
  form: PropTypes.object.isRequired,
}


export default Form.create()(Search)

