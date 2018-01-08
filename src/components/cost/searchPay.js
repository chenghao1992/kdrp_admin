import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Input, Icon, DatePicker, Cascader, Select } from 'antd'
import moment from 'moment'
import styles from '../common_list.less'
import classNames from 'classnames'
import { COSTPAY_STATUS_ALL } from '../../utils/enums'

const FormItem = Form.Item
const { MonthPicker } = DatePicker
const Option = Select.Option

function SearchPay ({
  onSearch,
  expand,
  onToggle,
  orgTree,
  isReset,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    resetFields,
  },
}) {
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const xs = 24

  const handleReset = () => {
    resetFields()
  }

  const toggle = () => {
    onToggle(expand)
  }

  function handleSearch (e) {
    e.preventDefault()
    const rangeTime = getFieldValue('bill_month')
    const data = {
      ...getFieldsValue(),
      bill_month: rangeTime && rangeTime.format('YYYY-MM'),
    }
    onSearch(data)
  }

  function onChange () {
    // console.log(value);
  }

  const stateOpt = COSTPAY_STATUS_ALL.map((item, key) => <Option key={key} value={item.value}>{item.name}</Option>)

  function handleChangeState (value) {
    console.log(value)
  }

  function disabledDate (current) {
    if (current) {
      return current && current.valueOf() > Date.now()
    }
    return true
  }

  if (isReset) {
    setTimeout(() => {
      resetFields()
    }, 500)
  }

  return (
    <Form className="ant-advanced-search-form" onSubmit={handleSearch}>

      <Row>
        <Col xs={xs} lg={xs / 2}>
          <FormItem {...formItemLayout} label={'兼职客服姓名'}>
            {getFieldDecorator('username', { initialValue: '' })(
              <Input placeholder="请输入兼职客服姓名" />
            )}
          </FormItem>
        </Col>
        <Col xs={xs} lg={xs / 2}>
          <FormItem {...formItemLayout} label={'兼职客服手机'}>
            {getFieldDecorator('user_mobile', { initialValue: '' })(
              <Input placeholder="请输入兼职客服手机" />
            )}
          </FormItem>
        </Col>
      </Row>
      <div className={classNames({ [styles.common_d_none]: !expand })}>
      <Row>
        <Col xs={xs} lg={xs / 2}>
          <FormItem {...formItemLayout} label={'组织'}>
            {getFieldDecorator('agency_id', { initialValue: [] })(
              <Cascader options={orgTree} onChange={onChange} placeholder="请选择组织" changeOnSelect />
            )}
          </FormItem>
        </Col>
        <Col xs={xs} lg={xs / 2}>
          <FormItem {...formItemLayout} label={'组织代码'}>
            {getFieldDecorator('agency_code', { initialValue: '' })(
              <Input placeholder="请输入组织代码" />
            )}
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col xs={xs} lg={xs / 2}>
          <FormItem {...formItemLayout} label={'状态'}>
            {getFieldDecorator('status', { initialValue: '' })(
              <Select placeholder="请选择状态" onChange={handleChangeState}>
                {stateOpt}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={xs} lg={xs / 2}>
          <FormItem {...formItemLayout} label={'费用归属月份'}>
            {getFieldDecorator('bill_month', { initialValue: moment().subtract(1, 'months') })(
              <MonthPicker
                disabledDate={disabledDate}
                placeholder={'费用归属月份'}
                format="YYYY-MM"
              />
            )}
          </FormItem>
        </Col>
      </Row>
      </div>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button className={styles.common_search_clear} onClick={handleReset}>
            清除
          </Button>
          <a className={styles.common_search_clear} onClick={toggle}>{expand ? '收起搜索' : '展开搜索'}<Icon
            type={expand ? 'up' : 'down'}
          />
          </a>
        </Col>
      </Row>
    </Form>
  )
}

SearchPay.propTypes = {
  onSearch: PropTypes.func,
  expand: PropTypes.bool,
  onToggle: PropTypes.func,
  orgTree: PropTypes.array,
  isReset: PropTypes.bool,
  form: PropTypes.object,
}

export default Form.create()(SearchPay)

