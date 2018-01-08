import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Input, Icon, DatePicker, Select } from 'antd'
import styles from '../common_list.less'
import classNames from 'classnames'


const FormItem = Form.Item
const { RangePicker } = DatePicker
const Option = Select.Option


function Search ({
  query,
  resetOrg,
  resetOrgTree,
  onSearch,
  onToggle,
  expand,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    resetFields,
  },
}) {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const handleReset = () => {
    resetFields()
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
    const registerTime = getFieldValue('register_time')
    const lastTogin = getFieldValue('last_login')
    const data = {
      ...getFieldsValue(),
      register_time: registerTime && `${registerTime[0].format('YYYY-MM-DD HH:mm:ss')}~${registerTime[1].format('YYYY-MM-DD HH:mm:ss')}`,
      last_login: lastTogin && `${lastTogin[0].format('YYYY-MM-DD HH:mm:ss')}~${lastTogin[1].format('YYYY-MM-DD HH:mm:ss')}`,
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
          <FormItem {...formItemLayout} label={'客户姓名'}>
            {getFieldDecorator('name')(
              <Input placeholder="请输入客户姓名" />
            )}
          </FormItem>
        </Col>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'手机号'}>
            {getFieldDecorator('mobile')(
              <Input placeholder="请输入手机号" />
            )}
          </FormItem>
        </Col>
      </Row>
      <div className={classNames({ [styles.common_d_none]: !expand })}>
      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'是否开户'}>
            {getFieldDecorator('is_pnr')(
              <Select placeholder="请选择">
                <Option key="1">是</Option>
                <Option key="0">否</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'是否投资'}>
            {getFieldDecorator('is_invest')(
              <Select placeholder="请选择">
                <Option key="1">是</Option>
                <Option key="0">否</Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>

      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'账户余额'}>
            {getFieldDecorator('available')(
              <Select placeholder="请选择">
                <Option key="lt_100">小于¥100</Option>
                <Option key="gt_100">大于¥100</Option>
                <Option key="gt_10000">大于¥10,000</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'注册时间'}>
            {getFieldDecorator('register_time')(
              <RangePicker
                placeholder={['开始时间', '结束时间']}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            )}
          </FormItem>
        </Col>
      </Row>

      <Row gutter={40}>
        <Col xs={24} lg={11}>
          <FormItem {...formItemLayout} label={'登录时间'}>
            {getFieldDecorator('last_login')(
              <RangePicker
                placeholder={['开始时间', '结束时间']}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
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
  onSearch: PropTypes.func,
  onToggle: PropTypes.func,
  expand: PropTypes.bool,
  form: PropTypes.object.isRequired,
}

export default Form.create()(Search)

