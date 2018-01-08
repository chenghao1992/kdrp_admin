import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, DatePicker, Cascader } from 'antd'
import styles from '../common_list.less'
import classNames from 'classnames'
// import moment from 'moment'

const xs = 24
const FormItem = Form.Item
const { RangePicker } = DatePicker

function Search ({
  onSearch,
  expand,
  orgTree,
  orgTreeValue,
  timeValue,
  onDateOk,
  onAgencyOk,
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

  const handleReset = () => {
    resetFields()
  }

  // setFieldsValue({'start_end_time': timeValue })

  function handleSearch (e) {
    e.preventDefault()
    const rangeTime = getFieldValue('start_end_time')
    let dates
    if (rangeTime !== undefined) {
      dates = rangeTime.length > 0 ? `${rangeTime[0].format('YYYY-MM-DD')}~${rangeTime[1].format('YYYY-MM-DD')}` : ''
    } else {
      dates = ''
    }
    const data = {
      ...getFieldsValue(),
      start_end_time: dates,
    }
    onSearch(data)
  }
  function onTimeOk (value) {
    onDateOk(value)
  }

  function onChange (value) {
    onAgencyOk(value)
  }

  function disabledDate (current) {
    if (current) {
      return current.valueOf() > Date.now() /* || current.valueOf() < moment().subtract(1, 'years');*/
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
      <div className={classNames({ [styles.common_d_none]: !expand })}>
      <Row>
        <Col xs={xs} lg={xs / 2}>
          <FormItem {...formItemLayout} label={'组织'}>
            {getFieldDecorator('agency_id', { initialValue: orgTreeValue })(
              <Cascader options={orgTree} onChange={onChange} placeholder="请选择组织" changeOnSelect />
            )}
          </FormItem>
        </Col>
        <Col xs={xs} lg={xs / 2}>
          <FormItem {...formItemLayout} label={'查询日期'}>
            {getFieldDecorator('start_end_time', { initialValue: timeValue })(
              <RangePicker
                showTime
                disabledDate={disabledDate}
                placeholder={['开始时间', '结束时间']}
                format="YYYY-MM-DD"
                onOk={onTimeOk}
              />
            )}
          </FormItem>
        </Col>
      </Row>
      <br />
      </div>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button className={styles.common_search_clear} onClick={handleReset}>
            清除
          </Button>
        </Col>
      </Row>

    </Form>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func,
  expand: PropTypes.bool,
  onToggle: PropTypes.func,
  orgTree: PropTypes.array,
  orgTreeValue: PropTypes.array,
  timeValue: PropTypes.array,
  onDateOk: PropTypes.func,
  onAgencyOk: PropTypes.func,
  isReset: PropTypes.bool,
  form: PropTypes.object,
}

export default Form.create()(Search)

